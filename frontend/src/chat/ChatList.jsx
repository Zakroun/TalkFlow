import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { IoArchiveOutline, IoSettingsOutline } from "react-icons/io5";
import { TbLogout, TbBrandWechat, TbArrowLeft } from "react-icons/tb";
import { LuMessageSquarePlus } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { FaUser, FaUsers, FaPhoneAlt } from "react-icons/fa";
import formatMessageTime from "../js/formatMessageTime";
import { TiPin } from "react-icons/ti";
import { updateactiveChat, updateallchats, updateactiveitem, createnewchat } from "../data/ChatSlice";
import { LuDelete } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";

export default function ChatList() {
    const ChatData = useSelector(s => s.chat.ChatData);
    const activeChat = useSelector(s => s.chat.activeChat);
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [showNewChat, setShowNewChat] = useState(false);
    const [showKeypad, setShowKeypad] = useState(false);
    const [phoneInput, setPhoneInput] = useState("");
    const filters = ["All", "Unread", "Favourites", "Groups", "Contacts"];

    const ChatListData = useMemo(() => [...ChatData].filter(c => !c.isArchived && !c.isBlocked && c.messages.length > 0 && c.messages.length > 0).sort((a, b) => a.isPinned !== b.isPinned ? (a.isPinned ? -1 : 1) : new Date(b.messages.at(-1)?.time || 0) - new Date(a.messages.at(-1)?.time || 0)), [ChatData]);

    const AllContacts = useMemo(() => {
        return ChatData.filter(c => c.isArchived === false && c.isBlocked === false);
    }, [ChatData]);

    const filteredChats = useMemo(() => {
        let filtered = ChatListData.filter(chat => {
            const searchLower = search.toLowerCase();
            const usernameMatch = chat.username.toLowerCase().includes(searchLower);
            const phoneMatch = chat.phone.toLowerCase().includes(searchLower);
            const lastMessageMatch = chat.messages[chat.messages.length - 1]?.content.toLowerCase().includes(searchLower);
            return usernameMatch || phoneMatch || lastMessageMatch;
        });

        switch (activeFilter) {
            case "Unread":
                return filtered.filter(chat => chat.unread > 0);
            case "Favourites":
                return filtered.filter(chat => chat.isFavourite);
            case "Groups":
                return filtered.filter(chat => chat.isGroup);
            case "Contacts":
                return filtered.filter(chat => chat.isContact && !chat.isGroup);
            default:
                return filtered;
        }
    }, [ChatListData, activeFilter, search]);

    const zeroMessageContacts = useMemo(() => {
        return AllContacts.filter(chat => chat.messages.length === 0);
    }, [AllContacts]);

    const filteredZeroMessageContacts = useMemo(() => {
        return zeroMessageContacts.filter(contact => {
            const searchLower = phoneInput.toLowerCase();
            return contact.username.toLowerCase().includes(searchLower) || contact.phone.toLowerCase().includes(searchLower);
        });
    }, [zeroMessageContacts, phoneInput]);

    const totalUnread = useMemo(() => {
        return ChatListData.reduce((sum, chat) => sum + chat.unread, 0);
    }, [ChatListData]);

    const handleKeyClick = (key) => {
        if (key === "delete") {
            setPhoneInput(prev => prev.slice(0, -1));
        } else if (key === "clear") {
            setPhoneInput("");
        } else {
            setPhoneInput(prev => prev + key);
        }
    };

    const handleStartNewChat = (contact) => {
        dispatch(updateactiveChat(contact.id));
        setShowNewChat(false);
        setShowKeypad(false);
        setSearch("");
        setPhoneInput("");
    };

    const handleCreateNewChat = () => {
        if (phoneInput.trim() === "") return;
        const newid = ChatData.length + 1;
        const newChat = {
            id: newid,
            username: "",
            phone: phoneInput,
            avatar: "",
            unread: 0,
            isOnline: false,
            isGroup: false,
            isContact: false,
            isArchived: false,
            isFavourite: false,
            isBlocked: false,
            messages: []
        };
        dispatch(createnewchat(newChat));
        setPhoneInput("");
        setShowKeypad(false);
    };

    useEffect(() => {
        if (showNewChat && !showKeypad) {
            setPhoneInput("");
        }
    }, [showKeypad, showNewChat]);

    return (
        <div className="w-[360px] bg-gray-50 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {showNewChat && (
                        <button
                            onClick={() => {
                                setShowNewChat(false);
                                setShowKeypad(false);
                                setPhoneInput("");
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full"
                        >
                            <TbArrowLeft size={20} className="text-gray-800" />
                        </button>
                    )}
                    <h2 className="text-xl font-bold text-gray-800">
                        {showNewChat ? "New Chat" : "Chats"}
                    </h2>
                </div>
                <div className="flex items-center gap-1">
                    {!showNewChat && (
                        <button
                            onClick={() => {
                                setShowNewChat(true);
                                setShowKeypad(false);
                                setPhoneInput("");
                            }}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <LuMessageSquarePlus size={20} className="text-gray-800" />
                        </button>
                    )}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <HiDotsVertical size={20} className="text-gray-800" />
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <button onClick={() => dispatch(updateallchats("readall"))} className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                    <MdOutlineMarkChatRead size={18} />
                                    Mark all as read
                                </button>
                                <button onClick={() => dispatch(updateallchats("archiveall"))} className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                    <IoArchiveOutline size={18} />
                                    Archive all conversation
                                </button>
                                <button onClick={() => dispatch(updateactiveitem("settings"))} className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                    <IoSettingsOutline size={18} />
                                    Settings
                                </button>
                                <hr className="border-gray-200" />
                                <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 flex items-center gap-2">
                                    <TbLogout size={18} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-3">
                <input
                    value={showNewChat ? phoneInput : search}
                    onChange={(e) => showNewChat ? setPhoneInput(e.target.value) : setSearch(e.target.value)}
                    placeholder={showNewChat ? "Search contacts or type phone number" : "Search or start new chat"}
                    className="w-full px-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {!showNewChat ? (
                <>
                    <div className="flex gap-2 px-3 pb-2 flex-wrap">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 text-xs rounded-full whitespace-nowrap ${activeFilter === filter
                                    ? "bg-[#004aad] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {filter} {" "}
                                {filter === "Unread" ? totalUnread > 0 && totalUnread : ""}
                            </button>
                        ))}
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {filteredChats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => dispatch(updateactiveChat(chat.id))}
                                className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${activeChat === chat.id ? "bg-gray-100" : ""} hover:bg-gray-100 border-b border-gray-100`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium overflow-hidden">
                                        {chat.avatar !== "" ? (
                                            <img
                                                src={chat.avatar}
                                                alt={chat.username}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-gray-500">
                                                {chat.isGroup ? <FaUsers /> : <FaUser />}
                                            </div>
                                        )}
                                    </div>
                                    {chat.isOnline && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-sm font-semibold text-gray-800 truncate">
                                            {chat.username !== "" ? chat.username : chat.phone}
                                        </h4>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">
                                            {formatMessageTime(chat.messages[chat.messages.length - 1].time)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-gray-500 truncate">
                                            {chat.messages[chat.messages.length - 1].content}
                                        </p>
                                        {chat.unread > 0 && (
                                            <span className="min-w-[18px] h-[18px] text-[10px] bg-[#38b6ff] text-white rounded-full flex items-center justify-center flex-shrink-0">
                                                {chat.unread}
                                            </span>
                                        )}
                                        {
                                            chat.isPinned === true ? <TiPin /> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="overflow-y-auto flex-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-700">Contacts with no messages</h3>
                            <button
                                onClick={() => {
                                    setShowKeypad(!showKeypad);
                                    if (!showKeypad) {
                                        setPhoneInput("");
                                    }
                                }}
                                className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                <FaPhoneAlt />
                                {showKeypad ? "Hide Keypad" : "Show Keypad"}
                            </button>
                        </div>
                        {showKeypad ? (
                            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                                <div className="text-center mb-4">
                                    <div className="text-2xl font-mono text-gray-800 min-h-[40px] mb-3">
                                        {phoneInput || "Enter phone number"}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCreateNewChat}
                                            disabled={!phoneInput}
                                            className={`flex-1 py-2 rounded-lg ${phoneInput ? 'bg-[#004aad] text-white' : 'bg-gray-200 text-gray-400'} font-medium`}
                                        >
                                            Create Chat
                                        </button>
                                        {phoneInput && (
                                            <button
                                                onClick={() => setPhoneInput("")}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 justify-center"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => handleKeyClick(key.toString())}
                                            className="w-full h-12 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => handleKeyClick("clear")}
                                        className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 justify-center"
                                    >
                                        <AiOutlineDelete />
                                        Delete All
                                    </button>
                                    <button
                                        onClick={() => handleKeyClick("delete")}
                                        className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 justify-center"
                                    >
                                        <LuDelete />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {filteredZeroMessageContacts.length > 0 ? (
                                    filteredZeroMessageContacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            onClick={() => handleStartNewChat(contact)}
                                            className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-100"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                                {contact.isGroup ? <FaUsers /> : <FaUser />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-800">
                                                    {contact.username || contact.phone}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {contact.phone}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : phoneInput && (
                                    <p className="text-sm text-gray-500 py-2">No contacts found</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
            <button
                onClick={() => dispatch(updateactiveChat("ai"))}
                className="absolute bottom-4 left-[350px] w-12 h-12 bg-[#004aad] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#003d8a]"
            >
                <TbBrandWechat size={28} />
            </button>
        </div>
    );
}