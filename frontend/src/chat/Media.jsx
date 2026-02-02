import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectMediaChats } from "../data/chatSelectors";
import { removeMedia } from "../data/ChatSlice";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaImage, FaVideo, FaFile, FaLink, FaTrash, FaFilter, FaSortAmountDown, FaTimes, FaCheck, FaDownload } from "react-icons/fa";

export default function Media() {
    const mediaChats = useSelector(selectMediaChats);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChat, setSelectedChat] = useState("all");
    const [mediaType, setMediaType] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [showFilters, setShowFilters] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const filtersRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showFilters && filtersRef.current && !filtersRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilters]);

    const handleRemoveMedia = (chatId, mediaId) => {
        dispatch(removeMedia({ chatId: chatId, mediaId: mediaId }));
        setShowDeleteConfirm(null);
    };

    const getMediaIcon = (type) => {
        switch(type) {
            case 'image': return <FaImage className="text-blue-500" />;
            case 'video': return <FaVideo className="text-purple-500" />;
            case 'file': return <FaFile className="text-yellow-500" />;
            case 'link': return <FaLink className="text-green-500" />;
            default: return <FaFile className="text-gray-500" />;
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "N/A";
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const allMedia = mediaChats.reduce((acc, chat) => {
        if (chat.media && chat.media.length > 0) {
            chat.media.forEach(mediaItem => {
                acc.push({
                    ...mediaItem,
                    chatId: chat.id,
                    chatName: chat.username || "Unknown",
                    chatAvatar: chat.avatar
                });
            });
        }
        return acc;
    }, []);

    const filteredMedia = allMedia.filter(item => {
        const matchesSearch = !searchTerm || 
            item.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.url?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesChat = selectedChat === "all" || item.chatId === selectedChat;
        
        const matchesType = mediaType === "all" || item.type === mediaType;
        
        return matchesSearch && matchesChat && matchesType;
    });

    const sortedMedia = [...filteredMedia].sort((a, b) => {
        switch(sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'size_asc':
                return (a.fileSize || 0) - (b.fileSize || 0);
            case 'size_desc':
                return (b.fileSize || 0) - (a.fileSize || 0);
            default:
                return 0;
        }
    });

    const uniqueChats = mediaChats.filter(chat => chat.media && chat.media.length > 0);
    const mediaTypes = ["all", "image", "video", "file", "link"];
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'size_asc', label: 'Size: Small to Large' },
        { value: 'size_desc', label: 'Size: Large to Small' }
    ];

    const getTotalStats = () => {
        const images = allMedia.filter(m => m.type === 'image').length;
        const videos = allMedia.filter(m => m.type === 'video').length;
        const files = allMedia.filter(m => m.type === 'file').length;
        const links = allMedia.filter(m => m.type === 'link').length;
        const totalSize = allMedia.reduce((sum, m) => sum + (m.fileSize || 0), 0);
        
        return { images, videos, files, links, totalSize };
    };

    const stats = getTotalStats();

    const applyFilters = () => {
        setShowFilters(false);
    };

    const clearFilters = () => {
        setSelectedChat("all");
        setMediaType("all");
        setSortBy("newest");
        setShowFilters(false);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Media & Files</h2>
                    <div className="relative" ref={filtersRef}>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                            <FaFilter className="text-gray-600" />
                            <span className="hidden sm:inline">Filters</span>
                        </button>

                        {showFilters && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium text-gray-700">Filter Options</h3>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="p-1 hover:bg-gray-100 rounded-full"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Filter by Chat
                                            </label>
                                            <select
                                                value={selectedChat}
                                                onChange={(e) => setSelectedChat(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="all">All Chats</option>
                                                {uniqueChats.map(chat => (
                                                    <option key={chat.id} value={chat.id}>
                                                        {chat.username || "Unknown"}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Filter by Type
                                            </label>
                                            <select
                                                value={mediaType}
                                                onChange={(e) => setMediaType(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {mediaTypes.map(type => (
                                                    <option key={type} value={type}>
                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sort By
                                            </label>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {sortOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={clearFilters}
                                                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Clear All
                                            </button>
                                            <button
                                                onClick={applyFilters}
                                                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <FaCheck />
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative mb-4">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search media..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <FaImage className="text-blue-500" />
                            <span className="text-sm font-medium text-gray-600">Images</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">{stats.images}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <FaVideo className="text-purple-500" />
                            <span className="text-sm font-medium text-gray-600">Videos</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">{stats.videos}</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <FaFile className="text-yellow-500" />
                            <span className="text-sm font-medium text-gray-600">Files</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">{stats.files}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <FaLink className="text-green-500" />
                            <span className="text-sm font-medium text-gray-600">Links</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">{stats.links}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                    Total: {allMedia.length} items • {formatFileSize(stats.totalSize)}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {sortedMedia.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <FaImage className="text-gray-400 text-2xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No media found</h3>
                        <p className="text-gray-500 max-w-sm">
                            {allMedia.length === 0 
                                ? "No media shared in any chats yet."
                                : "Try changing your filter settings."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {sortedMedia.map((item) => (
                            <div
                                key={`${item.chatId}-${item.id}`}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-3">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                {getMediaIcon(item.type)}
                                            </div>
                                            <span className="text-xs font-medium text-gray-600 capitalize">
                                                {item.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setShowDeleteConfirm({chatId: item.chatId, mediaId: item.id})}
                                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {item.type === 'image' && item.thumbnail && (
                                        <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.fileName || "Image"}
                                                className="w-full h-40 object-cover"
                                            />
                                        </div>
                                    )}

                                    {item.type === 'video' && item.thumbnail && (
                                        <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 relative">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.fileName || "Video"}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                                                    <FaVideo className="text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!['image', 'video'].includes(item.type) && (
                                        <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-40">
                                            <div className="text-center">
                                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-2">
                                                    {getMediaIcon(item.type)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">
                                                    {item.type.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <h4 className="font-medium text-gray-800 truncate">
                                            {item.fileName || item.url?.split('/').pop() || "Untitled"}
                                        </h4>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">
                                                {item.fileSize !=="" ? formatFileSize(item.fileSize) : ""}
                                            </span>
                                            <span className="text-gray-500">
                                                {formatDate(item.createdAt)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                                                {item.chatName?.[0]?.toUpperCase() || "U"}
                                            </div>
                                            <span className="text-xs text-gray-600 truncate">
                                                {item.chatName}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-sm mx-4">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <FaTrash className="text-red-500 text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Media</h3>
                            <p className="text-gray-500 mb-6">Are you sure you want to delete this media? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleRemoveMedia(showDeleteConfirm.chatId, showDeleteConfirm.mediaId)}
                                    className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaTrash />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}