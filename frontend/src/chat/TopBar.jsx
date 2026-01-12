export default function TopBar() {
    return (
        <header className="h-9 w-full flex items-center gap-3 px-4 bg-gray-50 border-b border-gray-200">
            <img src="/images/TalkFlow1.png"
                className="h-6 w-6"
                alt="TalkFlow Logo"
            />
            <span className="text-[#004aad] font-semibold text-md">
                TalkFlow
            </span>
        </header>
    );
}
