import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaSearch, FaStar, FaUser, FaUsers, FaPhone, FaArrowLeft, FaInfoCircle, FaCalendarAlt, FaClock, FaEnvelope } from "react-icons/fa";
import { selectFavourites } from "../data/chatSelectors";
import { updateChatData, unfavoriteallchat } from "../data/ChatSlice";

export default function Favourites() {
    const favourites = useSelector(selectFavourites);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFavourite, setSelectedFavourite] = useState(null);

    const filteredFavourites = favourites.filter(fav =>
        fav.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fav.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveFromFavourites = (id) => {
        dispatch(updateChatData({ id: id, actiontype: "removefavorite" }));
        if (selectedFavourite?.id === id) {
            setSelectedFavourite(null);
        }
    };
    const handleRemoveAllFromFavourites = () => {
        dispatch(unfavoriteallchat());
        setSelectedFavourite(null);
    }
    const formatDate = (dateString) => {
        if (!dateString) return { date: "N/A", time: "N/A", fullDate: "N/A" };
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fullDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };
    };

    const getFavouriteStats = (favourite) => {
        return {
            messageCount: favourite.messages?.length || 0,
            callCount: favourite.calls?.length || 0,
            lastMessage: favourite.messages?.length > 0 ? favourite.messages[favourite.messages.length - 1] : null,
            lastCall: favourite.calls?.length > 0 ? favourite.calls[favourite.calls.length - 1] : null
        };
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className={`w-[360px] border-r border-gray-200 flex flex-col`}>
                <div className="flex px-4 py-6 items-center justify-between border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Favourites</h2>
                    <div className="text-gray-800">
                        <FaStar size={18} />
                    </div>
                </div>

                <div className="px-4 mb-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search favourites..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                {filteredFavourites.length > 0 && (
                    <div className="px-4 mb-4">
                        <button
                            onClick={handleRemoveAllFromFavourites}
                            className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaStar size={14} />
                            Remove All from Favourites
                        </button>
                    </div>
                )}
                <div className="flex-1 overflow-y-auto">
                    {filteredFavourites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <div className="text-gray-400 mb-2">
                                <FaStar size={48} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-1">No favourites yet</h3>
                            <p className="text-gray-500 text-sm">Add chats to favourites to see them here</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredFavourites.map(fav => {
                                const stats = getFavouriteStats(fav);
                                return (
                                    <div
                                        key={fav.id}
                                        onClick={() => setSelectedFavourite(fav)}
                                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${selectedFavourite?.id === fav.id ? "bg-gray-100" : ""}`}
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                {fav.avatar ? (
                                                    <img src={fav.avatar} alt={fav.username} className="w-full h-full rounded-full object-cover" />
                                                ) : fav.isGroup ? (
                                                    <FaUsers className="text-gray-500" />
                                                ) : (
                                                    <FaUser className="text-gray-500" />
                                                )}
                                            </div>
                                            {fav.isOnline && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-gray-800 truncate">{fav.username}</h4>
                                                {/* {fav.unread > 0 && (
                                                    <span className="min-w-[18px] h-[18px] text-[10px] bg-[#38b6ff] text-white rounded-full flex items-center justify-center flex-shrink-0">
                                                        {fav.unread}
                                                    </span>
                                                )} */}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                {fav.isGroup ? (
                                                    <>
                                                        <FaUsers size={12} />
                                                        <span>Group</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaPhone size={12} />
                                                        <span>{fav.phone}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveFromFavourites(fav.id);
                                            }}
                                            className="p-2 text-blue-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                                        >
                                            <FaStar />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {selectedFavourite ? (
                    <div className="flex-1 bg-white flex flex-col overflow-y-scroll">
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <button
                                onClick={() => setSelectedFavourite(null)}
                                className="p-2 mr-2 hover:bg-gray-100 rounded-full lg:hidden"
                            >
                                <FaArrowLeft />
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Favourite Details</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        {selectedFavourite.avatar ? (
                                            <img src={selectedFavourite.avatar} alt={selectedFavourite.username} className="w-full h-full rounded-full object-cover" />
                                        ) : selectedFavourite.isGroup ? (
                                            <FaUsers className="text-gray-500 text-4xl" />
                                        ) : (
                                            <FaUser className="text-gray-500 text-4xl" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-2xl font-bold text-gray-800">{selectedFavourite.username}</h3>
                                        <FaStar className="text-[#38b6ff]" />
                                    </div>
                                    <p className="text-gray-500 mb-4">{selectedFavourite.phone}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedFavourite.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                            {selectedFavourite.isOnline ? "Online" : "Offline"}
                                        </span>
                                        {selectedFavourite.isGroup && (
                                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                                                Group
                                            </span>
                                        )}
                                        {selectedFavourite.isContact && (
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                                                Contact
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
                                                    <p className="text-lg font-semibold text-gray-800">{getFavouriteStats(selectedFavourite).messageCount}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                    <FaPhone className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Calls</h4>
                                                    <p className="text-lg font-semibold text-gray-800">{getFavouriteStats(selectedFavourite).callCount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                    <FaCalendarAlt className="text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Last Activity</h4>
                                                    <p className="text-lg font-semibold text-gray-800">
                                                        {getFavouriteStats(selectedFavourite).lastMessage ?
                                                            formatDate(getFavouriteStats(selectedFavourite).lastMessage.timestamp).time :
                                                            "No activity"}
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
                                                        {getFavouriteStats(selectedFavourite).lastCall ?
                                                            formatDate(getFavouriteStats(selectedFavourite).lastCall.datetime).time :
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
                                        <h3 className="text-lg font-semibold text-gray-800">{selectedFavourite.isGroup ? "Group Information" : "Contact Information"}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Name</span>
                                            <span className="font-medium text-gray-800">{selectedFavourite.username}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">{selectedFavourite.isGroup ? "Type" : "Phone Number"}</span>
                                            <span className="font-medium text-gray-800">{selectedFavourite.phone}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Status</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedFavourite.isOnline ? "Online" : "Offline"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Contact</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedFavourite.isContact ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3">
                                            <span className="text-gray-600">Pinned</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedFavourite.isPinned ? "Yes" : "No"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={() => handleRemoveFromFavourites(selectedFavourite.id)}
                                        className="flex-1 py-3 bg-[#004aad] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaStar />
                                        Remove from Favourites
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white flex flex-col items-center justify-center text-center p-4">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center">
                                <FaStar className="text-gray-400 text-3xl" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-light text-gray-700 mb-2">Your Favourites</h2>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Select a favourite from the list to view details
                        </p>
                        <div className="text-sm text-gray-500">
                            {filteredFavourites.length} favourite{filteredFavourites.length !== 1 ? 's' : ''} in total
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}