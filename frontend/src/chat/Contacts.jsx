import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaSearch, FaUserPlus, FaUser, FaPhone, FaEdit, FaTrash, FaEllipsisV, FaArrowLeft, FaInfoCircle, FaCalendarAlt, FaClock, FaEnvelope } from "react-icons/fa";
import { Plus } from "lucide-react";
import { selectConatcts } from "../data/chatSelectors";
import { createnewcontact, updatecontact, removecontact } from "../data/ChatSlice";

export default function Contacts() {
    const contacts = useSelector(selectConatcts);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewContactModal, setShowNewContactModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);

    const filteredContacts = contacts.filter(contact =>
        contact.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedContacts = filteredContacts.reduce((groups, contact) => {
        const firstLetter = contact.username?.[0]?.toUpperCase() || '#';
        if (!groups[firstLetter]) groups[firstLetter] = [];
        groups[firstLetter].push(contact);
        return groups;
    }, {});

    const sortedLetters = Object.keys(groupedContacts).sort();

    const handleAddContact = () => {
        if (!username || !phone) return;

        const newContact = {
            id: Date.now().toString(),
            username: username.trim(),
            phone: phone.trim(),
            avatar: "",
            unread: 0,
            isOnline: false,
            isGroup: false,
            isContact: true,
            isArchived: false,
            isFavourite: false,
            isBlocked: false,
            isPinned: false,
            messages: [],
            calls: [],
            stories: [],
            createdDate: new Date().toISOString()
        };

        dispatch(createnewcontact({ contact: newContact }));
        resetForm();
        setShowNewContactModal(false);
    };

    const handleUpdateContact = () => {
        if (!currentContact || !username || !phone) return;

        dispatch(updatecontact({
            id: currentContact.id,
            username: username.trim(),
            phone: phone.trim()
        }));

        resetForm();
        setShowNewContactModal(false);
        if (selectedContact?.id === currentContact.id) {
            setSelectedContact({...selectedContact, username: username.trim(), phone: phone.trim()});
        }
    };

    const handleRemoveContact = (id) => {
        dispatch(removecontact({ id }));
        setShowOptionsModal(null);
        if (selectedContact?.id === id) {
            setSelectedContact(null);
        }
    };

    const resetForm = () => {
        setUsername("");
        setPhone("");
        setEditMode(false);
        setCurrentContact(null);
    };

    const handleEditClick = (contact) => {
        setCurrentContact(contact);
        setUsername(contact.username || "");
        setPhone(contact.phone || "");
        setEditMode(true);
        setShowNewContactModal(true);
        setShowOptionsModal(null);
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

    const getContactStats = (contact) => {
        return {
            messageCount: contact.messages?.length || 0,
            callCount: contact.calls?.length || 0,
            lastMessage: contact.messages?.length > 0 ? contact.messages[contact.messages.length - 1] : null,
            lastCall: contact.calls?.length > 0 ? contact.calls[contact.calls.length - 1] : null
        };
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className={`w-[360px] border-r border-gray-200 flex flex-col`}>
                <div className="flex p-4 items-center justify-between border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Contacts</h2>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowNewContactModal(true);
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
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredContacts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <div className="text-gray-400 mb-2">
                                <FaUser size={48} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-1">No contacts yet</h3>
                            <p className="text-gray-500 text-sm">Add your first contact to get started</p>
                            <button
                                onClick={() => setShowNewContactModal(true)}
                                className="mt-4 px-4 py-2 bg-[#004aad] text-white rounded-full font-medium hover:bg-[#003d8a] transition-colors flex items-center gap-2"
                            >
                                <FaUserPlus />
                                Add Contact
                            </button>
                        </div>
                    ) : (
                        <div className="">
                            {sortedLetters.map(letter => (
                                <div key={letter} className="mb-6">
                                    <div className="sticky top-0 bg-gray-50 py-2">
                                        <h3 className="text-sm font-semibold text-gray-500 px-2">{letter}</h3>
                                    </div>
                                    <div className="space-y-1">
                                        {groupedContacts[letter].map(contact => (
                                            <div
                                                key={contact.id}
                                                onClick={() => setSelectedContact(contact)}
                                                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${selectedContact?.id === contact.id ? "bg-gray-100" : ""}`}
                                            >
                                                <div className="">
                                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {contact.avatar ? (
                                                            <img src={contact.avatar} alt={contact.username} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <FaUser className="text-gray-500" />
                                                        )}
                                                    </div>
                                                    {contact.isOnline && (
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-800 truncate">{contact.username}</h4>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <FaPhone size={12} />
                                                        <span>{contact.phone}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowOptionsModal(contact);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200"
                                                >
                                                    <FaEllipsisV />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {selectedContact ? (
                    <div className="flex-1 bg-white flex flex-col overflow-y-scroll">
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="p-2 mr-2 hover:bg-gray-100 rounded-full lg:hidden"
                            >
                                <FaArrowLeft />
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Contact Details</h2>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        {selectedContact.avatar ? (
                                            <img src={selectedContact.avatar} alt={selectedContact.username} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <FaUser className="text-gray-500 text-4xl" />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedContact.username}</h3>
                                    <p className="text-gray-500 mb-4">{selectedContact.phone}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedContact.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                            {selectedContact.isOnline ? "Online" : "Offline"}
                                        </span>
                                        {selectedContact.isFavourite && (
                                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                                                Favourite
                                            </span>
                                        )}
                                        {selectedContact.isBlocked && (
                                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                                                Blocked
                                            </span>
                                        )}
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
                                                    <p className="text-lg font-semibold text-gray-800">{getContactStats(selectedContact).messageCount}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                    <FaPhone className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Calls</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{getContactStats(selectedContact).callCount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                    <FaCalendarAlt className="text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{formatDate(selectedContact.createdDate).date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                    <FaClock className="text-orange-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Last Active</h4>
                                                    <p className="text-lg font-semibold text-gray-800">
                                                        {getContactStats(selectedContact).lastMessage ? 
                                                            formatDate(getContactStats(selectedContact).lastMessage.timestamp).time : 
                                                            "No activity"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaInfoCircle className="text-gray-500" />
                                        <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Full Name</span>
                                            <span className="font-medium text-gray-800">{selectedContact.username}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Phone Number</span>
                                            <span className="font-medium text-gray-800">{selectedContact.phone}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Created Date</span>
                                            <span className="font-medium text-gray-800">{formatDate(selectedContact.createdDate).fullDate}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Favourite</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedContact.isFavourite ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Blocked</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedContact.isBlocked ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3">
                                            <span className="text-gray-600">Archived</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedContact.isArchived ? "Yes" : "No"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={() => handleEditClick(selectedContact)}
                                        className="flex-1 py-3 bg-[#004aad] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaEdit />
                                        Edit Contact
                                    </button>
                                    <button
                                        onClick={() => handleRemoveContact(selectedContact.id)}
                                        className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaTrash />
                                        Delete Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white flex flex-col items-center justify-center text-center p-4">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center">
                                <FaUser className="text-gray-400 text-3xl" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#38b6ff] text-white rounded-full flex items-center justify-center">
                                <Plus size={16} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-light text-gray-700 mb-2">Contact Management</h2>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Select a contact from the list to view details or add a new contact
                        </p>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowNewContactModal(true);
                            }}
                            className="px-6 py-2 bg-[#38b6ff] text-white rounded-full font-medium hover:bg-[#003d8a] transition-colors flex items-center gap-2"
                        >
                            <Plus size={16} />
                            New Contact
                        </button>
                    </div>
                )}
            </div>

            {showNewContactModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-md mx-4">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {editMode ? "Edit Contact" : "New Contact"}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowNewContactModal(false);
                                        resetForm();
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <FaUser />
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter contact name..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter phone number..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <button
                                    onClick={() => {
                                        setShowNewContactModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editMode ? handleUpdateContact : handleAddContact}
                                    disabled={!username || !phone}
                                    className={`flex-1 py-3 px-4 rounded-lg font-medium ${!username || !phone
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-[#004aad] text-white hover:bg-[#003d8a]"
                                        }`}
                                >
                                    {editMode ? "Update Contact" : "Add Contact"}
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
                                    {showOptionsModal.avatar ? (
                                        <img src={showOptionsModal.avatar} alt={showOptionsModal.username} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <FaUser className="text-gray-500" />
                                    )}
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
                                    setSelectedContact(showOptionsModal);
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
                                <span className="font-medium text-gray-800">Edit Contact</span>
                            </button>

                            <button
                                onClick={() => handleRemoveContact(showOptionsModal.id)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-red-600"
                            >
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <FaTrash className="text-red-600" />
                                </div>
                                <span className="font-medium">Delete Contact</span>
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