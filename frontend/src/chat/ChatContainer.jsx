import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Alert from "./Alert";

import ChatList from "./ChatList";
import ChatItem from "./ChatItem";
import Status from "./Status";
import Calls from "./Calls";
import Communities from "./Communities";
import Groups from "./Groups";
import Favourites from "./Favourites";
import Contacts from "./Contacts";
import Settings from "./Settings";
import Media from "./Media";
import Profile from "./Profile";
import Archived from "./Archived";
import Call from "./Calll";
import Notfound from "../components/Notfound";

import { updateactiveitem } from "../data/ChatSlice";

export default function ChatContainer() {
    const { path = "chats" } = useParams();
    const dispatch = useDispatch();
    const activeitem = useSelector((s) => s.chat.activeitem);

    useEffect(() => {
        dispatch(updateactiveitem(path));
    }, [path, dispatch]);

    const renderContent = () => {
        switch (activeitem) {
            case "chats":
                return (
                    <div className="flex h-full w-full">
                        <ChatList />
                        <ChatItem />
                    </div>
                );
            case "call":
                return <Call />;
            case "status":
                return <Status />;
            case "calls":
                return <Calls />;
            case "contacts":
                return <Contacts />;
            case "groups":
                return <Groups />;
            case "favourites":
                return <Favourites />;
            case "archived":
                return <Archived />;
            case "communities":
                return <Communities />;
            case "media":
                return <Media />;
            case "settings":
                return <Settings />;
            case "profile":
                return <Profile />;
            default:
                return <Notfound />;
        }
    };
    return (
        <div className="h-screen flex flex-col bg-white">
            <TopBar />
            <Alert />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-hidden">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
