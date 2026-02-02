export const user = {
    id: 0,
    fullname: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+212 6-567-8901",
    profile: "",
    bio: "Hey there! I’m using TalkFlow",
    status: "Available",
    isOnline: true,
    lastSeen: "2026-01-25T22:30:00.000Z",
    privacy: {
        lastSeen: "contacts",
        profilePhoto: "everyone",
        status: "contacts",
        stories: "contacts"
    },
    notifications: {
        muteAll: false,
        storyNotifications: true
    },
    isVerified: false,
    twoFactorEnabled: false,
    createdAt: "2025-12-01T09:00:00.000Z",
    updatedAt: "2026-01-25T18:20:00.000Z",
    devices: [
        {
            id: "dev_web",
            type: "web",
            lastActive: "2026-01-25T21:10:00.000Z"
        },
        {
            id: "dev_mobile",
            type: "mobile",
            lastActive: "2026-01-25T18:45:00.000Z"
        }
    ],
    preferences: {
        theme: "dark",
        language: "fr",
        fontSize: "medium"
    },
    analytics: {
        totalMessages: 1240,
        totalCalls: 48,
        joinedAt: "2025-12-01"
    },
    stories: [
        {
            id: "u0_s1",
            type: "text",
            content: "hello everyone!",
            background : "blue-600",
            caption: "Hello world!",
            duration: 6000,
            createdAt: "2026-01-28T10:00:00.000Z",
            expiresAt: "2026-01-31T10:00:00.000Z",
            viewers: [
                {
                    userid : 1,
                    viewedAt : "2026-01-28T12:00:00.000Z",
                },
                {
                    userid : 2,
                    viewedAt : "2026-01-28T13:00:00.000Z",
                },
                {
                    userid : 3,
                    viewedAt : "2026-01-28T14:00:00.000Z",
                }
            ],
            isSeen: false
        },
        {
            id: "u0_s2",
            type: "image",
            content: "/stories/photo.jpg",
            caption: "Hello world!",
            duration: 6000,
            createdAt: "2026-01-28T10:00:00.000Z",
            expiresAt: "2026-01-31T10:00:00.000Z",
            viewers: [
                {
                    userid : 1,
                    viewedAt : "2026-01-28T12:00:00.000Z",
                },
                {
                    userid : 2,
                    viewedAt : "2026-01-28T13:00:00.000Z",
                },
                {
                    userid : 3,
                    viewedAt : "2026-01-28T14:00:00.000Z",
                }
            ],
            isSeen: false
        },
        {
            id: "u0_s3",
            type: "image",
            content: "/stories/photo2.jpg",
            caption: "Another photo",
            duration: 6000,
            createdAt: "2026-01-28T10:00:00.000Z",
            expiresAt: "2026-01-31T10:00:00.000Z",
            viewers: [
                {
                    userid : 1,
                    viewedAt : "2026-01-28T12:00:00.000Z",
                },
                {
                    userid : 2,
                    viewedAt : "2026-01-28T13:00:00.000Z",
                },
                {
                    userid : 3,
                    viewedAt : "2026-01-28T14:00:00.000Z",
                }
            ],
            isSeen: false
        }
    ]
};

export const Users = [
    {
        id: 1,
        chatId: 1,
    },
    {
        id: 2,
        chatId: 2,
    },
    {
        id: 3,
        chatId: 3,
    },
    {
        id: 4,
        chatId: 4,
    },
    {
        id: 5,
        chatId: 5,
    },
    {
        id: 6,
        chatId: 6,
    },
    {
        id: 7,
        chatId: 7,
    }
]

