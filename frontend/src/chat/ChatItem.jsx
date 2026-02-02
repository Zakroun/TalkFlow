import { useSelector, useDispatch } from "react-redux";
import { FaRegCopy, FaLock, FaRegTrashAlt, FaReply, FaForward, FaRegStar, FaSmile, FaMicrophone, FaTimes, FaPlay, FaPause } from "react-icons/fa";
import { MdBlock, MdAttachFile, MdEmojiEmotions } from "react-icons/md";
import { IoArchiveOutline, IoSend } from "react-icons/io5";
import { TiPinOutline, TiPin } from "react-icons/ti";
import { HiDotsVertical } from "react-icons/hi";
import { FaUser, FaUsers, FaPhone, FaStar, FaVideo, FaRegImage, FaFile, FaCalendarAlt, FaBirthdayCake, FaInfoCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { sendMessage, removeMessage, updateMessage, updateChatData, startcall, createcall } from "../data/ChatSlice";
import { createnewcontact, removecontact, updatecontact } from "../data/ChatSlice";
import formatMessageTime from "../js/formatMessageTime";
import getAudioDuration from "../js/getAudioDuration";
import getVideoDuration from "../js/getVideoDuration";
import { setErrorMessage, setWarnningMessage } from "../data/ChatSlice";
import { LiaBroomSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
export default function ChatItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeChat = useSelector((s) => s.chat.activeChat);
    const ChatListData = useSelector(s => s.chat.ChatData);
    const [activeMessageMenu, setActiveMessageMenu] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [callModel, setCallModel] = useState(false);
    const [videoModel, setVideoModel] = useState(false);
    const [reactionPickerMessage, setReactionPickerMessage] = useState(null);
    const [forwardMenu, setForwardMenu] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [playingAudio, setPlayingAudio] = useState(null);
    const [remainingTime, setRemainingTime] = useState({});
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recordingTimerRef = useRef(null);
    const fileInputRef = useRef(null);
    const messageMenuTimerRef = useRef(null);
    const profileSidebarRef = useRef(null);
    const audioRefs = useRef({});
    const intervalRefs = useRef({});
    const messagesEndRef = useRef(null);
    const [isContact, setIsContact] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [addUsername, setAddUsername] = useState("");
    const [addPhone, setAddPhone] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editPhone, setEditPhone] = useState("");

    const chat = ChatListData.find((s) => s.id === activeChat);
    
    useEffect(() => {
        if (chat) {
            setIsContact(chat.isContact || false);
            setEditUsername(chat.username || "");
            setEditPhone(chat.phone || "");
            setAddUsername(chat.username || "");
            setAddPhone(chat.phone || "");
        }
    }, [chat]);

    useEffect(() => {
        scrollToBottom();
    }, [chat?.messages]);

    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                mediaRecorderRef.current.stop();
            }
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }
            if (messageMenuTimerRef.current) {
                clearTimeout(messageMenuTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (activeMessageMenu) {
            if (messageMenuTimerRef.current) {
                clearTimeout(messageMenuTimerRef.current);
            }
            messageMenuTimerRef.current = setTimeout(() => {
                setActiveMessageMenu(null);
            }, 2000);
        }
        return () => {
            if (messageMenuTimerRef.current) {
                clearTimeout(messageMenuTimerRef.current);
            }
        };
    }, [activeMessageMenu]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileSidebarRef.current && !profileSidebarRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getAllChatItems = () => {
        if (!chat) return [];
        const allItems = [];
        const messages = chat.messages || [];
        const calls = chat.calls || [];
        messages.forEach(msg => allItems.push({ ...msg, itemType: 'message' }));
        calls.forEach(call => allItems.push({ ...call, itemType: 'call' }));
        return allItems.sort((a, b) => new Date(a.time || a.datetime) - new Date(b.time || b.datetime));
    };

    const groupItemsByDate = () => {
        const items = getAllChatItems();
        if (!items.length) return [];
        const groups = {};
        items.forEach(item => {
            const date = new Date(item.time || item.datetime);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            let dateKey;
            if (date.toDateString() === today.toDateString()) {
                dateKey = "Today";
            } else if (date.toDateString() === yesterday.toDateString()) {
                dateKey = "Yesterday";
            } else {
                dateKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(item);
        });
        return groups;
    };

    const startRecording = async () => {
        try {
            let permissionState = "prompt";
            if (navigator.permissions) {
                const permission = await navigator.permissions.query({ name: "microphone" });
                permissionState = permission.state;
            }
            if (permissionState !== "granted") {
                dispatch(setWarnningMessage("Please allow microphone access to start recording"));
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            dispatch(setWarnningMessage(""));
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                sendVoiceMessage(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
            recordingTimerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (error) {
            dispatch(setWarnningMessage(""));
            dispatch(
                setErrorMessage(
                    "Microphone access is blocked. Please enable it from browser settings."
                )
            );
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        if (recordingTimerRef.current) {
            clearInterval(recordingTimerRef.current);
            recordingTimerRef.current = null;
        }
        setIsRecording(false);
        setRecordingTime(0);
    };

    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            await startRecording();
        }
    };

    const formatDuration = (durationMs) => {
        const totalSeconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const sendVoiceMessage = (audioBlob) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        getAudioDuration(audioUrl).then(durationMs => {
            const durationSeconds = Math.floor(durationMs / 1000);
            const message = {
                id: Date.now(),
                sender: "me",
                type: "voice",
                content: audioUrl,
                duration: durationSeconds,
                reactions: [],
                time: new Date().toISOString(),
                status: "sent",
                isFavourite: false
            };
            dispatch(sendMessage({ id: activeChat, newmessage: message }));
        }).catch(() => {
            const durationSeconds = recordingTime;
            const message = {
                id: Date.now(),
                sender: "me",
                type: "voice",
                content: audioUrl,
                duration: durationSeconds,
                reactions: [],
                time: new Date().toISOString(),
                status: "sent",
                isFavourite: false
            };
            dispatch(sendMessage({ id: activeChat, newmessage: message }));
        });
    };

    const formatSeconds = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const toggleAudioPlay = (id, duration) => {
        const audio = audioRefs.current[id];
        if (!audio) return;
        if (playingAudio === id) {
            audio.pause();
            clearInterval(intervalRefs.current[id]);
            setPlayingAudio(null);
        } else {
            if (playingAudio && audioRefs.current[playingAudio]) {
                audioRefs.current[playingAudio].pause();
                clearInterval(intervalRefs.current[playingAudio]);
            }
            audio.play();
            setPlayingAudio(id);
            setRemainingTime(prev => ({
                ...prev,
                [id]: prev[id] ?? duration
            }));
            intervalRefs.current[id] = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev[id] <= 1) {
                        clearInterval(intervalRefs.current[id]);
                        return { ...prev, [id]: 0 };
                    }
                    return { ...prev, [id]: prev[id] - 1 };
                });
            }, 1000);
        }
    };

    const handleAudioEnded = (id, duration) => {
        clearInterval(intervalRefs.current[id]);
        setPlayingAudio(null);
        setRemainingTime(prev => ({
            ...prev,
            [id]: duration
        }));
    };

    const handleSendMessage = () => {
        if (selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
                const fileUrl = URL.createObjectURL(file);
                const fileType = file.type.startsWith("image") ? "image" :
                    file.type.startsWith("video") ? "video" :
                        file.type.startsWith("audio") ? "voice" : "file";
                if (fileType === "voice") {
                    getAudioDuration(file).then(durationMs => {
                        const duration = formatDuration(durationMs);
                        const message = {
                            id: Date.now(),
                            sender: "me",
                            type: "voice",
                            content: fileUrl,
                            duration: duration,
                            reactions: [],
                            time: new Date().toISOString(),
                            status: "sent",
                            isFavourite: false
                        };
                        dispatch(sendMessage({ id: activeChat, newmessage: message }));
                    });
                } else if (fileType === "video") {
                    getVideoDuration(file).then(durationMs => {
                        const duration = formatDuration(durationMs);
                        const message = {
                            id: Date.now(),
                            sender: "me",
                            type: "video",
                            content: file.name,
                            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                            fileUrl: fileUrl,
                            duration: duration,
                            reactions: [],
                            time: new Date().toISOString(),
                            status: "sent",
                            isFavourite: false
                        };
                        dispatch(sendMessage({ id: activeChat, newmessage: message }));
                    });
                } else {
                    const message = {
                        id: Date.now(),
                        sender: "me",
                        type: fileType,
                        content: file.name,
                        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                        fileUrl: fileUrl,
                        reactions: [],
                        time: new Date().toISOString(),
                        status: "sent",
                        isFavourite: false
                    };
                    dispatch(sendMessage({ id: activeChat, newmessage: message }));
                }
            });
            setSelectedFiles([]);
            return;
        }
        if (!newMessage.trim() && !isRecording) return;
        if (isRecording) {
            stopRecording();
            return;
        }
        const message = {
            id: Date.now(),
            sender: "me",
            type: "text",
            content: newMessage,
            reactions: [],
            time: new Date().toISOString(),
            status: "sent",
            isFavourite: false
        };
        dispatch(sendMessage({ id: activeChat, newmessage: message }));
        setNewMessage("");
        setReplyTo(null);
    };

    const handleMessageAction = (action, message) => {
        switch (action) {
            case "copy":
                navigator.clipboard.writeText(message.content);
                break;
            case "reply":
                setReplyTo(message);
                break;
            case "forward":
                setForwardMenu(message.id);
                break;
            case "star":
                dispatch(updateMessage({
                    id: activeChat,
                    messageId: message.id,
                    updatedMessage: { isFavourite: !message.isFavourite }
                }));
                break;
            case "delete":
                dispatch(removeMessage({ id: activeChat, messageId: message.id }));
                break;
        }
        setActiveMessageMenu(null);
    };

    const handleForwardMessage = (message, targetChatId) => {
        const forwardMessage = {
            ...message,
            id: Date.now(),
            sender: "me",
            time: new Date().toISOString()
        };
        dispatch(sendMessage({ id: targetChatId, newmessage: forwardMessage }));
        setForwardMenu(null);
    };

    const handleAddReaction = (message, reaction) => {
        const currentReactions = [...(message.reactions || [])];
        if (!currentReactions.includes(reaction)) {
            currentReactions.push(reaction);
            dispatch(updateMessage({
                id: activeChat,
                messageId: message.id,
                updatedMessage: { reactions: currentReactions }
            }));
        }
        setReactionPickerMessage(null);
    };

    const handleStartCall = (type) => {
        const callData = {
            id: Date.now(),
            type,
            username: chat.username,
            phone: chat.phone,
            status: "ongoing",
            datetime: new Date().toISOString(),
            duration: "00:00:00",
            caller: "me",
            isRecorded: false,
            isGroupCall: false,
            notes: ""
        };
        navigate('/chat/call');
        dispatch(startcall(callData));
        dispatch(createcall({ callData: callData, id: chat.id }));
        setCallModel(false);
    };

    const handleAttachFile = (type) => {
        if (type === "media") {
            fileInputRef.current.accept = "image/*,video/*,audio/*";
        } else if (type === "document") {
            fileInputRef.current.accept = ".pdf,.doc,.docx,.txt,.xlsx,.xls";
        }
        fileInputRef.current.click();
        setShowAttachMenu(false);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        setSelectedFiles(files);
        event.target.value = null;
    };

    const removeSelectedFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const getFileType = (fileType) => {
        if (fileType.startsWith("image")) return "Image";
        if (fileType.startsWith("video")) return "Video";
        if (fileType.startsWith("audio")) return "Audio";
        return "Document";
    };

    const formatFileSize = (size) => {
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    };

    const handleAddContact = () => {
        if (!addUsername.trim() || !addPhone.trim()) return;
        dispatch(createnewcontact({ id: chat.id, username: addUsername, phone: addPhone }));
        setIsContact(true);
        setShowAddForm(false);
    };

    const handleRemoveContact = () => {
        dispatch(removecontact({ id: chat.id }));
        setIsContact(false);
    };

    const handleSaveUpdate = () => {
        if (!editUsername.trim() || !editPhone.trim()) return;
        dispatch(updatecontact({ id: chat.id, username: editUsername, phone: editPhone }));
        setIsEditing(false);
    };

    const userActions = [
        chat?.isFavourite
            ? { icon: <FaStar size={16} />, label: "Remove from favorites", action: "removefavorite" }
            : { icon: <FaRegStar size={16} />, label: "Add to favorites", action: "favorite" },
        chat?.isPinned
            ? { icon: <TiPin size={16} />, label: "Unpin conversation", action: "unpin" }
            : { icon: <TiPinOutline size={16} />, label: "Pin conversation", action: "pin" },
        { icon: <IoArchiveOutline size={16} />, label: "Archive conversation", action: "archive" },
        { icon: <MdBlock size={16} />, label: "Block user", action: "block" },
        { icon: <LiaBroomSolid size={16} />, label: "Clear conversation", action: "clear" },
        { icon: <FaRegTrashAlt size={16} />, label: "Delete conversation", action: "deleteChat" },
    ];

    const messageActions = [
        { icon: <FaRegCopy size={14} />, label: "Copy", action: "copy" },
        { icon: <FaReply size={14} />, label: "Reply", action: "reply" },
        { icon: <FaForward size={14} />, label: "Forward", action: "forward" },
        { icon: <FaRegTrashAlt size={14} />, label: "Delete", action: "delete" },
    ];

    const attachOptions = [
        { icon: <FaRegImage size={18} />, label: "Photo & Video", action: "media" },
        { icon: <FaFile size={18} />, label: "Document", action: "document" },
    ];

    const reactions = ["😀", "❤️", "👍", "🎉", "😢", "😡"];

    const emojiCategories = {
        smileys: ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🫠", "🫤", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤯", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇", "🥳", "🥺", "🤠", "🤡", "🤥"],
        gestures: ["👍", "👎", "👏", "🙌", "👐", "🤝", "🤲", "🙏", "✌️", "🤞", "🤟", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐️", "🖖", "👋", "💪", "🦾", "🦿"],
        hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝"],
        celebration: ["🎉", "🎊", "🎂", "🎁", "🥳", "🍾", "🎈", "🎀", "🎆", "🎇", "🪅"],
        objects: ["🔥", "💯", "✨", "⭐", "🌟", "⚡", "💥", "☄️", "💫", "🌈"],
        food: ["🍎", "🍌", "🍓", "🍕", "🍔", "🍟", "🌭", "🍿", "🥤", "🍩", "🍪", "🍰", "🍫", "🍺", "☕"],
        travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "✈️", "🚀", "🚁", "🚉", "🏠", "🏢"],
        animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐺", "🦄", "🐝", "🦋", "🐢", "🐬", "🐳", "🌸", "🌹", "🌳"]
    };

    if (!activeChat) {
        return (
            <div className="flex-1 bg-white flex flex-col items-center justify-center text-center px-6">
                <div className="mb-6">
                    <img src="/images/TalkFlow1.png" className="h-12 w-12" alt="TalkFlow Logo" />
                </div>
                <h2 className="text-2xl text-gray-400 mb-2">TalkFlow</h2>
                <p className="text-gray-400 text-sm max-w-md mb-10">
                    Send and receive messages without keeping your phone online.
                </p>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <FaLock />
                    <span>Your personal messages are end-to-end encrypted</span>
                </div>
            </div>
        );
    }

    const renderCallItem = (call) => {
        const callIcon = call.type === "video" ? <FaVideo className="h-4 w-4" /> : <FaPhone className="h-4 w-4" />;
        const callBgColor = call.caller === "me" ? "bg-[#004aad]" : "bg-white";
        const callTextColor = call.caller === "me" ? "text-white" : "text-gray-800";
        const callStatusColor = call.status === "missed" || call.status === "rejected" ? "text-red-400" : call.status === "ended" ? "text-green-400" : "text-gray-600";
        const callStatusText = call.status === "missed" || call.status === "rejected" ? "Missed" : call.status === "ended" ? "ended" : call.status === "ended" ? "Ended" : call.status;

        return (
            <div key={call.id} className={`flex flex-col ${call.caller === "me" ? "items-end" : "items-start"}`}>
                <div className="flex items-start gap-2">
                    <div className="relative flex flex-col">
                        <div className={`max-w-md p-3 rounded-lg text-sm ${callBgColor} ${callTextColor} flex items-center gap-2`}>
                            {callIcon}
                            <div>
                                <div className="font-medium">{call.type === "video" ? "Video Call" : "Voice Call"}</div>
                                <div className={`text-xs ${callStatusColor}`}>{callStatusText} • {call.duration}</div>
                                {call.isRecorded && (
                                    <div className="text-xs text-gray-400 mt-1">Recorded</div>
                                )}
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">
                            {formatMessageTime(call.datetime)}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 bg-white flex flex-col">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileSelect}
            />

            <div className="h-[68.5px] border-b border-gray-200 flex items-center px-4 gap-3">
                <button onClick={() => setShowProfile(true)} className="flex items-center gap-3 flex-1">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {chat?.avatar ? (
                            <img src={chat.avatar} alt={chat.username} className="w-full h-full object-cover" />
                        ) : (
                            chat?.isGroup ? <FaUsers className="text-gray-500 text-lg" /> : <FaUser className="text-gray-500 text-lg" />
                        )}
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="text-sm font-semibold">{chat?.username !== "" ? chat?.username : chat?.phone}</h3>
                        <p className="text-xs text-gray-500">{chat?.isOnline ? "online" : "offline"}</p>
                    </div>
                </button>
                <div className="flex items-center gap-1">
                    {
                        chat.id !== "ai" ?
                            (<>
                                <button onClick={() => setCallModel(!callModel)} className="p-2 rounded-full hover:bg-gray-100">
                                    <FaPhone className="h-5 w-5 text-gray-600" />
                                </button>
                                <button onClick={() => setVideoModel(!videoModel)} className="p-2 rounded-full hover:bg-gray-100">
                                    <FaVideo className="h-5 w-5 text-gray-600" />
                                </button>
                            </>)
                            : ""
                    }
                    <div className="relative">
                        <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="p-2 rounded-full hover:bg-gray-100">
                            <HiDotsVertical className="h-5 w-5 text-gray-600" />
                        </button>
                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                                {userActions.map((action) => (
                                    <button
                                        key={action.action}
                                        onClick={() => {
                                            dispatch(updateChatData({ id: chat.id, actiontype: action.action }));
                                            setUserMenuOpen(false);
                                        }}
                                        className={`w-full px-4 py-2 text-sm text-left ${action.label.includes("Delete") ? "text-red-600" : "text-gray-700"
                                            } hover:bg-gray-100 flex items-center gap-2`}
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${showProfile ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div
                    ref={profileSidebarRef}
                    className={`absolute top-0 right-0 h-full w-[500px] bg-white shadow-xl transform transition-transform duration-300 ${showProfile ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Contact Info</h3>
                        <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-gray-100 rounded-full">
                            <FaTimes className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                    <div className="h-[calc(100%-64px)] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                                    {chat?.avatar ? (
                                        <img src={chat.avatar} alt={chat.username} className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        chat?.isGroup ? <FaUsers className="text-gray-500 text-4xl" /> : <FaUser className="text-gray-500 text-4xl" />
                                    )}
                                </div>
                                <h4 className="text-xl font-semibold">{chat?.username !== "" ? chat?.username : chat?.phone}</h4>
                                <p className="text-gray-500 text-sm mt-1">{chat?.phone}</p>
                                <div className={`px-3 py-1 rounded-full text-xs mt-2 ${chat?.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {chat?.isOnline ? 'Online' : 'Offline'}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <FaCalendarAlt className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Last seen</p>
                                        <p className="font-medium">{chat?.isOnline ? 'Just now' : '2 hours ago'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <FaPhone className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{chat?.phone ? chat?.phone : chat?.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <FaBirthdayCake className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Birthday</p>
                                        <p className="font-medium">June 15, 1990</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <FaInfoCircle className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bio</p>
                                        <p className="font-medium">Available for new opportunities</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-gray-700">Messages are end-to-end encrypted. No one outside of this chat, not even TalkFlow, can read or listen to them.</p>
                                </div>
                            </div>

                            <div className="mt-8 px-2">
                                {isEditing && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                            <input
                                                value={editUsername}
                                                onChange={(e) => setEditUsername(e.target.value)}
                                                placeholder="Enter username"
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                value={editPhone}
                                                onChange={(e) => setEditPhone(e.target.value)}
                                                placeholder="Enter phone number"
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleSaveUpdate}
                                                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {!isEditing && !isContact && !showAddForm && (
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Add to Contacts
                                    </button>
                                )}

                                {!isEditing && !isContact && showAddForm && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                            <input
                                                value={addUsername}
                                                onChange={(e) => setAddUsername(e.target.value)}
                                                placeholder="Enter username"
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                value={addPhone}
                                                onChange={(e) => setAddPhone(e.target.value)}
                                                placeholder="Enter phone number"
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleAddContact}
                                                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                                            >
                                                Add Contact
                                            </button>
                                            <button
                                                onClick={() => setShowAddForm(false)}
                                                className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {!isEditing && isContact && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Edit Contact
                                        </button>
                                        <button
                                            onClick={handleRemoveContact}
                                            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Remove Contact
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {callModel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Call {chat?.username || chat?.phone}</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCallModel(false)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                            <button
                                onClick={() => handleStartCall('voice')}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                <FaPhone />
                                Call
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {videoModel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Video Call {chat?.username || chat?.phone}</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setVideoModel(false)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                            <button
                                onClick={() => handleStartCall('video')}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                <FaVideo />
                                Video Call
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3">
                {Object.entries(groupItemsByDate()).map(([date, items]) => (
                    <div key={date}>
                        <div className="flex items-center justify-center my-4">
                            <div className="bg-gray-300 text-gray-900 text-xs px-3 py-1 rounded-full">
                                {date}
                            </div>
                        </div>
                        {items.map((item) => (
                            item.itemType === 'call' ? (
                                renderCallItem(item)
                            ) : (
                                <div key={item.id} className={`flex flex-col ${item.sender === "me" ? "items-end" : "items-start"}`}>
                                    <div className="flex items-start gap-2">
                                        <button
                                            onClick={() => setActiveMessageMenu(activeMessageMenu === item.id ? null : item.id)}
                                            className="p-1 rounded-full hover:bg-gray-200 mt-1"
                                        >
                                            <HiDotsVertical className="h-4 w-4 text-gray-500" />
                                        </button>
                                        <div className="relative flex flex-col">
                                            <div className={`max-w-md p-3 rounded-lg text-sm ${item.sender === "me" ? "bg-[#004aad] text-white" : "bg-white shadow"}`}>
                                                {item.type === "voice" ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => toggleAudioPlay(item.id, item.duration)}
                                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20"
                                                        >
                                                            {playingAudio === item.id ? (
                                                                <FaPause className="h-4 w-4" />
                                                            ) : (
                                                                <FaPlay className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                        <span>
                                                            Voice message (
                                                            {formatSeconds(remainingTime[item.id] ?? item.duration)})
                                                        </span>
                                                        <audio
                                                            ref={(el) => (audioRefs.current[item.id] = el)}
                                                            src={item.content}
                                                            onEnded={() => handleAudioEnded(item.id, item.duration)}
                                                        />
                                                    </div>
                                                ) : item.type === "image" ? (
                                                    <img src={item.fileUrl} alt={item.content} className="max-w-xs rounded-lg" />
                                                ) : item.type === "video" ? (
                                                    <div>
                                                        <video src={item.fileUrl} controls className="max-w-xs rounded-lg" />
                                                        {item.duration && (
                                                            <div className="text-xs text-gray-200 mt-1">
                                                                Duration: {item.duration}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : item.type === "file" ? (
                                                    <div className="flex items-center gap-2">
                                                        <FaFile className="h-4 w-4" />
                                                        <div>
                                                            <div className="font-medium">{item.content}</div>
                                                            <div className="text-xs text-gray-200">{item.fileSize}</div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    item.content
                                                )}
                                            </div>
                                            {item.reactions && item.reactions.length > 0 && (
                                                <div className="flex gap-1 mt-1">
                                                    {item.reactions.map((r, i) => (
                                                        <div key={i} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                                                            {r}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <span className="text-xs text-gray-400 mt-1">
                                                {formatMessageTime(item.time)}
                                            </span>
                                            {activeMessageMenu === item.id && (
                                                <div className={`absolute ${item.sender === "me" ? "right-0" : "left-0"} -top-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10`}>
                                                    <button
                                                        onClick={() => setReactionPickerMessage(reactionPickerMessage === item.id ? null : item.id)}
                                                        className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                    >
                                                        <FaSmile size={14} />
                                                        Add Reaction
                                                    </button>
                                                    {messageActions.map((action) => (
                                                        <button
                                                            key={action.action}
                                                            onClick={() => handleMessageAction(action.action, item)}
                                                            className={`w-full px-4 py-2 text-sm text-left ${action.label === "Delete" ? "text-red-600" : "text-gray-700"} hover:bg-gray-100 flex items-center gap-2`}
                                                        >
                                                            {action.icon}
                                                            {action.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            {reactionPickerMessage === item.id && (
                                                <div className={`absolute ${item.sender === "me" ? "right-0" : "left-0"} -bottom-10 w-max bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-2 flex gap-1`}>
                                                    {reactions.map((r) => (
                                                        <button key={r} onClick={() => handleAddReaction(item, r)} className="text-lg hover:bg-gray-100 rounded p-1">
                                                            {r}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {forwardMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-lg p-4 w-96 max-h-96 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Forward Message</h3>
                        <div className="space-y-2">
                            {ChatListData.filter(c => c.id !== activeChat).map((targetChat) => (
                                <button
                                    key={targetChat.id}
                                    onClick={() => {
                                        const message = chat?.messages?.find(m => m.id === forwardMenu);
                                        if (message) handleForwardMessage(message, targetChat.id);
                                    }}
                                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        {targetChat.isGroup ? <FaUsers /> : <FaUser />}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium">{targetChat.username || targetChat.phone}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setForwardMenu(null)} className="w-full mt-4 py-2 bg-gray-200 rounded-lg">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {replyTo && (
                <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-sm font-medium text-blue-800">Replying to {replyTo.sender === "me" ? "yourself" : chat.username}</div>
                        <div className="text-sm text-blue-600 truncate">{replyTo.content}</div>
                    </div>
                    <button onClick={() => setReplyTo(null)} className="p-1 hover:bg-blue-100 rounded-full">
                        <FaTimes className="h-4 w-4 text-blue-600" />
                    </button>
                </div>
            )}

            {selectedFiles.length > 0 && (
                <div className="px-4 py-3 bg-white border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">Selected Files ({selectedFiles.length})</h4>
                        <button onClick={() => setSelectedFiles([])} className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1">
                            <FaRegTrashAlt size={12} />
                            Clear All
                        </button>
                    </div>
                    <div className="max-h-40 overflow-y-auto pr-2">
                        <div className="grid grid-cols-1 gap-2">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100">
                                    <div className="flex items-center gap-3 flex-1">
                                        {file.type.startsWith("image") ? (
                                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-200">
                                                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
                                            </div>
                                        ) : file.type.startsWith("video") ? (
                                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
                                                <FaVideo className="text-white text-lg" />
                                            </div>
                                        ) : file.type.startsWith("audio") ? (
                                            <div className="relative w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center">
                                                <FaMicrophone className="text-blue-600 text-lg" />
                                            </div>
                                        ) : (
                                            <div className="relative w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                                                <FaFile className="text-gray-500 text-xl" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-sm truncate">{file.name}</span>
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                    {getFileType(file.type)}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formatFileSize(file.size)}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => removeSelectedFile(index)} className="ml-2 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full">
                                        <FaTimes size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="border-t border-gray-200">
                <div className="h-16 flex items-center px-4 gap-2 relative">
                    <div className="relative">
                        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 rounded-full hover:bg-gray-100">
                            <MdEmojiEmotions className="h-5 w-5 text-gray-600" />
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute bottom-14 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 h-80 overflow-y-auto z-20">
                                <div className="space-y-4">
                                    {Object.entries(emojiCategories).map(([category, emojis]) => (
                                        <div key={category}>
                                            <h5 className="font-medium text-gray-700 mb-2 capitalize">{category}</h5>
                                            <div className="grid grid-cols-8 gap-1">
                                                {emojis.map((emoji) => (
                                                    <button key={emoji} onClick={() => setNewMessage(prev => prev + emoji)} className="text-lg hover:bg-gray-100 rounded p-1">
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button onClick={() => setShowAttachMenu(!showAttachMenu)} className="p-2 rounded-full hover:bg-gray-100">
                            <MdAttachFile className="h-5 w-5 text-gray-600" />
                        </button>
                        {showAttachMenu && (
                            <div className="absolute bottom-14 left-0 bg-white rounded-lg shadow-lg border border-gray-200 w-48 z-20">
                                {attachOptions.map((option) => (
                                    <button key={option.action} onClick={() => {
                                        if (option.action === "media" || option.action === "document") {
                                            handleAttachFile(option.action);
                                        }
                                        setShowAttachMenu(false);
                                    }} className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                        {option.icon}
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={isRecording ? `Recording... ${recordingTime}s` : "Type a message"}
                        className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
                    />
                    <button onClick={toggleRecording} className="p-2 rounded-full hover:bg-gray-100 relative">
                        <FaMicrophone className={`h-5 w-5 ${isRecording ? "text-red-600" : "text-gray-600"}`} />
                        {isRecording && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                        )}
                    </button>
                    <button onClick={handleSendMessage} className="p-2 rounded-full bg-[#004aad] text-white hover:bg-[#003d8a]">
                        <IoSend className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}