import { useEffect, useState } from "react";
import { MessageCircle, Settings, LogOut } from "lucide-react";
import { IoCall } from "react-icons/io5";
import { MdGroups, MdPermContactCalendar } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateactiveitem } from "../data/ChatSlice";
// import { IoArchiveOutline } from "react-icons/io5";
import { IoArchive } from "react-icons/io5";
// import { IoPeopleSharp } from "react-icons/io5";
import { MdPermMedia } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { unreadMessagesCountSelector } from "../data/chatSelectors";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
    const activeitem = useSelector(s => s.chat.activeitem);
    const unreadMessagesCount = useSelector(unreadMessagesCountSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = [
        { id: "chats", icon: MessageCircle, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null, path:"/chat/chats" },
        { id: "status", icon: FaRegCircle, dot: true, path:"/chat/status" },
        { id: "calls", icon: IoCall, path:"/chat/calls" },
        { id: "contacts", icon: MdPermContactCalendar, path:"/chat/contacts" },
        { id: "groups", icon: MdGroups, path:"/chat/groups" },
        { id: "favourites", icon: FaStar, path:"/chat/favourites" },
        { id: "archived", icon: IoArchive, path:"/chat/archived" },
        { id: "communities", icon: FaChalkboardTeacher, path:"/chat/communities" },
        { id: "media", icon: MdPermMedia, path:"/chat/media" },
        { id: "settings", icon: Settings, path:"/chat/settings" },
        { id: "profile", icon: CgProfile, path:"/chat/profile" },
    ];

    return (
        <aside className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-between py-4">
            <div className="flex flex-col gap-3">
                {items.slice(0, 7).map(i => (
                    <button
                        key={i.id}
                        title={i.id}
                        onClick={() => navigate(i.path)}
                        className={`relative p-2 rounded-full transition ${activeitem === i.id
                            ? "bg-[#004aad]/10 text-[#004aad]"
                            : "text-gray-500 hover:text-[#004aad]"
                            }`}
                    >
                        <i.icon size={22} />
                        {i.badge && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-[#38b6ff] text-white rounded-full flex items-center justify-center">
                                {i.badge}
                            </span>
                        )}
                        {i.dot && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#38b6ff] rounded-full" />
                        )}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                {items.slice(8).map((i) => (
                    <button
                        key={i.id}
                        onClick={() => navigate(i.path)}
                        className={`relative p-2 rounded-full transition ${activeitem === i.id
                            ? "bg-[#004aad]/10 text-[#004aad]"
                            : "text-gray-500 hover:text-[#004aad]"
                            }`}
                    >
                        <i.icon size={20} />
                    </button>
                ))}
            </div>
        </aside>
    );
}
