import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaUser, FaEdit, FaCamera, FaPhone, FaEnvelope, FaCalendar, FaClock, FaMobile, FaLaptop, FaSignOutAlt, FaCheck, FaTimes, FaSave, FaGlobe, FaChartBar } from "react-icons/fa";

export default function Profile() {
    const user = useSelector(state => state.chat.user);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        status: user.status
    });
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleEditChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            phone: user.phone,
            bio: user.bio,
            status: user.status
        });
        setIsEditing(false);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: <FaUser /> },
        { id: "devices", label: "Devices", icon: <FaMobile /> }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Profile</h2>
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <FaSignOutAlt />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
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
                    {activeTab === "overview" && (
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-8">
                                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 flex items-center justify-center">
                                            {user.profile ? (
                                                <img src={user.profile} alt={user.fullname} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <FaUser className="text-white text-3xl" />
                                            )}
                                        </div>
                                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center border-4 border-white">
                                            <FaCamera />
                                        </button>
                                    </div>
                                    
                                    <div className="flex-1 text-center sm:text-left">
                                        {isEditing ? (
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    value={editData.fullname}
                                                    onChange={(e) => handleEditChange('fullname', e.target.value)}
                                                    className="text-2xl font-bold text-gray-800 bg-gray-100 rounded-lg px-4 py-2 w-full"
                                                    placeholder="Full Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={editData.username}
                                                    onChange={(e) => handleEditChange('username', e.target.value)}
                                                    className="text-gray-500 bg-gray-100 rounded-lg px-4 py-2 w-full"
                                                    placeholder="Username"
                                                />
                                                <input
                                                    type="email"
                                                    value={editData.email}
                                                    onChange={(e) => handleEditChange('email', e.target.value)}
                                                    className="text-gray-500 bg-gray-100 rounded-lg px-4 py-2 w-full"
                                                    placeholder="Email"
                                                />
                                                <input
                                                    type="text"
                                                    value={editData.phone}
                                                    onChange={(e) => handleEditChange('phone', e.target.value)}
                                                    className="text-gray-500 bg-gray-100 rounded-lg px-4 py-2 w-full"
                                                    placeholder="Phone"
                                                />
                                                <input
                                                    type="text"
                                                    value={editData.status}
                                                    onChange={(e) => handleEditChange('status', e.target.value)}
                                                    className="text-gray-500 bg-gray-100 rounded-lg px-4 py-2 w-full"
                                                    placeholder="Status"
                                                />
                                                <textarea
                                                    value={editData.bio}
                                                    onChange={(e) => handleEditChange('bio', e.target.value)}
                                                    className="text-gray-600 bg-gray-100 rounded-lg px-4 py-2 w-full"
                                                    rows="2"
                                                    placeholder="Bio"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                                    <h3 className="text-2xl font-bold text-gray-800">{user.fullname}</h3>
                                                    {user.isVerified && (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <p className="text-gray-500">@{user.username}</p>
                                                    <p className="text-gray-600">{user.bio}</p>
                                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                        <span className="text-sm text-gray-500">
                                                            {user.isOnline ? 'Online' : `Last seen ${formatTime(user.lastSeen)}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex gap-2 mt-6">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={handleSave}
                                                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                                                    >
                                                        <FaSave />
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors flex items-center gap-2"
                                                    >
                                                        <FaTimes />
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                                                >
                                                    <FaEdit />
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                            <FaUser className="text-gray-500" />
                                            Personal Information
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <FaEnvelope className="text-gray-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium text-gray-800 break-all">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaPhone className="text-gray-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-medium text-gray-800">{user.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaCalendar className="text-gray-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500">Member Since</p>
                                                    <p className="font-medium text-gray-800">{formatDate(user.createdAt)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaClock className="text-gray-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500">Last Updated</p>
                                                    <p className="font-medium text-gray-800">{formatDate(user.updatedAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                            <FaChartBar className="text-gray-500" />
                                            Activity Stats
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-600">Total Messages</span>
                                                <span className="font-bold text-gray-800">{user.analytics.totalMessages}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-600">Total Calls</span>
                                                <span className="font-bold text-gray-800">{user.analytics.totalCalls}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-600">Joined Date</span>
                                                <span className="font-medium text-gray-800">{formatDate(user.analytics.joinedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                            <FaGlobe className="text-gray-500" />
                                            Privacy Settings
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Last Seen</p>
                                                <p className="font-medium text-gray-800 capitalize">{user.privacy.lastSeen}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Profile Photo</p>
                                                <p className="font-medium text-gray-800 capitalize">{user.privacy.profilePhoto}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Status</p>
                                                <p className="font-medium text-gray-800 capitalize">{user.privacy.status}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Stories</p>
                                                <p className="font-medium text-gray-800 capitalize">{user.privacy.stories}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h4 className="font-medium text-gray-800 mb-4">Preferences</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Theme</p>
                                                <p className="font-medium text-gray-800 capitalize">{user.preferences.theme}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Language</p>
                                                <p className="font-medium text-gray-800 uppercase">{user.preferences.language}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Font Size</p>
                                                <p className="font-medium text-gray-800 capitalize">{user.preferences.fontSize}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-500">Two-Factor Auth</p>
                                                <p className="font-medium text-gray-800">{user.twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "devices" && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h4 className="font-medium text-gray-800 mb-6">Active Devices</h4>
                                <div className="space-y-4">
                                    {user.devices.map(device => (
                                        <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                    {device.type === 'mobile' ? (
                                                        <FaMobile className="text-blue-600 text-xl" />
                                                    ) : (
                                                        <FaLaptop className="text-blue-600 text-xl" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 capitalize">{device.type}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <FaClock />
                                                        <span>Last active: {formatTime(device.lastActive)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {device.id === 'dev_web' && (
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                    Current Device
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-sm mx-4">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <FaSignOutAlt className="text-red-500 text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Logout Confirmation</h3>
                            <p className="text-gray-500 mb-6">Are you sure you want to logout from your account?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}