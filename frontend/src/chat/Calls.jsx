import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPhone, FaVideo, FaArrowLeft, FaEllipsisV, FaSearch, FaUser, FaClock, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { Plus } from "lucide-react";
import { startcall, createcall } from "../data/ChatSlice";
import { FiPhone, FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

export default function Calls() {
    const ChatData = useSelector(s => s.chat.ChatData);
    const dispatch = useDispatch();
    const [selectedCall, setSelectedCall] = useState(null);
    const [showNewCallModal, setShowNewCallModal] = useState(false);
    const [callType, setCallType] = useState("voice");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [showCallOptionsModal, setShowCallOptionsModal] = useState(null);

    const allCalls = ChatData.flatMap(chat =>
        (chat.calls || []).map(call => ({
            ...call,
            chatId: chat.id,
            chatUsername: chat.username || chat.phone,
            chatAvatar: chat.avatar,
            isGroup: chat.isGroup
        }))
    );

    const filteredCalls = allCalls.filter(call => {
        const matchesSearch = call.chatUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
            call.phone?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === "all" ||
            (filterType === "missed" && call.status === "missed") ||
            (filterType === "ended" && call.status === "ended");
        return matchesSearch && matchesFilter;
    });

    const handleStartCall = (phone, username, avatar, isGroup, type = callType) => {
        if (!phone) return;

        const callData = {
            id: Date.now(),
            type: type,
            username: username || phone,
            phone: phone,
            status: "ongoing",
            datetime: new Date().toISOString(),
            duration: "00:00:00",
            caller: "me",
            isRecorded: false,
            isGroupCall: isGroup || false,
            notes: ""
        };

        dispatch(startcall(callData));

        const existingChat = ChatData.find(chat => chat.phone === phone);
        if (existingChat) {
            dispatch(createcall({ callData: callData, id: existingChat.id }));
        }

        setShowNewCallModal(false);
        setShowCallOptionsModal(null);
        setSelectedCall(callData);
    };

    const handleCallClick = (call) => {
        setSelectedCall(call);
    };

    const getCallStatusIcon = (status) => {
        switch (status) {
            case "missed":
                return <FiAlertCircle className="text-red-500" size={15} />;
            case "ended":
                return <FiCheckCircle className="text-green-500" size={15} />;
            case "rejected":
                return <FiXCircle className="text-gray-500" size={15} />;
            default:
                return <FiPhone className="text-blue-500" size={15} />;
        }
    };

    const handleCallOptionsClick = (e, call) => {
        e.stopPropagation();
        setShowCallOptionsModal(call);
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fullDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className="w-[360px] border-r border-gray-200 flex flex-col">
                <div className="flex p-4 items-center justify-between border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Calls</h2>
                    <button
                        onClick={() => setShowNewCallModal(true)}
                        className="p-2 rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="px-3 mb-2">
                    <div className="flex items-center mb-3">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search calls..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 px-3 pb-2 flex-wrap">
                        <button
                            onClick={() => setFilterType("all")}
                            className={`px-3 py-2 text-xs rounded-full ${filterType === "all" ? "bg-[#004aad] text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType("missed")}
                            className={`px-3 py-2 text-xs rounded-full ${filterType === "missed" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
                        >
                            Missed
                        </button>
                        <button
                            onClick={() => setFilterType("ended")}
                            className={`px-3 py-2 text-xs rounded-full ${filterType === "ended" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                        >
                            Ended
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredCalls.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <div className="text-gray-400 mb-2">
                                <FaPhone size={48} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-1">No calls yet</h3>
                            <p className="text-gray-500 text-sm">Make your first call to get started</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredCalls.map((call) => (
                                <div
                                    key={call.id}
                                    onClick={() => handleCallClick(call)}
                                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${selectedCall?.id === call.id ? "bg-gray-100" : ""}`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            {call.chatAvatar ? (
                                                <img src={call.chatAvatar} alt={call.chatUsername} className="w-full h-full rounded-full object-cover" />
                                            ) : call.isGroup ? (
                                                <div className="text-gray-500">
                                                    <FaVideo size={20} />
                                                </div>
                                            ) : (
                                                <FaPhone className="text-gray-500" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-800 truncate">{call.chatUsername}</h4>
                                            <span className="text-xs text-gray-500">
                                                {new Date(call.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                {getCallStatusIcon(call.status)}
                                                {call.caller === "me" ? "Outgoing" : "Incoming"}
                                            </span>
                                            <span>•</span>
                                            <span className="text-gray-500">{call.duration}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleCallOptionsClick(e, call)}
                                        className="p-1 text-gray-400 hover:text-gray-600"
                                    >
                                        <FaEllipsisV />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {selectedCall ? (
                    <div className="flex-1 bg-white flex flex-col overflow-y-scroll">
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <button
                                onClick={() => setSelectedCall(null)}
                                className="p-2 mr-2 hover:bg-gray-100 rounded-full lg:hidden"
                            >
                                <FaArrowLeft />
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Call Details</h2>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        {selectedCall.chatAvatar ? (
                                            <img src={selectedCall.chatAvatar} alt={selectedCall.chatUsername} className="w-full h-full rounded-full object-cover" />
                                        ) : selectedCall.isGroup ? (
                                            <FaVideo className="text-gray-500 text-4xl" />
                                        ) : (
                                            <FaUser className="text-gray-500 text-4xl" />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedCall.chatUsername}</h3>
                                    <p className="text-gray-500 mb-4">{selectedCall.phone}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCall.status === "ended" ? "bg-green-100 text-green-800" : selectedCall.status === "missed" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                                            {selectedCall.status.charAt(0).toUpperCase() + selectedCall.status.slice(1)}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                                            {selectedCall.type === "video" ? "Video Call" : "Voice Call"}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <FaClock className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{selectedCall.duration}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                    <FaUser className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Caller</h4>
                                                    <p className="text-lg font-semibold text-gray-800">
                                                        {selectedCall.caller === "me" ? "You" : selectedCall.chatUsername}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                    <FaCalendarAlt className="text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{formatDateTime(selectedCall.datetime).date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                    <FaClock className="text-orange-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Time</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{formatDateTime(selectedCall.datetime).time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaInfoCircle className="text-gray-500" />
                                        <h3 className="text-lg font-semibold text-gray-800">Call Information</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Call Type</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedCall.type === "video" ? "Video Call" : "Voice Call"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Group Call</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedCall.isGroupCall ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Recorded</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedCall.isRecorded ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3">
                                            <span className="text-gray-600">Full Date</span>
                                            <span className="font-medium text-gray-800">{formatDateTime(selectedCall.datetime).fullDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={() => handleStartCall(
                                            selectedCall.phone,
                                            selectedCall.chatUsername,
                                            selectedCall.chatAvatar,
                                            selectedCall.isGroup,
                                            "voice"
                                        )}
                                        className="flex-1 py-3 bg-[#004aad] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaPhone />
                                        Voice Call
                                    </button>
                                    <button
                                        onClick={() => handleStartCall(
                                            selectedCall.phone,
                                            selectedCall.chatUsername,
                                            selectedCall.chatAvatar,
                                            selectedCall.isGroup,
                                            "video"
                                        )}
                                        className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaVideo />
                                        Video Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white flex flex-col items-center justify-center text-center p-4">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center">
                                <FaPhone className="text-gray-400 text-3xl" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#38b6ff] text-white rounded-full flex items-center justify-center">
                                <Plus size={16} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-light text-gray-700 mb-2">Call History</h2>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Select a call from the list to view details or make a new call
                        </p>
                        <button
                            onClick={() => setShowNewCallModal(true)}
                            className="px-6 py-2 bg-[#38b6ff] text-white rounded-full font-medium hover:bg-[#003d8a] transition-colors flex items-center gap-2"
                        >
                            New Call
                        </button>
                    </div>
                )}
            </div>

            {showNewCallModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-md mx-4">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">New Call</h3>
                                <button
                                    onClick={() => setShowNewCallModal(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <FaArrowLeft />
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex gap-2 mb-6">
                                <button
                                    onClick={() => setCallType("voice")}
                                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${callType === "voice"
                                        ? "border-[#004aad] bg-blue-50 text-[#004aad]"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <FaPhone className="inline mr-2" />
                                    Voice Call
                                </button>
                                <button
                                    onClick={() => setCallType("video")}
                                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${callType === "video"
                                        ? "border-[#004aad] bg-blue-50 text-[#004aad]"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <FaVideo className="inline mr-2" />
                                    Video Call
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Recent Contacts</label>
                                    <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                                        {ChatData.slice(0, 5).map((chat) => (
                                            <button
                                                key={chat.id}
                                                onClick={() => handleStartCall(chat.phone, chat.username, chat.avatar, chat.isGroup)}
                                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    {chat.avatar ? (
                                                        <img src={chat.avatar} alt={chat.username} className="w-full h-full rounded-full object-cover" />
                                                    ) : chat.isGroup ? (
                                                        <FaVideo className="text-gray-500" />
                                                    ) : (
                                                        <FaPhone className="text-gray-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="font-medium text-gray-800">{chat.username || chat.phone}</div>
                                                    <div className="text-xs text-gray-500">{chat.phone}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Or enter phone number</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && e.target.value) {
                                                handleStartCall(e.target.value, e.target.value, null, false);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowNewCallModal(false)}
                                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const dummyPhone = "+1234567890";
                                        handleStartCall(dummyPhone, "Test Contact", null, false);
                                    }}
                                    className="flex-1 py-3 px-4 bg-[#004aad] text-white rounded-lg font-medium hover:bg-[#003d8a]"
                                >
                                    Start Call
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showCallOptionsModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowCallOptionsModal(null)}
                >
                    <div
                        className="bg-white rounded-xl w-full max-w-sm mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    {showCallOptionsModal.chatAvatar ? (
                                        <img src={showCallOptionsModal.chatAvatar} alt={showCallOptionsModal.chatUsername} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <FaPhone className="text-gray-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{showCallOptionsModal.chatUsername}</h3>
                                    <p className="text-sm text-gray-500">{showCallOptionsModal.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <button
                                onClick={() => handleStartCall(
                                    showCallOptionsModal.phone,
                                    showCallOptionsModal.chatUsername,
                                    showCallOptionsModal.chatAvatar,
                                    showCallOptionsModal.isGroup,
                                    "voice"
                                )}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <FaPhone className="text-green-600" />
                                </div>
                                <span className="font-medium text-gray-800">Voice Call</span>
                            </button>

                            <button
                                onClick={() => handleStartCall(
                                    showCallOptionsModal.phone,
                                    showCallOptionsModal.chatUsername,
                                    showCallOptionsModal.chatAvatar,
                                    showCallOptionsModal.isGroup,
                                    "video"
                                )}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FaVideo className="text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-800">Video Call</span>
                            </button>

                            <button
                                onClick={() => setShowCallOptionsModal(null)}
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