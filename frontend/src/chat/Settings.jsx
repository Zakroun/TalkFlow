import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaBell, FaLock, FaEye, FaEyeSlash, FaPalette, FaMoon, FaSun, FaVolumeUp, FaSave, FaShieldAlt, FaQuestionCircle } from "react-icons/fa";
import { setSuccessMessage,setErrorMessage } from "../data/ChatSlice";
export default function Settings() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("general");
    const [notifications, setNotifications] = useState({
        messageSound: true,
        callSound: true,
        vibration: true,
        preview: true,
        groupNotifications: true
    });
    const [privacy, setPrivacy] = useState({
        lastSeen: "everyone",
        profilePhoto: "contacts",
        readReceipts: true,
        typingIndicator: true
    });
    const [appearance, setAppearance] = useState({
        theme: "light",
        fontSize: "medium",
        chatBackground: "default"
    });
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        appLock: false,
        showPassword: false
    });
    const [password, setPassword] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handlePrivacyChange = (key, value) => {
        setPrivacy(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleAppearanceChange = (key, value) => {
        setAppearance(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSecurityChange = (key) => {
        setSecurity(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handlePasswordChange = (e) => {
        setPassword(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSavePassword = () => {
        if (password.new !== password.confirm) {
            dispatch(setErrorMessage("New passwords don't match!"));
            return;
        }
        dispatch(setSuccessMessage("Password updated successfully!"));
        setPassword({ current: "", new: "", confirm: "" });
    };

    const tabs = [
        { id: "general", label: "General", icon: <FaBell /> },
        { id: "privacy", label: "Privacy", icon: <FaLock /> },
        { id: "appearance", label: "Appearance", icon: <FaPalette /> },
        { id: "security", label: "Security", icon: <FaShieldAlt /> },
        { id: "help", label: "Help", icon: <FaQuestionCircle /> }
    ];

    const themeOptions = [
        { id: "light", label: "Light", icon: <FaSun /> },
        { id: "dark", label: "Dark", icon: <FaMoon /> },
        { id: "auto", label: "Auto", icon: <FaSun /> }
    ];

    const fontSizeOptions = [
        { id: "small", label: "Small" },
        { id: "medium", label: "Medium" },
        { id: "large", label: "Large" },
        { id: "xlarge", label: "Extra Large" }
    ];

    const backgroundOptions = [
        { id: "default", label: "Default" },
        { id: "solid", label: "Solid Color" },
        { id: "gradient", label: "Gradient" },
        { id: "custom", label: "Custom Image" }
    ];

    const privacyOptions = {
        lastSeen: [
            { id: "everyone", label: "Everyone" },
            { id: "contacts", label: "My Contacts" },
            { id: "nobody", label: "Nobody" }
        ],
        profilePhoto: [
            { id: "everyone", label: "Everyone" },
            { id: "contacts", label: "My Contacts" },
            { id: "nobody", label: "Nobody" }
        ]
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-bold text-gray-800">Settings</h2>
                <p className="text-gray-500 text-sm">Customize your chat experience</p>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 border-r border-gray-200 bg-white">
                    <div className="p-4">
                        <div className="space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`}
                                >
                                    <span className={`${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {tab.icon}
                                    </span>
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === "general" && (
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">General Settings</h3>
                            
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                        <FaBell className="text-gray-500" />
                                        Notifications
                                    </h4>
                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {key === 'messageSound' && "Play sound for new messages"}
                                                        {key === 'callSound' && "Play sound for incoming calls"}
                                                        {key === 'vibration' && "Vibrate on notification"}
                                                        {key === 'preview' && "Show message preview"}
                                                        {key === 'groupNotifications' && "Group notifications"}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleNotificationChange(key)}
                                                    className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${value ? 'translate-x-7' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                        <FaVolumeUp className="text-gray-500" />
                                        Sounds
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message Tone
                                            </label>
                                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>Default</option>
                                                <option>Chime</option>
                                                <option>Note</option>
                                                <option>Pop</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Call Ringtone
                                            </label>
                                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>Default Ringtone</option>
                                                <option>Digital</option>
                                                <option>Echo</option>
                                                <option>Classic</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "privacy" && (
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Privacy Settings</h3>
                            
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Who can see my...</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Seen & Online
                                            </label>
                                            <div className="space-y-2">
                                                {privacyOptions.lastSeen.map(option => (
                                                    <label key={option.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="lastSeen"
                                                            value={option.id}
                                                            checked={privacy.lastSeen === option.id}
                                                            onChange={(e) => handlePrivacyChange('lastSeen', e.target.value)}
                                                            className="text-blue-500"
                                                        />
                                                        <span className="text-gray-700">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Profile Photo
                                            </label>
                                            <div className="space-y-2">
                                                {privacyOptions.profilePhoto.map(option => (
                                                    <label key={option.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="profilePhoto"
                                                            value={option.id}
                                                            checked={privacy.profilePhoto === option.id}
                                                            onChange={(e) => handlePrivacyChange('profilePhoto', e.target.value)}
                                                            className="text-blue-500"
                                                        />
                                                        <span className="text-gray-700">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Other Privacy Settings</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">Read Receipts</p>
                                                <p className="text-sm text-gray-500">Show when messages are read</p>
                                            </div>
                                            <button
                                                onClick={() => handlePrivacyChange('readReceipts', !privacy.readReceipts)}
                                                className={`w-12 h-6 rounded-full transition-colors ${privacy.readReceipts ? 'bg-blue-500' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${privacy.readReceipts ? 'translate-x-7' : 'translate-x-1'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">Typing Indicators</p>
                                                <p className="text-sm text-gray-500">Show when others are typing</p>
                                            </div>
                                            <button
                                                onClick={() => handlePrivacyChange('typingIndicator', !privacy.typingIndicator)}
                                                className={`w-12 h-6 rounded-full transition-colors ${privacy.typingIndicator ? 'bg-blue-500' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${privacy.typingIndicator ? 'translate-x-7' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "appearance" && (
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Appearance Settings</h3>
                            
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Theme</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {themeOptions.map(theme => (
                                            <button
                                                key={theme.id}
                                                onClick={() => handleAppearanceChange('theme', theme.id)}
                                                className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 ${appearance.theme === theme.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <span className={`text-xl ${appearance.theme === theme.id ? 'text-blue-500' : 'text-gray-500'}`}>
                                                    {theme.icon}
                                                </span>
                                                <span className="font-medium text-gray-700">{theme.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Text Size</h4>
                                    <div className="grid grid-cols-4 gap-3">
                                        {fontSizeOptions.map(size => (
                                            <button
                                                key={size.id}
                                                onClick={() => handleAppearanceChange('fontSize', size.id)}
                                                className={`py-3 rounded-lg border ${appearance.fontSize === size.id ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                                            >
                                                <span className="font-medium">{size.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Chat Background</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {backgroundOptions.map(bg => (
                                            <button
                                                key={bg.id}
                                                onClick={() => handleAppearanceChange('chatBackground', bg.id)}
                                                className={`p-4 rounded-lg border-2 flex items-center justify-center ${appearance.chatBackground === bg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <span className="font-medium text-gray-700">{bg.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Security Settings</h3>
                            
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                        <FaLock className="text-gray-500" />
                                        Change Password
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={security.showPassword ? "text" : "password"}
                                                    name="current"
                                                    value={password.current}
                                                    onChange={handlePasswordChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter current password"
                                                />
                                                <button
                                                    onClick={() => handleSecurityChange('showPassword')}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                >
                                                    {security.showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                New Password
                                            </label>
                                            <input
                                                type={security.showPassword ? "text" : "password"}
                                                name="new"
                                                value={password.new}
                                                onChange={handlePasswordChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter new password"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type={security.showPassword ? "text" : "password"}
                                                name="confirm"
                                                value={password.confirm}
                                                onChange={handlePasswordChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Confirm new password"
                                            />
                                        </div>

                                        <button
                                            onClick={handleSavePassword}
                                            className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaSave />
                                            Update Password
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Security Features</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                                                <p className="text-sm text-gray-500">Add extra security to your account</p>
                                            </div>
                                            <button
                                                onClick={() => handleSecurityChange('twoFactorAuth')}
                                                className={`w-12 h-6 rounded-full transition-colors ${security.twoFactorAuth ? 'bg-blue-500' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${security.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">App Lock</p>
                                                <p className="text-sm text-gray-500">Lock app with PIN or biometric</p>
                                            </div>
                                            <button
                                                onClick={() => handleSecurityChange('appLock')}
                                                className={`w-12 h-6 rounded-full transition-colors ${security.appLock ? 'bg-blue-500' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${security.appLock ? 'translate-x-7' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "help" && (
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Help & Support</h3>
                            
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Frequently Asked Questions</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="font-medium text-gray-800 mb-2">How do I backup my chats?</p>
                                            <p className="text-sm text-gray-600">Go to Settings → Chats → Chat Backup to backup your conversations.</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="font-medium text-gray-800 mb-2">How do I delete my account?</p>
                                            <p className="text-sm text-gray-600">Go to Settings → Account → Delete Account to permanently remove your account.</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="font-medium text-gray-800 mb-2">How do I block a contact?</p>
                                            <p className="text-sm text-gray-600">Open the chat, tap on contact name → Block Contact.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Contact Support</h4>
                                    <div className="space-y-4">
                                        <button className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                            <p className="font-medium text-gray-800">Email Support</p>
                                            <p className="text-sm text-gray-500">support@chat.com</p>
                                        </button>
                                        <button className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                            <p className="font-medium text-gray-800">Live Chat</p>
                                            <p className="text-sm text-gray-500">Available 24/7</p>
                                        </button>
                                        <button className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                            <p className="font-medium text-gray-800">Help Center</p>
                                            <p className="text-sm text-gray-500">Browse our documentation</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}