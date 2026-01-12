import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function ChatContainer() {
    return (
        <div className="h-screen flex flex-col">
            <TopBar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 bg-white flex items-center justify-center">
                    <p className="text-gray-400">
                        Select a chat to start messaging
                    </p>
                </div>
            </div>
        </div>
    );
}
