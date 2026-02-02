import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaSearch, FaUsers, FaUser, FaUsersCog, FaEllipsisV, FaTrash, FaEdit, FaCheck, FaArrowLeft, FaPhone,FaInfoCircle, FaCalendarAlt, FaClock, FaUserFriends } from "react-icons/fa";
import { Plus } from "lucide-react";
import { selectGroups } from "../data/chatSelectors";
import { creategroupe, updategroupe, removegroupe } from "../data/ChatSlice";

export default function Groups() {
    const groups = useSelector(selectGroups);
    const chatlist = useSelector(state => state.chat.ChatData);
    const dispatch = useDispatch();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewGroupModal, setShowNewGroupModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const filteredGroups = groups.filter(group =>
        group.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getGroupMemberInfo = (group) => {
        if (!group.members || !chatlist) return [];
        return group.members.map(member => {
            const chat = chatlist.find(c => c.id === member.chatId);
            return chat || null;
        }).filter(Boolean);
    };

    const handleCreateGroup = () => {
        if (!groupName) return;

        const newGroup = {
            id: Date.now().toString(),
            username: groupName.trim(),
            phone: "Group Chat",
            avatar: "",
            unread: 0,
            isOnline: false,
            isGroup: true,
            isContact: false,
            isArchived: false,
            isFavourite: false,
            isBlocked: false,
            isPinned: false,
            members: selectedMembers.map((chat, index) => ({
                id: index + 1,
                chatId: chat.id
            })),
            messages: [],
            calls: []
        };

        dispatch(creategroupe({ group: newGroup }));
        resetForm();
        setShowNewGroupModal(false);
    };

    const handleUpdateGroup = () => {
        if (!currentGroup || !groupName) return;

        dispatch(updategroupe({
            id: currentGroup.id,
            groupname: groupName.trim(),
            members: selectedMembers.map((chat, index) => ({
                id: index + 1,
                chatId: chat.id
            }))
        }));

        resetForm();
        setShowNewGroupModal(false);
    };

    const handleRemoveGroup = (id) => {
        dispatch(removegroupe({ id }));
        setShowOptionsModal(null);
        if (selectedGroup?.id === id) {
            setSelectedGroup(null);
        }
    };

    const resetForm = () => {
        setGroupName("");
        setSelectedMembers([]);
        setEditMode(false);
        setCurrentGroup(null);
    };

    const handleEditClick = (group) => {
        setCurrentGroup(group);
        setGroupName(group.username || "");
        
        const memberChats = getGroupMemberInfo(group);
        setSelectedMembers(memberChats);
        
        setEditMode(true);
        setShowNewGroupModal(true);
        setShowOptionsModal(null);
    };

    const toggleMemberSelection = (chat) => {
        setSelectedMembers(prev => {
            const isSelected = prev.some(m => m.id === chat.id);
            if (isSelected) {
                return prev.filter(m => m.id !== chat.id);
            } else {
                return [...prev, chat];
            }
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fullDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };
    };

    const getGroupDetails = (group) => {
        const memberInfo = getGroupMemberInfo(group);
        const lastMessage = group.messages?.length > 0 ? group.messages[group.messages.length - 1] : null;
        const lastCall = group.calls?.length > 0 ? group.calls[group.calls.length - 1] : null;
        
        return {
            members: memberInfo,
            memberCount: memberInfo.length,
            lastMessage,
            lastCall,
            createdDate: group.createdDate || new Date().toISOString()
        };
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className={`w-[360px] border-r border-gray-200 flex flex-col`}>
                <div className="flex p-4 items-center justify-between border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Groups</h2>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowNewGroupModal(true);
                        }}
                        className="p-2 rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div className="px-4 mb-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search groups..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredGroups.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <div className="text-gray-400 mb-2">
                                <FaUsers size={48} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-1">No groups yet</h3>
                            <p className="text-gray-500 text-sm">Create your first group to get started</p>
                            <button
                                onClick={() => setShowNewGroupModal(true)}
                                className="mt-4 px-4 py-2 bg-[#004aad] text-white rounded-full font-medium hover:bg-[#003d8a] transition-colors flex items-center gap-2"
                            >
                                <FaUsersCog />
                                Create Group
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredGroups.map(group => {
                                const memberInfo = getGroupMemberInfo(group);
                                const groupDetails = getGroupDetails(group);
                                return (
                                    <div
                                        key={group.id}
                                        onClick={() => setSelectedGroup(group)}
                                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${selectedGroup?.id === group.id ? "bg-gray-100" : ""}`}
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                <FaUsers className="text-gray-500" />
                                            </div>
                                            {group.isOnline && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-gray-800 truncate">{group.username}</h4>
                                                {/* {group.unread > 0 && (
                                                    <span className="min-w-[18px] h-[18px] text-[10px] bg-[#38b6ff] text-white rounded-full flex items-center justify-center flex-shrink-0">
                                                        {group.unread}
                                                    </span>
                                                )} */}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <FaUsers size={12} />
                                                <span>{groupDetails.memberCount} members</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowOptionsModal(group);
                                            }}
                                            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200"
                                        >
                                            <FaEllipsisV />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {selectedGroup ? (
                    <div className="flex-1 bg-white flex flex-col overflow-y-scroll">
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <button
                                onClick={() => setSelectedGroup(null)}
                                className="p-2 mr-2 hover:bg-gray-100 rounded-full lg:hidden"
                            >
                                <FaArrowLeft />
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Group Details</h2>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        <FaUsers className="text-gray-500 text-4xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedGroup.username}</h3>
                                    <p className="text-gray-500 mb-4">{selectedGroup.phone}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedGroup.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                            {selectedGroup.isOnline ? "Online" : "Offline"}
                                        </span>
                                        {selectedGroup.isFavourite && (
                                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                                                Favourite
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <FaUserFriends className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Members</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{getGroupDetails(selectedGroup).memberCount}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                    <FaCalendarAlt className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{formatDate(getGroupDetails(selectedGroup).createdDate).date}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                    <FaClock className="text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Last Active</h4>
                                                    <p className="text-lg font-semibold text-gray-800">
                                                        {getGroupDetails(selectedGroup).lastMessage ? 
                                                            formatDate(getGroupDetails(selectedGroup).lastMessage.timestamp).time : 
                                                            "No activity"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                                    <FaPhone className="text-red-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Messages</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{selectedGroup.messages?.length || 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaUsers className="text-gray-500" />
                                        <h3 className="text-lg font-semibold text-gray-800">Group Members</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {getGroupDetails(selectedGroup).members.map((member, index) => (
                                            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {member.avatar ? (
                                                            <img src={member.avatar} alt={member.username} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <FaUser className="text-gray-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">{member.username || member.phone}</h4>
                                                        <p className="text-sm text-gray-500">{member.phone}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-full ${member.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                                    {member.isOnline ? "Online" : "Offline"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaInfoCircle className="text-gray-500" />
                                        <h3 className="text-lg font-semibold text-gray-800">Group Information</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Group Name</span>
                                            <span className="font-medium text-gray-800">{selectedGroup.username}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Created Date</span>
                                            <span className="font-medium text-gray-800">{formatDate(getGroupDetails(selectedGroup).createdDate).fullDate}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Favourite</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedGroup.isFavourite ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Archived</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedGroup.isArchived ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3">
                                            <span className="text-gray-600">Pinned</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedGroup.isPinned ? "Yes" : "No"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={() => handleEditClick(selectedGroup)}
                                        className="flex-1 py-3 bg-[#004aad] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaEdit />
                                        Edit Group
                                    </button>
                                    <button
                                        onClick={() => handleRemoveGroup(selectedGroup.id)}
                                        className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaTrash />
                                        Delete Group
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white flex flex-col items-center justify-center text-center p-4">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center">
                                <FaUsers className="text-gray-400 text-3xl" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#38b6ff] text-white rounded-full flex items-center justify-center">
                                <Plus size={16} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-light text-gray-700 mb-2">Group Management</h2>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Select a group from the list to view details or create a new group
                        </p>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowNewGroupModal(true);
                            }}
                            className="px-6 py-2 bg-[#38b6ff] text-white rounded-full font-medium hover:bg-[#003d8a] transition-colors flex items-center gap-2"
                        >
                            <Plus size={16} />
                            New Group
                        </button>
                    </div>
                )}
            </div>

            {showNewGroupModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-md mx-4">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {editMode ? "Edit Group" : "Create Group"}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowNewGroupModal(false);
                                        resetForm();
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <FaUsers />
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                                    <input
                                        type="text"
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                        placeholder="Enter group name..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Members</label>
                                    <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                                        {chatlist.filter(chat => !chat.isGroup).map(chat => {
                                            const isSelected = selectedMembers.some(m => m.id === chat.id);
                                            return (
                                                <button
                                                    key={chat.id}
                                                    onClick={() => toggleMemberSelection(chat)}
                                                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {chat.avatar ? (
                                                            <img src={chat.avatar} alt={chat.username} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <FaUser className="text-gray-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-medium text-gray-800">{chat.username || chat.phone}</div>
                                                        <div className="text-xs text-gray-500">{chat.phone}</div>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="w-6 h-6 rounded-full bg-[#004aad] flex items-center justify-center">
                                                            <FaCheck className="text-white" size={12} />
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <button
                                    onClick={() => {
                                        setShowNewGroupModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editMode ? handleUpdateGroup : handleCreateGroup}
                                    disabled={!groupName}
                                    className={`flex-1 py-3 px-4 rounded-lg font-medium ${!groupName
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-[#004aad] text-white hover:bg-[#003d8a]"
                                        }`}
                                >
                                    {editMode ? "Update Group" : "Create Group"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showOptionsModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowOptionsModal(null)}
                >
                    <div
                        className="bg-white rounded-xl w-full max-w-sm mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FaUsers className="text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{showOptionsModal.username}</h3>
                                    <p className="text-sm text-gray-500">{showOptionsModal.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <button
                                onClick={() => {
                                    setSelectedGroup(showOptionsModal);
                                    setShowOptionsModal(null);
                                }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FaInfoCircle className="text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-800">View Details</span>
                            </button>

                            <button
                                onClick={() => handleEditClick(showOptionsModal)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <FaEdit className="text-green-600" />
                                </div>
                                <span className="font-medium text-gray-800">Edit Group</span>
                            </button>

                            <button
                                onClick={() => handleRemoveGroup(showOptionsModal.id)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-red-600"
                            >
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <FaTrash className="text-red-600" />
                                </div>
                                <span className="font-medium">Delete Group</span>
                            </button>

                            <button
                                onClick={() => setShowOptionsModal(null)}
                                className="w-full mt-2 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg bg-gray-0 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}