export const ChatListData = [
    {
        id: 1,
        username: "Mohamed Amine",
        phone: "+212 780-603614",
        avatar: "",
        unread: 0,
        isOnline: true,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: true,
        messages: [
            {
                id: 1,
                sender: "me",
                type: "text",
                content: "I'll be there in 10 minutes",
                reactions: ["👍"],
                time: "2026-01-16T09:14:30.123Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "him",
                type: "text",
                content: "Perfect, see you soon!",
                reactions: [],
                time: "2026-01-16T09:15:45.456Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Should I bring anything?",
                reactions: [],
                time: "2026-01-16T09:16:15.789Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 4,
                sender: "him",
                type: "text",
                content: "Just yourself is fine, thanks!",
                reactions: ["❤️"],
                time: "2026-01-16T09:17:20.321Z",
                status: "seen",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 1,
                type: "voice",
                username: "Mohamed Amine",
                phone: "+212 780-603614",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [
            {
                id: "u1_s1",
                type: "image",
                content: "/stories/photo.jpg",
                caption: "Morning vibes ☀️",
                duration: 6000,
                createdAt: "2026-01-28T08:00:00.000Z",
                expiresAt: "2026-01-31T08:00:00.000Z",
                viewers: [
                    {
                        userid : 4,
                        viewedAt : "2026-01-28T10:00:00.000Z",
                    }
                ],
                isSeen: false
            },
            {
                id: "u1_s1",
                type: "image",
                content: "/stories/photo2.jpg",
                caption: "Morning vibes ☀️",
                duration: 6000,
                createdAt: "2026-01-28T08:00:00.000Z",
                expiresAt: "2026-01-31T08:00:00.000Z",
                viewers: [
                    {
                        userid : 4,
                        viewedAt : "2026-01-28T10:00:00.000Z",
                    },
                    {
                        userid : 5,
                        viewedAt : "2026-01-28T11:00:00.000Z",
                    }
                ],
                isSeen: false
            },
            {
                id: "u1_s2",
                type: "video",
                content: "/stories/video.mp4",
                caption: "Coffee time ☕",
                duration: 59000,
                createdAt: "2026-01-28T08:05:00.000Z",
                expiresAt: "2026-01-31T08:05:00.000Z",
                viewers: [
                    {
                        userid : 4,
                        viewedAt : "2026-01-28T10:00:00.000Z",
                    },
                    {
                        userid : 5,
                        viewedAt : "2026-01-28T11:00:00.000Z",
                    }
                ],
                isSeen: false
            }
        ],
        media: [
            {
                id: "m1",
                messageId: 12,
                senderId: "me",
                type: "image",
                url: "/media/image1.jpg",
                thumbnail: "/media/images/thumb1.jpg",
                fileName: "",
                fileSize: 2.4 * 1024 * 1024,
                duration: "",
                linkPreview: null,
                createdAt: "2026-01-24T15:20:10.000Z",
                isFavourite: false,
                isDeleted: false
            },
            {
                id: "m2",
                messageId: 18,
                senderId: 2,
                type: "video",
                url: "/media/video1.mp4",
                thumbnail: "/media/images/video_thumb.jpg",
                duration: "00:00:32",
                fileName: "",
                fileSize: 12.4 * 1024 * 1024,
                linkPreview: null,
                createdAt: "2026-01-25T10:05:00.000Z",
                isFavourite: true,
                isDeleted: false
            },
            {
                id: "m3",
                messageId: 22,
                senderId: "me",
                type: "file",
                url: "/media/contract.pdf",
                fileName: "contract.pdf",
                fileSize: 2.3 * 1024 * 1024,
                thumbnail: "",
                duration: "",
                linkPreview: null,
                createdAt: "2026-01-25T11:30:45.000Z",
                isFavourite: false,
                isDeleted: false
            },
            {
                id: "m4",
                messageId: 25,
                senderId: 3,
                type: "link",
                url: "https://react.dev",
                linkPreview: {
                    title: "React – A JavaScript library",
                    description: "Build user interfaces",
                    image: "/media/react.png"
                },
                thumbnail: "",
                fileName: "",
                fileSize: "",
                duration: "",
                createdAt: "2026-01-25T14:12:00.000Z",
                isFavourite: false,
                isDeleted: false
            }
        ]
    },
    {
        id: 2,
        username: "Yassin",
        phone: "+212 760-603614",
        avatar: "",
        unread: 1,
        isOnline: true,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "him",
                type: "text",
                content: "Are we still meeting tomorrow?",
                reactions: [],
                time: "2026-01-15T14:30:10.555Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "me",
                type: "text",
                content: "Yes, 3 PM at the usual place",
                reactions: ["👍"],
                time: "2026-01-15T14:35:25.666Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 3,
                sender: "him",
                type: "text",
                content: "Great! Looking forward to it",
                reactions: [],
                time: "2026-01-15T14:36:40.777Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "me",
                type: "text",
                content: "Me too. Don't forget the documents",
                reactions: [],
                time: "2026-01-15T14:37:55.888Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 5,
                sender: "him",
                type: "text",
                content: "God bless you, my friend",
                reactions: [],
                time: "2026-01-15T14:38:30.999Z",
                status: "delivered",
                isFavourite: true
            },
        ],
        calls: [
            {
                id: 2,
                type: "voice",
                username: "Yassin",
                phone: "+212 760-603614",
                status: "missed",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [
            {
                id: "u2_s1",
                type: "image",
                content: "/stories/photo.jpg",
                caption: "Work mode 💻",
                duration: 6000,
                createdAt: "2026-01-28T09:00:00.000Z",
                expiresAt: "2026-01-31T09:00:00.000Z",
                viewers: [1],
                isSeen: true
            },
            {
                id: "u2_s2",
                type: "video",
                content: "/stories/video.mp4",
                caption: "Short break 🎧",
                duration: 59000,
                createdAt: "2026-01-28T09:10:00.000Z",
                expiresAt: "2026-01-31T09:10:00.000Z",
                viewers: [1],
                isSeen: true
            }
        ],
        media: [
            {
                id: "m1",
                messageId: 12,
                senderId: "me",
                type: "image",
                url: "/media/image1.jpg",
                thumbnail: "/media/images/thumb1.jpg",
                fileName: "",
                fileSize: 2.4 * 1024 * 1024,
                duration: "",
                linkPreview: null,
                createdAt: "2026-01-24T15:20:10.000Z",
                isFavourite: false,
                isDeleted: false
            },
            {
                id: "m2",
                messageId: 18,
                senderId: 2,
                type: "video",
                url: "/media/video1.mp4",
                thumbnail: "/media/images/video_thumb.jpg",
                duration: "00:00:32",
                fileName: "",
                fileSize: 12.4 * 1024 * 1024,
                linkPreview: null,
                createdAt: "2026-01-25T10:05:00.000Z",
                isFavourite: true,
                isDeleted: false
            },
            {
                id: "m3",
                messageId: 22,
                senderId: "me",
                type: "file",
                url: "/media/contract.pdf",
                fileName: "contract.pdf",
                fileSize: 2.3 * 1024 * 1024,
                thumbnail: "",
                duration: "",
                linkPreview: null,
                createdAt: "2026-01-25T11:30:45.000Z",
                isFavourite: false,
                isDeleted: false
            },
            {
                id: "m4",
                messageId: 25,
                senderId: 3,
                type: "link",
                url: "https://react.dev",
                linkPreview: {
                    title: "React – A JavaScript library",
                    description: "Build user interfaces",
                    image: "/media/react.png"
                },
                thumbnail: "",
                fileName: "",
                fileSize: "",
                duration: "",
                createdAt: "2026-01-25T14:12:00.000Z",
                isFavourite: false,
                isDeleted: false
            }
        ]
    },
    {
        id: "ai",
        username: "TalkFlow AI",
        phone: "AI Assistant",
        avatar: "/images/TalkFlow3.png",
        isOnline: true,
        unread: 0,
        isGroup: false,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "ai",
                content: "Hello 👋 I'm TalkFlow AI. How can I help you?",
                time: new Date().toISOString(),
                isFavourite: false
            }
        ],
        stories: []
    },
    {
        id: 3,
        username: "zakaria",
        phone: "+212 750-603614",
        avatar: "",
        unread: 0,
        isOnline: false,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "me",
                type: "text",
                content: "Congratulations on the new job!",
                reactions: [],
                time: "2026-01-14T11:20:15.111Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "him",
                type: "text",
                content: "Thank you so much!",
                reactions: ["🙏"],
                time: "2026-01-14T11:25:30.222Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "When do you start?",
                reactions: [],
                time: "2026-01-14T11:26:45.333Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "him",
                type: "text",
                content: "Next Monday. I'm really excited!",
                reactions: ["😊"],
                time: "2026-01-14T11:30:10.444Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 5,
                sender: "me",
                type: "text",
                content: "Amen, God bless you",
                reactions: [],
                time: "2026-01-14T11:31:25.555Z",
                status: "seen",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 3,
                type: "voice",
                username: "",
                phone: "+212 750-603614",
                status: "missed",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: [
            {
                id: "m1",
                messageId: 12,
                senderId: "me",
                type: "image",
                url: "/media/image1.jpg",
                thumbnail: "/media/images/thumb1.jpg",
                fileName: "",
                fileSize: 2.4 * 1024 * 1024,
                duration: "",
                linkPreview: null,
                createdAt: "2026-01-24T15:20:10.000Z",
                isFavourite: false,
                isDeleted: false
            },
            {
                id: "m2",
                messageId: 18,
                senderId: 2,
                type: "video",
                url: "/media/video1.mp4",
                thumbnail: "/media/images/video_thumb.jpg",
                duration: "00:00:32",
                fileName: "",
                fileSize: 12.4 * 1024 * 1024,
                linkPreview: null,
                createdAt: "2026-01-25T10:05:00.000Z",
                isFavourite: true,
                isDeleted: false
            },
            {
                id: "m3",
                messageId: 22,
                senderId: "me",
                type: "file",
                url: "/media/contract.pdf",
                fileName: "contract.pdf",
                fileSize: 2.3 * 1024 * 1024,
                thumbnail: "",
                duration: "",
                linkPreview: null,
                createdAt: "2026-01-25T11:30:45.000Z",
                isFavourite: false,
                isDeleted: false
            },
            {
                id: "m4",
                messageId: 25,
                senderId: 3,
                type: "link",
                url: "https://react.dev",
                linkPreview: {
                    title: "React – A JavaScript library",
                    description: "Build user interfaces",
                    image: "/media/react.png"
                },
                thumbnail: "",
                fileName: "",
                fileSize: "",
                duration: "",
                createdAt: "2026-01-25T14:12:00.000Z",
                isFavourite: false,
                isDeleted: false
            }
        ]
    },
    {
        id: 4,
        username: "Karim",
        phone: "+212 676-822330",
        avatar: "",
        unread: 2,
        isOnline: false,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "him",
                type: "voice",
                content: "/media/voices/voice_message_002.mp3",
                duration: 15,
                reactions: [],
                time: "2026-01-13T16:45:00.123Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 2,
                sender: "me",
                type: "text",
                content: "Got your voice message, thanks!",
                reactions: [],
                time: "2026-01-13T16:47:15.456Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 3,
                sender: "him",
                type: "text",
                content: "Can you send me that file?",
                reactions: [],
                time: "2026-01-13T17:00:30.789Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "me",
                type: "file",
                content: "project_document.pdf",
                fileSize: "2.4 MB",
                reactions: [],
                time: "2026-01-13T17:05:45.321Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 5,
                sender: "him",
                type: "voice",
                content: "/media/voices/voice_message_002.mp3",
                duration: 15,
                reactions: [],
                time: "2026-01-13T17:10:20.654Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 6,
                sender: "him",
                type: "text",
                content: "Let me know if you need anything else",
                reactions: [],
                time: "2026-01-13T17:12:35.987Z",
                status: "sent",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 4,
                type: "voice",
                username: "Karim",
                phone: "+212 676-822330",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [
            {
                id: "u3_s1",
                type: "image",
                content: "/stories/photo.jpg",
                caption: "Gym day 💪",
                duration: 5000,
                createdAt: "2026-01-20T10:00:00.000Z",
                expiresAt: "2026-01-21T10:00:00.000Z",
                viewers: [],
                isSeen: false
            },
            {
                id: "u3_s2",
                type: "video",
                content: "/stories/video.mp4",
                caption: "Last set 🔥",
                createdAt: "2026-01-20T10:07:00.000Z",
                expiresAt: "2026-01-21T10:07:00.000Z",
                viewers: [],
                isSeen: false
            }
        ],
        media: []
    },
    {
        id: 5,
        username: "karima",
        phone: "+212 690-123456",
        avatar: "",
        unread: 3,
        isOnline: true,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "me",
                type: "text",
                content: "The meeting has been rescheduled",
                reactions: [],
                time: "2026-01-12T10:00:00.111Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "him",
                type: "text",
                content: "To when?",
                reactions: [],
                time: "2026-01-12T10:05:15.222Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Tomorrow at 11 AM instead of 10",
                reactions: [],
                time: "2026-01-12T10:06:30.333Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "him",
                type: "text",
                content: "Got it, thanks for the update",
                reactions: ["👍"],
                time: "2026-01-12T10:07:45.444Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 5,
                sender: "me",
                type: "text",
                content: "No problem. See you then!",
                reactions: [],
                time: "2026-01-12T10:08:20.555Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 6,
                sender: "him",
                type: "text",
                content: "Actually, can we move it to 2 PM?",
                reactions: [],
                time: "2026-01-12T10:30:35.666Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 7,
                sender: "him",
                type: "text",
                content: "I have a conflict in the morning",
                reactions: [],
                time: "2026-01-12T10:31:50.777Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 8,
                sender: "him",
                type: "text",
                content: "Let me know if that works",
                reactions: [],
                time: "2026-01-12T10:32:15.888Z",
                status: "sent",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 5,
                type: "voice",
                username: "",
                phone: "+212 690-123456",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 6,
        username: "Sara",
        phone: "+212 654-987321",
        avatar: "",
        unread: 0,
        isOnline: false,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "him",
                type: "text",
                content: "Happy birthday! 🎉",
                reactions: [],
                time: "2026-01-12T00:01:00.123Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 2,
                sender: "me",
                type: "text",
                content: "Thank you! That's so kind of you",
                reactions: ["❤️"],
                time: "2026-01-12T08:30:15.456Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 3,
                sender: "him",
                type: "image",
                content: "birthday_gift.jpg",
                reactions: [],
                time: "2026-01-12T09:00:30.789Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 4,
                sender: "me",
                type: "text",
                content: "This is amazing! Thank you so much!",
                reactions: ["🎂"],
                time: "2026-01-12T09:05:45.321Z",
                status: "seen",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 6,
                type: "voice",
                username: "Sara",
                phone: "+212 654-987321",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [
            {
                id: "u3_s1",
                type: "image",
                content: "/stories/photo.jpg",
                caption: "Gym day 💪",
                duration: 5000,
                createdAt: "2026-01-20T10:00:00.000Z",
                expiresAt: "2026-01-21T10:00:00.000Z",
                viewers: [],
                isSeen: false
            },
            {
                id: "u3_s2",
                type: "video",
                content: "/stories/video.mp4",
                caption: "Last set 🔥",
                createdAt: "2026-01-20T10:07:00.000Z",
                expiresAt: "2026-01-21T10:07:00.000Z",
                viewers: [],
                isSeen: false
            }
        ],
        media: []
    },
    {
        id: 7,
        username: "rouane",
        phone: "+212 777-888999",
        avatar: "",
        unread: 0,
        isOnline: true,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "me",
                type: "text",
                content: "Dinner tonight at 7?",
                reactions: [],
                time: "2026-01-12T12:00:00.111Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "him",
                type: "text",
                content: "Sounds good! Italian or Chinese?",
                reactions: [],
                time: "2026-01-12T12:05:15.222Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Italian, I'm craving pasta",
                reactions: ["🍝"],
                time: "2026-01-12T12:06:30.333Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 4,
                sender: "him",
                type: "text",
                content: "Perfect! See you at Mario's",
                reactions: ["👌"],
                time: "2026-01-12T12:07:45.444Z",
                status: "seen",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 7,
                type: "voice",
                username: "",
                phone: "+212 777-888999",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 8,
        username: "Work Group",
        phone: "Group Chat",
        avatar: "",
        unread: 5,
        isOnline: true,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [
            {
                id: 1,
                sender: "Sarah",
                type: "text",
                content: "Team meeting notes are uploaded",
                reactions: [],
                time: "2026-01-12T15:00:00.123Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "John",
                type: "text",
                content: "Thanks Sarah. Everyone please review",
                reactions: ["👍"],
                time: "2026-01-12T15:05:15.456Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Will do by EOD",
                reactions: [],
                time: "2026-01-12T15:10:30.789Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "Mike",
                type: "file",
                content: "Q3_Report.xlsx",
                fileSize: "5.2 MB",
                reactions: [],
                time: "2026-01-11T16:00:45.321Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 5,
                sender: "Lisa",
                type: "text",
                content: "Deadline for the project is Friday",
                reactions: ["⚠️"],
                time: "2026-01-11T16:30:20.654Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 6,
                sender: "Tom",
                type: "text",
                content: "Can we have a quick sync tomorrow?",
                reactions: [],
                time: "2026-01-11T16:35:35.987Z",
                status: "sent",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 8,
                type: "voice",
                username: "Work Group",
                phone: "Group Chat",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    },
    {
        id: 9,
        username: "Work Group",
        phone: "Group Chat",
        avatar: "",
        unread: 5,
        isOnline: true,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [
            {
                id: 1,
                sender: "Sarah",
                type: "text",
                content: "Team meeting notes are uploaded",
                reactions: [],
                time: "2026-01-12T15:00:00.123Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "John",
                type: "text",
                content: "Thanks Sarah. Everyone please review",
                reactions: ["👍"],
                time: "2026-01-12T15:05:15.456Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Will do by EOD",
                reactions: [],
                time: "2026-01-12T15:10:30.789Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "Mike",
                type: "file",
                content: "Q3_Report.xlsx",
                fileSize: "5.2 MB",
                reactions: [],
                time: "2026-01-11T16:00:45.321Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 5,
                sender: "Lisa",
                type: "text",
                content: "Deadline for the project is Friday",
                reactions: ["⚠️"],
                time: "2026-01-11T16:30:20.654Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 6,
                sender: "Tom",
                type: "text",
                content: "Can we have a quick sync tomorrow?",
                reactions: [],
                time: "2026-01-11T16:35:35.987Z",
                status: "sent",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 8,
                type: "voice",
                username: "Work Group",
                phone: "Group Chat",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    },
    {
        id: 10,
        username: "Work Group",
        phone: "Group Chat",
        avatar: "",
        unread: 5,
        isOnline: true,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [
            {
                id: 1,
                sender: "Sarah",
                type: "text",
                content: "Team meeting notes are uploaded",
                reactions: [],
                time: "2026-01-12T15:00:00.123Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "John",
                type: "text",
                content: "Thanks Sarah. Everyone please review",
                reactions: ["👍"],
                time: "2026-01-12T15:05:15.456Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Will do by EOD",
                reactions: [],
                time: "2026-01-12T15:10:30.789Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "Mike",
                type: "file",
                content: "Q3_Report.xlsx",
                fileSize: "5.2 MB",
                reactions: [],
                time: "2026-01-11T16:00:45.321Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 5,
                sender: "Lisa",
                type: "text",
                content: "Deadline for the project is Friday",
                reactions: ["⚠️"],
                time: "2026-01-11T16:30:20.654Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 6,
                sender: "Tom",
                type: "text",
                content: "Can we have a quick sync tomorrow?",
                reactions: [],
                time: "2026-01-11T16:35:35.987Z",
                status: "sent",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 8,
                type: "voice",
                username: "Work Group",
                phone: "Group Chat",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    },
    {
        id: 11,
        username: "Work Group",
        phone: "Group Chat",
        avatar: "",
        unread: 5,
        isOnline: true,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [
            {
                id: 1,
                sender: "Sarah",
                type: "text",
                content: "Team meeting notes are uploaded",
                reactions: [],
                time: "2026-01-12T15:00:00.123Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "John",
                type: "text",
                content: "Thanks Sarah. Everyone please review",
                reactions: ["👍"],
                time: "2026-01-12T15:05:15.456Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Will do by EOD",
                reactions: [],
                time: "2026-01-12T15:10:30.789Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "Mike",
                type: "file",
                content: "Q3_Report.xlsx",
                fileSize: "5.2 MB",
                reactions: [],
                time: "2026-01-11T16:00:45.321Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 5,
                sender: "Lisa",
                type: "text",
                content: "Deadline for the project is Friday",
                reactions: ["⚠️"],
                time: "2026-01-11T16:30:20.654Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 6,
                sender: "Tom",
                type: "text",
                content: "Can we have a quick sync tomorrow?",
                reactions: [],
                time: "2026-01-11T16:35:35.987Z",
                status: "sent",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 8,
                type: "voice",
                username: "Work Group",
                phone: "Group Chat",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    },
    {
        id: 12,
        username: "Work Group",
        phone: "Group Chat",
        avatar: "",
        unread: 5,
        isOnline: true,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [
            {
                id: 1,
                sender: "Sarah",
                type: "text",
                content: "Team meeting notes are uploaded",
                reactions: [],
                time: "2026-01-12T15:00:00.123Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "John",
                type: "text",
                content: "Thanks Sarah. Everyone please review",
                reactions: ["👍"],
                time: "2026-01-12T15:05:15.456Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 3,
                sender: "me",
                type: "text",
                content: "Will do by EOD",
                reactions: [],
                time: "2026-01-12T15:10:30.789Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 4,
                sender: "Mike",
                type: "file",
                content: "Q3_Report.xlsx",
                fileSize: "5.2 MB",
                reactions: [],
                time: "2026-01-11T16:00:45.321Z",
                status: "seen",
                isFavourite: true
            },
            {
                id: 5,
                sender: "Lisa",
                type: "text",
                content: "Deadline for the project is Friday",
                reactions: ["⚠️"],
                time: "2026-01-11T16:30:20.654Z",
                status: "delivered",
                isFavourite: false
            },
            {
                id: 6,
                sender: "Tom",
                type: "text",
                content: "Can we have a quick sync tomorrow?",
                reactions: [],
                time: "2026-01-11T16:35:35.987Z",
                status: "sent",
                isFavourite: false
            },
        ],
        calls: [
            {
                id: 8,
                type: "voice",
                username: "Work Group",
                phone: "Group Chat",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    },
    {
        id: 13,
        username: "Ahmed",
        phone: "+212 633-112233",
        avatar: "",
        unread: 0,
        isOnline: true,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [],
        calls: [
            {
                id: 9,
                type: "voice",
                username: "Ahmed",
                phone: "+212 633-112233",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [
            {
                id: "u3_s1",
                type: "image",
                content: "/stories/photo.jpg",
                caption: "Gym day 💪",
                duration: 5000,
                createdAt: "2026-01-20T10:00:00.000Z",
                expiresAt: "2026-01-21T10:00:00.000Z",
                viewers: [],
                isSeen: false
            },
            {
                id: "u3_s2",
                type: "video",
                content: "/stories/video.mp4",
                caption: "Last set 🔥",
                createdAt: "2026-01-20T10:07:00.000Z",
                expiresAt: "2026-01-21T10:07:00.000Z",
                viewers: [],
                isSeen: false
            }
        ],
        media: []
    },
    {
        id: 14,
        username: "Fatima",
        phone: "+212 644-445566",
        avatar: "",
        unread: 0,
        isOnline: false,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [],
        calls: [
            {
                id: 10,
                type: "voice",
                username: "Fatima",
                phone: "+212 644-445566",
                status: "rejected",
                datetime: new Date().toISOString(),
                duration: "00:00:00",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 15,
        username: "",
        phone: "+212 655-778899",
        avatar: "",
        unread: 0,
        isOnline: true,
        isGroup: false,
        isContact: false,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [
            {
                id: 1,
                sender: "Sarah",
                type: "text",
                content: "Team meeting notes are uploaded",
                reactions: [],
                time: "2026-01-12T15:00:00.123Z",
                status: "seen",
                isFavourite: false
            },
            {
                id: 2,
                sender: "John",
                type: "text",
                content: "Thanks Sarah. Everyone please review",
                reactions: ["👍"],
                time: "2026-01-12T15:05:15.456Z",
                status: "seen",
                isFavourite: true
            },
        ],
        calls: [
            {
                id: 11,
                type: "voice",
                username: "",
                phone: "+212 655-778899",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "him",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 16,
        username: "Business Team",
        phone: "Group Chat",
        avatar: "",
        unread: 0,
        isOnline: false,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [],
        calls: [
            {
                id: 12,
                type: "voice",
                username: "Business Team",
                phone: "Group Chat",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    },
    {
        id: 17,
        username: "Omar",
        phone: "+212 677-998877",
        avatar: "",
        unread: 0,
        isOnline: false,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [],
        calls: [
            {
                id: 13,
                type: "voice",
                username: "Omar",
                phone: "+212 677-998877",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 18,
        username: "",
        phone: "+212 688-665544",
        avatar: "",
        unread: 0,
        isOnline: true,
        isGroup: false,
        isContact: false,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [],
        calls: [
            {
                id: 14,
                type: "voice",
                username: "",
                phone: "+212 688-665544",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 19,
        username: "Family Group",
        phone: "Group Chat",
        avatar: "",
        unread: 0,
        isOnline: true,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [],
        calls: [
            {
                id: 15,
                type: "voice",
                username: "Family Group",
                phone: "Group Chat",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    },
    {
        id: 20,
        username: "Leila",
        phone: "+212 699-332211",
        avatar: "",
        unread: 0,
        isOnline: true,
        isGroup: false,
        isContact: true,
        isArchived: false,
        isFavourite: true,
        isBlocked: false,
        isPinned: false,
        messages: [],
        calls: [
            {
                id: 16,
                type: "voice",
                username: "Leila",
                phone: "+212 699-332211",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 21,
        username: "",
        phone: "+212 611-223344",
        avatar: "",
        unread: 0,
        isOnline: false,
        isGroup: false,
        isContact: false,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        messages: [],
        calls: [
            {
                id: 17,
                type: "voice",
                username: "",
                phone: "+212 611-223344",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        stories: [],
        media: []
    },
    {
        id: 22,
        username: "Study Group",
        phone: "Group Chat",
        avatar: "",
        unread: 0,
        isOnline: false,
        isGroup: true,
        isContact: false,
        isArchived: false,
        isFavourite: false,
        isBlocked: false,
        isPinned: false,
        members: [
            Users[0],
            Users[1],
            Users[2],
        ],
        messages: [],
        calls: [
            {
                id: 18,
                type: "voice",
                username: "Study Group",
                phone: "Group Chat",
                status: "ended",
                datetime: new Date().toISOString(),
                duration: "01:11:22",
                caller: "me",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            }
        ],
        media: []
    }
];

export const ChannelsData = [
    {
        id: 1,
        name: "TalkFlow Updates",
        description: "Official news and updates from TalkFlow",
        avatar: "/channels/talkflow.png",
        isVerified: true,
        admins: ["ai"],
        allowComments: false,
        followersCount: 15420,
        createdAt: "2026-01-10T09:00:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p1",
                authorId: "ai",
                type: "text",
                content: "🚀 Welcome to the official TalkFlow channel!",
                media: null,
                reactions: { "👍": 340, "❤️": 210 },
                views: 12000,
                createdAt: "2026-01-10T09:10:00.000Z",
                isPinned: true
            },
            {
                id: "p2",
                authorId: "ai",
                type: "image",
                content: "New update coming soon 👀",
                media: "/channels/update.jpg",
                reactions: { "🔥": 520 },
                views: 9800,
                createdAt: "2026-01-20T18:30:00.000Z",
                isPinned: false
            }
        ]
    },
    {
        id: 2,
        name: "Tech News Morocco",
        description: "Latest tech & startup news in Morocco 🇲🇦",
        avatar: "/channels/tech.png",
        isVerified: false,
        admins: [1],
        allowComments: false,
        followersCount: 4300,
        createdAt: "2026-01-15T12:00:00.000Z",
        isPublic: true,
        posts: []
    },
    {
        id: 3,
        name: "AI Daily",
        description: "Daily AI news, tools and breakthroughs",
        avatar: "/channels/ai.png",
        isVerified: true,
        admins: ["ai"],
        allowComments: false,
        followersCount: 28700,
        createdAt: "2026-01-05T08:00:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p3",
                authorId: "ai",
                type: "text",
                content: "New GPT-5 capabilities announced today!",
                media: null,
                reactions: { "🤯": 890, "🚀": 450 },
                views: 21500,
                createdAt: "2026-01-22T11:30:00.000Z",
                isPinned: true
            }
        ]
    },
    {
        id: 4,
        name: "Moroccan Developers",
        description: "Programming tips and job opportunities in Morocco",
        avatar: "/channels/dev.png",
        isVerified: false,
        admins: [2, 3],
        allowComments: false,
        followersCount: 9200,
        createdAt: "2026-01-12T14:00:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p4",
                authorId: 2,
                type: "text",
                content: "React vs Vue - Which one to learn in 2026?",
                media: null,
                reactions: { "⚛️": 320, "🟢": 280 },
                views: 8400,
                createdAt: "2026-01-18T16:45:00.000Z",
                isPinned: true
            }
        ]
    },
    {
        id: 5,
        name: "Crypto Watch",
        description: "Cryptocurrency updates and market analysis",
        avatar: "/channels/crypto.png",
        isVerified: true,
        admins: ["ai"],
        allowComments: false,
        followersCount: 35600,
        createdAt: "2026-01-03T10:00:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p5",
                authorId: "ai",
                type: "image",
                content: "Bitcoin breaks new resistance level! 📈",
                media: "/channels/bitcoin-chart.jpg",
                reactions: { "📈": 1200, "💰": 850 },
                views: 29800,
                createdAt: "2026-01-21T09:15:00.000Z",
                isPinned: true
            }
        ]
    },
    {
        id: 6,
        name: "Casablanca Events",
        description: "Upcoming events and meetups in Casablanca",
        avatar: "/channels/casablanca.png",
        isVerified: false,
        admins: [4],
        allowComments: false,
        followersCount: 5400,
        createdAt: "2026-01-14T17:00:00.000Z",
        isPublic: true,
        posts: []
    },
    {
        id: 7,
        name: "Startup Morocco",
        description: "Moroccan startup ecosystem news and funding rounds",
        avatar: "/channels/startup.png",
        isVerified: true,
        admins: [5, "ai"],
        allowComments: false,
        followersCount: 18200,
        createdAt: "2026-01-08T11:00:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p6",
                authorId: "ai",
                type: "text",
                content: "3 Moroccan startups raised over $10M this week!",
                media: null,
                reactions: { "🎉": 650, "💪": 420 },
                views: 15600,
                createdAt: "2026-01-19T14:20:00.000Z",
                isPinned: false
            }
        ]
    },
    {
        id: 8,
        name: "Health & Wellness",
        description: "Daily health tips and wellness advice",
        avatar: "/channels/health.png",
        isVerified: false,
        admins: [6],
        allowComments: false,
        followersCount: 12300,
        createdAt: "2026-01-09T07:30:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p7",
                authorId: 6,
                type: "text",
                content: "Morning routine for better productivity 💪",
                media: null,
                reactions: { "💪": 540, "✨": 320 },
                views: 9800,
                createdAt: "2026-01-17T08:00:00.000Z",
                isPinned: true
            }
        ]
    },
    {
        id: 9,
        name: "Football Updates",
        description: "Live scores and transfer news ⚽",
        avatar: "/channels/football.png",
        isVerified: true,
        admins: ["ai"],
        allowComments: false,
        followersCount: 42100,
        createdAt: "2026-01-02T12:00:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p8",
                authorId: "ai",
                type: "image",
                content: "Morocco qualifies for World Cup 2026! 🇲🇦",
                media: "/channels/morocco-win.jpg",
                reactions: { "🇲🇦": 2100, "⚽": 1800 },
                views: 38700,
                createdAt: "2026-01-23T22:00:00.000Z",
                isPinned: true
            }
        ]
    },
    {
        id: 10,
        name: "Design Inspiration",
        description: "Daily UI/UX design inspiration and resources",
        avatar: "/channels/design.png",
        isVerified: false,
        admins: [7, 8],
        allowComments: false,
        followersCount: 9600,
        createdAt: "2026-01-11T10:00:00.000Z",
        isPublic: true,
        posts: [
            {
                id: "p9",
                authorId: 7,
                type: "image",
                content: "2026 Design trends you need to know",
                media: "/channels/design-trends.jpg",
                reactions: { "🎨": 430, "👏": 290 },
                views: 8700,
                createdAt: "2026-01-16T13:45:00.000Z",
                isPinned: false
            }
        ]
    }
];

export const ChannelFollowers = [
    {
        channelId: 1,
        userId: 1,
        followedAt: "2026-01-12T10:00:00.000Z"
    },
    {
        channelId: 1,
        userId: 2,
        followedAt: "2026-01-13T14:20:00.000Z"
    },
    {
        channelId: 2,
        userId: 3,
        followedAt: "2026-01-18T08:45:00.000Z"
    },
    {
        channelId: 1,
        userId: 4,
        followedAt: "2026-01-14T11:30:00.000Z"
    },
    {
        channelId: 3,
        userId: 5,
        followedAt: "2026-01-06T09:15:00.000Z"
    },
    {
        channelId: 5,
        userId: 6,
        followedAt: "2026-01-04T16:20:00.000Z"
    },
    {
        channelId: 7,
        userId: 7,
        followedAt: "2026-01-09T13:45:00.000Z"
    },
    {
        channelId: 9,
        userId: 8,
        followedAt: "2026-01-03T19:30:00.000Z"
    },
    {
        channelId: 4,
        userId: 9,
        followedAt: "2026-01-13T10:10:00.000Z"
    },
    {
        channelId: 8,
        userId: 10,
        followedAt: "2026-01-10T08:00:00.000Z"
    },
    {
        channelId: 3,
        userId: 1,
        followedAt: "2026-01-07T14:25:00.000Z"
    },
    {
        channelId: 5,
        userId: 2,
        followedAt: "2026-01-05T11:40:00.000Z"
    },
    {
        channelId: 7,
        userId: 3,
        followedAt: "2026-01-10T17:15:00.000Z"
    },
    {
        channelId: 9,
        userId: 4,
        followedAt: "2026-01-04T21:00:00.000Z"
    },
    {
        channelId: 10,
        userId: 5,
        followedAt: "2026-01-12T15:30:00.000Z"
    }
];