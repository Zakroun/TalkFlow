import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaSearch, FaArchive, FaUser, FaUsers, FaPhone, FaArrowLeft, FaInfoCircle, FaCalendarAlt, FaClock, FaEnvelope, FaInbox, FaTrash, FaUndo } from "react-icons/fa";
import { selectArchivedChats } from "../data/chatSelectors";
import { unarchivechat, unarchiveallchats } from "../data/ChatSlice";
export default function Archived() {
    const archivedChats = useSelector(selectArchivedChats);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);

    const filteredChats = archivedChats.filter(chat =>
        chat.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUnarchiveChat = (chatId) => {
        dispatch(unarchivechat({ chatId : chatId }));
        if (selectedChat?.id === chatId) {
            setSelectedChat(null);
        }
    };

    const handleUnarchiveAllChats = () => {
        dispatch(unarchiveallchats());
        setSelectedChat(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return { date: "N/A", time: "N/A", fullDate: "N/A" };
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fullDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };
    };

    const getChatStats = (chat) => {
        return {
            messageCount: chat.messages?.length || 0,
            callCount: chat.calls?.length || 0,
            lastMessage: chat.messages?.length > 0 ? chat.messages[chat.messages.length - 1] : null,
            lastCall: chat.calls?.length > 0 ? chat.calls[chat.calls.length - 1] : null
        };
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className="w-[360px] border-r border-gray-200 flex flex-col">
                <div className="flex px-4 py-6 items-center justify-between border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Archived Chats</h2>
                    <div className="text-gray-800">
                        <FaArchive size={18} />
                    </div>
                </div>

                <div className="px-4 mb-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search archived chats..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {filteredChats.length > 0 && (
                    <div className="px-4 mb-4">
                        <button
                            onClick={handleUnarchiveAllChats}
                            className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaUndo size={14} />
                            Unarchive All
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto">
                    {filteredChats.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <div className="text-gray-400 mb-2">
                                <FaInbox size={48} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-1">No archived chats</h3>
                            <p className="text-gray-500 text-sm">Archive chats to hide them from your main list</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredChats.map(chat => {
                                const stats = getChatStats(chat);
                                return (
                                    <div
                                        key={chat.id}
                                        onClick={() => setSelectedChat(chat)}
                                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${selectedChat?.id === chat.id ? "bg-gray-100" : ""}`}
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                {chat.avatar ? (
                                                    <img src={chat.avatar} alt={chat.username} className="w-full h-full rounded-full object-cover" />
                                                ) : chat.isGroup ? (
                                                    <FaUsers className="text-gray-500" />
                                                ) : (
                                                    <FaUser className="text-gray-500" />
                                                )}
                                            </div>
                                            {chat.isOnline && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-gray-800 truncate">{chat.username}</h4>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                {chat.isGroup ? (
                                                    <>
                                                        <FaUsers size={12} />
                                                        <span>Group • {formatDate(chat.lastActivity).date}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaPhone size={12} />
                                                        <span>{chat.phone}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUnarchiveChat(chat.id);
                                            }}
                                            className="p-2 text-blue-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
                                        >
                                            <FaUndo />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <div className="flex-1 bg-white flex flex-col overflow-y-scroll">
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <button
                                onClick={() => setSelectedChat(null)}
                                className="p-2 mr-2 hover:bg-gray-100 rounded-full lg:hidden"
                            >
                                <FaArrowLeft />
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Archived Chat Details</h2>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        {selectedChat.avatar ? (
                                            <img src={selectedChat.avatar} alt={selectedChat.username} className="w-full h-full rounded-full object-cover" />
                                        ) : selectedChat.isGroup ? (
                                            <FaUsers className="text-gray-500 text-4xl" />
                                        ) : (
                                            <FaUser className="text-gray-500 text-4xl" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-2xl font-bold text-gray-800">{selectedChat.username}</h3>
                                        <FaArchive className="text-gray-500" />
                                    </div>
                                    <p className="text-gray-500 mb-4">{selectedChat.phone}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedChat.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                            {selectedChat.isOnline ? "Online" : "Offline"}
                                        </span>
                                        {selectedChat.isGroup && (
                                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                                                Group
                                            </span>
                                        )}
                                        {selectedChat.isFavourite && (
                                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                                                Favourite
                                            </span>
                                        )}
                                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                                            Archived
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <FaEnvelope className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Messages</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{getChatStats(selectedChat).messageCount}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                    <FaPhone className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Calls</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{getChatStats(selectedChat).callCount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                    <FaCalendarAlt className="text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Last Message</h4>
                                                    <p className="text-lg font-semibold text-gray-800">
                                                        {getChatStats(selectedChat).lastMessage ? 
                                                            formatDate(getChatStats(selectedChat).lastMessage.timestamp).time : 
                                                            "No messages"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                    <FaClock className="text-orange-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Last Call</h4>
                                                    <p className="text-lg font-semibold text-gray-800">
                                                        {getChatStats(selectedChat).lastCall ? 
                                                            formatDate(getChatStats(selectedChat).lastCall.datetime).time : 
                                                            "No calls"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaInfoCircle className="text-gray-500" />
                                        <h3 className="text-lg font-semibold text-gray-800">{selectedChat.isGroup ? "Group Information" : "Chat Information"}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Name</span>
                                            <span className="font-medium text-gray-800">{selectedChat.username}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">{selectedChat.isGroup ? "Type" : "Phone Number"}</span>
                                            <span className="font-medium text-gray-800">{selectedChat.phone}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Status</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedChat.isOnline ? "Online" : "Offline"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Archived Date</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedChat.archivedDate ? formatDate(selectedChat.archivedDate).date : "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3">
                                            <span className="text-gray-600">Contact</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedChat.isContact ? "Yes" : "No"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={() => handleUnarchiveChat(selectedChat.id)}
                                        className="flex-1 py-3 bg-[#004aad] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaUndo />
                                        Unarchive Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white flex flex-col items-center justify-center text-center p-4">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center">
                                <FaArchive className="text-gray-400 text-3xl" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-light text-gray-700 mb-2">Archived Chats</h2>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Select an archived chat from the list to view details
                        </p>
                        <div className="text-sm text-gray-500">
                            {filteredChats.length} archived chat{filteredChats.length !== 1 ? 's' : ''}
                        </div>
                        {/* {filteredChats.length > 0 && (
                            <button
                                onClick={handleUnarchiveAllChats}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                            >
                                <FaUndo />
                                Unarchive All Chats
                            </button>
                        )} */}
                    </div>
                )}
            </div>
        </div>
    );
}