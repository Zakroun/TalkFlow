import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveStories, selectUserActiveStories } from "../data/chatSelectors";
import { addStory, deleteStory, incrementStoryViews } from "../data/ChatSlice";
import { Plus, X, ChevronLeft, ChevronRight, Pencil, Eye } from "lucide-react";
import { FaUser } from "react-icons/fa";
import getVideoDuration from "../js/getVideoDuration";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Status() {
    const dispatch = useDispatch();
    const stories = useSelector(selectActiveStories);
    const userstories = useSelector(selectUserActiveStories);
    const chatdataList = useSelector(s => s.chat.ChatData);
    const user = useSelector((s) => s.chat.user);
    const isChangingStoryRef = useRef(false);
    const videoRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [showAddStoryModal, setShowAddStoryModal] = useState(false);
    const [newStoryType, setNewStoryType] = useState("text");
    const [newStoryText, setNewStoryText] = useState("");
    const [newStoryFile, setNewStoryFile] = useState(null);
    const [newStoryCaption, setNewStoryCaption] = useState("");
    const [newStoryBackground, setNewStoryBackground] = useState("blue-600");
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showViewsModal, setShowViewsModal] = useState(false);
    const fileInputRef = useRef(null);
    const intervalRef = useRef(null);
    const currentStory = selectedUser?.stories?.[selectedStoryIndex];
    const myStories = userstories || [];

    const backgroundOptions = [
        { id: "blue-600", name: "Blue", class: "bg-blue-600", textClass: "text-white" },
        { id: "red-500", name: "Red", class: "bg-red-500", textClass: "text-white" },
        { id: "green-500", name: "Green", class: "bg-green-500", textClass: "text-white" },
        { id: "purple-600", name: "Purple", class: "bg-purple-600", textClass: "text-white" },
        { id: "yellow-400", name: "Yellow", class: "bg-yellow-400", textClass: "text-black" },
        { id: "pink-500", name: "Pink", class: "bg-pink-500", textClass: "text-white" }
    ];

    const openStory = (user) => {
        if (!user.stories || user.stories.length === 0) return;
        setSelectedUser(user);
        setSelectedStoryIndex(0);
        setProgress(0);
        setIsPlaying(true);

        if (user.id !== user.id) {
            user.stories.forEach(story => {
                if (!story.viewedBy?.includes(user.id)) {
                    dispatch(incrementStoryViews({ storyId: story.id, userId: user.id }));
                }
            });
        }
    };

    useEffect(() => {
        if (!selectedUser || !currentStory || !isPlaying) return;

        if (currentStory.type === "video") {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        setIsPlaying(false);
                    });
                }
            }
            return;
        }

        clearInterval(intervalRef.current);
        const storyDuration = currentStory.duration || 5000;
        const increment = 100 / (storyDuration / 100);
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current);
                    nextStory();
                    return 0;
                }
                return prev + increment;
            });
        }, 100);
        return () => clearInterval(intervalRef.current);
    }, [selectedStoryIndex, selectedUser, isPlaying, currentStory]);

    useEffect(() => {
        if (currentStory?.type === "video" && videoRef.current) {
            const updateVideoProgress = () => {
                if (videoRef.current && currentStory.duration) {
                    const currentTime = (videoRef.current.currentTime || 0) * 1000;
                    const calculatedProgress = (currentTime / currentStory.duration) * 100;
                    setProgress(calculatedProgress);
                }
            };
            const progressInterval = setInterval(updateVideoProgress, 100);
            const handleVideoEnd = () => {
                clearInterval(progressInterval);
                nextStory(true);
            };
            videoRef.current.addEventListener('timeupdate', updateVideoProgress);
            videoRef.current.addEventListener('ended', handleVideoEnd);
            return () => {
                clearInterval(progressInterval);
                if (videoRef.current) {
                    videoRef.current.removeEventListener('timeupdate', updateVideoProgress);
                    videoRef.current.removeEventListener('ended', handleVideoEnd);
                }
            };
        }
    }, [currentStory]);

    const nextStory = (manual = false) => {
        if (isChangingStoryRef.current) return;
        isChangingStoryRef.current = true;
        if (!selectedUser || !selectedUser.stories) {
            isChangingStoryRef.current = false;
            return;
        }
        if (selectedStoryIndex < selectedUser.stories.length - 1) {
            setSelectedStoryIndex((prev) => prev + 1);
            if (manual) setProgress(0);
        } else {
            const currentIndex = stories.findIndex(u => u.id === selectedUser.id);
            let found = false;
            for (let i = currentIndex + 1; i < stories.length; i++) {
                if (stories[i].stories?.length > 0) {
                    setSelectedUser(stories[i]);
                    setSelectedStoryIndex(0);
                    setProgress(0);
                    found = true;
                    break;
                }
            }
            if (!found) closeStory();
        }
        setTimeout(() => {
            isChangingStoryRef.current = false;
        }, 0);
    };

    const prevStory = () => {
        if (!selectedUser || !selectedUser.stories) return;
        if (selectedStoryIndex > 0) {
            setSelectedStoryIndex((prev) => prev - 1);
            setProgress(0);
        } else {
            const currentIndex = stories.findIndex((u) => u.id === selectedUser.id);
            for (let i = currentIndex - 1; i >= 0; i--) {
                if (stories[i].stories && stories[i].stories.length > 0) {
                    setSelectedUser(stories[i]);
                    setSelectedStoryIndex(stories[i].stories.length - 1);
                    setProgress(0);
                    break;
                }
            }
        }
    };

    const closeStory = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setSelectedUser(null);
        setSelectedStoryIndex(0);
        setProgress(0);
        setIsPlaying(true);
        setShowDeleteConfirm(false);
        setShowViewsModal(false);
        clearInterval(intervalRef.current);
    };

    const handleDeleteStory = () => {
        if (currentStory) {
            console.log("Deleting story with ID:", currentStory.id);
            dispatch(deleteStory({ storyId: currentStory.id }));
            closeStory();
            // if (selectedUser.stories.length === 1) {
            //     closeStory();
            // } else {
            //     prevStory();
            // }
        }
        setShowDeleteConfirm(false);
    };

    const handleVideoPlayPause = () => {
        if (currentStory?.type === "video" && videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const isVideo = file.type.startsWith("video");
        let duration = null;
        if (isVideo) {
            duration = await getVideoDuration(file);
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            setNewStoryFile({
                url: ev.target.result,
                type: isVideo ? "video" : "image",
                duration,
            });
            setNewStoryType("media");
        };
        reader.readAsDataURL(file);
    };

    const handleAddStory = () => {
        if ((newStoryType === "text" && !newStoryText.trim()) && !newStoryFile) return;

        const story = {
            id: Date.now(),
            type: newStoryType === "text" ? "text" : newStoryFile.type,
            content: newStoryType === "text" ? newStoryText : newStoryFile.url,
            mediaType: newStoryFile?.type,
            background: newStoryType === "text" ? newStoryBackground : null,
            caption: newStoryCaption.trim(),
            duration: newStoryType === "text" ? 5000 : newStoryFile?.type === "image" ? 6000 : newStoryFile?.duration,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            views: 0,
            viewedBy: []
        };

        dispatch(addStory({ userId: user.id, story }));

        setShowAddStoryModal(false);
        setNewStoryText("");
        setNewStoryFile(null);
        setNewStoryCaption("");
        setNewStoryType("text");
        setNewStoryBackground("blue-600");
    };

    const handleMyStatusClick = () => {
        if (myStories.length > 0) {
            openStory({ ...user, stories: myStories });
        } else {
            setShowAddStoryModal(true);
        }
    };

    const getBackgroundClass = (backgroundId) => {
        const option = backgroundOptions.find(opt => opt.id === backgroundId);
        return option ? option.class : "bg-blue-600";
    };

    const getTextColorClass = (backgroundId) => {
        const option = backgroundOptions.find(opt => opt.id === backgroundId);
        return option ? option.textClass : "text-white";
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className="w-[360px] border-r border-gray-200">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-xl font-bold text-gray-800">Status</h2>
                    <button
                        onClick={() => setShowAddStoryModal(true)}
                        className="p-2 rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                {myStories.length > 0 ? (
                    <div
                        onClick={handleMyStatusClick}
                        className="flex items-center gap-3 mb-6 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                        <div className="p-[2px] rounded-full bg-[#38b6ff]">
                            {user.profile ? (
                                <img
                                    src={user.profile}
                                    alt={user.username}
                                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FaUser className="text-gray-500" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-700 truncate">My status</p>
                            <p className="text-sm text-gray-500">
                                {myStories[0]
                                    ? new Date(myStories[0].createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    : ""}
                            </p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#38b6ff]"></div>
                    </div>
                ) : (
                    <div
                        onClick={handleMyStatusClick}
                        className="flex items-center gap-3 mb-6 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                        <div className="relative">
                            {user.profile ? (
                                <img
                                    src={user.profile}
                                    alt={user.username}
                                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FaUser className="text-gray-500" />
                                </div>
                            )}
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#38b6ff] text-white rounded-full flex items-center justify-center text-sm">
                                +
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-700">My status</p>
                            <p className="text-sm text-gray-500">
                                Click to add status update
                            </p>
                        </div>
                    </div>
                )}

                {stories.filter((s) => s.id !== user.id).length > 0 && (
                    <>
                        <p className="text-sm font-semibold text-gray-500 px-2 mb-3">Recent updates</p>
                        <div className="flex flex-col gap-2">
                            {stories
                                .filter((s) => s.id !== user.id)
                                .map((u) => (
                                    <div
                                        key={u.id}
                                        onClick={() => openStory(u)}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-3 transition-colors"
                                    >
                                        <div className="p-[2px] rounded-full bg-[#38b6ff]">
                                            {u.avatar ? (
                                                <img
                                                    src={u.avatar}
                                                    alt={u.username}
                                                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <FaUser className="text-gray-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-700 truncate">{u.username}</p>
                                            <p className="text-sm text-gray-500">
                                                {u.stories[0]
                                                    ? new Date(u.stories[0].createdAt).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })
                                                    : ""}
                                            </p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-[#38b6ff]"></div>
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                {currentStory ? (
                    <div className="relative h-full bg-black">
                        <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
                            {selectedUser.stories.map((_, index) => (
                                <div key={index} className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-100 ${index < selectedStoryIndex || index === selectedStoryIndex ? "bg-white" : "bg-gray-500"
                                            }`}
                                        style={{ width: index === selectedStoryIndex ? `${progress}%` : index < selectedStoryIndex ? "100%" : "0%" }}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={closeStory}
                            className="absolute top-10 right-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                        {selectedUser.id === user.id && (
                            <>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="absolute top-10 right-14 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <FaRegTrashAlt size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        setShowViewsModal(true)
                                        handleVideoPlayPause()
                                    }}
                                    className="absolute top-10 right-24 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <Eye size={18} />
                                </button>
                            </>
                        )}

                        <div className="absolute top-10 left-4 z-10 flex items-center gap-3">
                            <div className="p-[2px] rounded-full bg-[#38b6ff]">
                                {selectedUser.avatar ? (
                                    <img
                                        src={selectedUser.avatar}
                                        alt={selectedUser.username}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <FaUser className="text-gray-500" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-white">{selectedUser.username}</p>
                                <p className="text-sm text-gray-300">
                                    {currentStory?.createdAt
                                        ? new Date(currentStory.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : ""}
                                </p>
                            </div>
                        </div>

                        <div className="h-full flex items-center justify-center relative">
                            {currentStory?.type === "image" ? (
                                <div className="relative h-full w-full flex items-center justify-center">
                                    <img
                                        src={currentStory.content}
                                        alt="Story"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                    {currentStory.caption && (
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg max-w-md text-center">
                                            {currentStory.caption}
                                        </div>
                                    )}
                                </div>
                            ) : currentStory?.type === "video" ? (
                                <div className="relative h-full w-full flex items-center justify-center">
                                    <video
                                        ref={videoRef}
                                        src={currentStory.content}
                                        className="max-h-full max-w-full"
                                        autoPlay
                                        playsInline
                                    />
                                    {currentStory.caption && (
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg max-w-md text-center">
                                            {currentStory.caption}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={`relative h-full w-full flex items-center justify-center p-8 ${getBackgroundClass(currentStory.background)}`}>
                                    <div className="text-center max-w-2xl">
                                        <div className={`text-4xl md:text-5xl font-light ${getTextColorClass(currentStory.background)}`}>
                                            {currentStory.content}
                                        </div>
                                    </div>
                                    {currentStory.caption && (
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg max-w-md text-center">
                                            {currentStory.caption}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={prevStory}
                            className="absolute left-4 top-1/2 z-50 transform -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full cursor-pointer transition-colors"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={() => nextStory(true)}
                            className="absolute right-4 top-1/2 z-50 transform -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full cursor-pointer transition-colors"
                        >
                            <ChevronRight size={32} />
                        </button>
                        <div className="absolute inset-0 flex">
                            <div
                                className="flex-1 cursor-pointer"
                                onClick={handleVideoPlayPause}
                            ></div>
                            <div
                                className="flex-1 cursor-pointer"
                                onClick={handleVideoPlayPause}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white flex flex-col items-center justify-center text-center px-4">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-gray-300" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#38b6ff] text-white rounded-full flex items-center justify-center">
                                <Pencil size={16} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-light text-gray-700 mb-2">Share status updates</h2>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Share photos, videos and text that disappear after 24 hours
                        </p>
                        <button
                            onClick={() => setShowAddStoryModal(true)}
                            className="px-6 py-2 bg-[#38b6ff] text-white rounded-full font-medium hover:bg-[#2a9bdb] transition-colors"
                        >
                            Create story
                        </button>
                    </div>
                )}
            </div>

            {showAddStoryModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md mx-4">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-700">Create story</h3>
                                <button
                                    onClick={() => setShowAddStoryModal(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => {
                                        setNewStoryType("text");
                                        setNewStoryFile(null);
                                    }}
                                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${newStoryType === "text"
                                        ? "border-[#38b6ff] bg-blue-50 text-[#38b6ff]"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    Text
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${newStoryFile
                                        ? "border-[#38b6ff] bg-blue-50 text-[#38b6ff]"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    Photo/Video
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </div>

                            <div className="mb-4">
                                {newStoryType === "text" ? (
                                    <div>
                                        <textarea
                                            value={newStoryText}
                                            onChange={(e) => setNewStoryText(e.target.value)}
                                            placeholder="Type your status..."
                                            className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-[#38b6ff] focus:ring-1 focus:ring-[#38b6ff] mb-4"
                                            maxLength={100}
                                        />
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Choose background:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {backgroundOptions.map((bg) => (
                                                    <button
                                                        key={bg.id}
                                                        onClick={() => setNewStoryBackground(bg.id)}
                                                        className={`w-10 h-10 rounded-full ${bg.class} border-2 ${newStoryBackground === bg.id ? 'border-black' : 'border-transparent'}`}
                                                        title={bg.name}
                                                    >
                                                        <span className="sr-only">{bg.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : newStoryFile ? (
                                    <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                                        {newStoryFile.type === "image" ? (
                                            <img src={newStoryFile.url} alt="Preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <video src={newStoryFile.url} className="w-full h-full object-contain" controls />
                                        )}
                                        <button
                                            onClick={() => setNewStoryFile(null)}
                                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500">
                                        <Plus size={48} className="mb-2" />
                                        <p>Select photo or video</p>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newStoryCaption}
                                    onChange={(e) => setNewStoryCaption(e.target.value)}
                                    placeholder="Add a caption (optional)"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#38b6ff] focus:ring-1 focus:ring-[#38b6ff]"
                                    maxLength={200}
                                />
                            </div>

                            {newStoryType === "text" && (
                                <div className="text-right text-sm text-gray-500 mb-4">{newStoryText.length}/100</div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowAddStoryModal(false)}
                                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddStory}
                                    disabled={
                                        (newStoryType === "text" && !newStoryText.trim()) ||
                                        (newStoryType === "media" && !newStoryFile)
                                    }
                                    className="flex-1 py-3 px-4 bg-[#38b6ff] text-white rounded-lg font-medium hover:bg-[#2a9bdb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add to story
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-sm mx-4 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Story</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this story? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteStory}
                                className="flex-1 py-2.5 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showViewsModal && currentStory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md mx-4">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">Views</h3>
                                <button
                                    onClick={() => {
                                        setShowViewsModal(false)
                                        handleVideoPlayPause()
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{currentStory.viewers.length || 0} views</p>
                        </div>
                        <div className="max-h-96 overflow-y-auto p-2">
                            {chatdataList
                                .filter(user =>
                                    currentStory.viewers?.some(v => v.userid === user.id)
                                )
                                .map(user => {
                                    const viewInfo = currentStory.viewers.find(v => v.userid === user.id)
                                    return (
                                        <div
                                            key={user.id}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                                {user.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.username}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <FaUser className="text-gray-500" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {user.username}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(viewInfo.viewedAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}