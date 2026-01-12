import { useState } from "react";
import { MessageCircle, Settings, LogOut } from "lucide-react";
import { IoCall } from "react-icons/io5";
import { MdGroups, MdPermContactCalendar } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState("chats");

    const items = [
        { id: "chats", icon: MessageCircle, badge: 3 },
        { id: "status", icon: FaRegCircle, dot: true },
        { id: "calls", icon: IoCall },
        { id: "contacts", icon: MdPermContactCalendar },
        { id: "groups", icon: MdGroups },
    ];

    return (
        <aside className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-between py-4">
            <div className="flex flex-col gap-3">
                {items.map(({ id, icon: Icon, badge, dot }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`relative p-2 rounded-full transition ${
                            activeTab === id
                                ? "bg-[#004aad]/10 text-[#004aad]"
                                : "text-gray-500 hover:text-[#004aad]"
                        }`}
                    >
                        <Icon size={22} />
                        {badge && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-[#38b6ff] text-white rounded-full flex items-center justify-center">
                                {badge}
                            </span>
                        )}
                        {dot && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#38b6ff] rounded-full" />
                        )}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                <button className="p-2 rounded-full text-gray-500 hover:text-[#004aad] hover:bg-[#004aad]/10">
                    <Settings size={20} />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-[#004aad] hover:bg-[#004aad]/10">
                    <LogOut size={20} />
                </button>
            </div>
        </aside>
    );
}
