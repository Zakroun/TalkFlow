import { createSlice } from "@reduxjs/toolkit";
import { ChatListData, user, Users, ChannelsData, ChannelFollowers } from "./data";

export const ChatSlice = createSlice({
    name: "chat",
    initialState: {
        user: user,
        isAuthenticated: false,
        ChatData: ChatListData,
        UsersData: Users,
        activeitem: "chats",
        activeChat: null,
        Channels: ChannelsData,
        ChannelFollowersData: ChannelFollowers,
        callobject: {
            id: null,
            type: "",
            username: "",
            phone: "",
            status: "",
            datetime: "",
            duration: "",
            caller: "",
            isRecorded: false,
            isGroupCall: false,
            notes: ""
        },
        successMessage: "",
        errorMessage: "",
        warnningMessage: "",
        infoMessage: "",
    },
    reducers: {
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
            state.errorMessage = "";
            state.warnningMessage = "";
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
            state.successMessage = "";
            state.warnningMessage = "";
        },
        setWarnningMessage: (state, action) => {
            state.warnningMessage = action.payload;
            state.successMessage = "";
            state.errorMessage = "";
        },
        clearMessages: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
            state.warnningMessage = "";
        },
        updateactiveitem: (state, action) => {
            state.activeitem = action.payload;
            state.successMessage = "";
            state.errorMessage = "";
        },
        updateactiveChat: (state, action) => {
            state.activeChat = action.payload;
            const id = action.payload;
            const chat = state.ChatData.find(c => c.id === id);
            if (chat) {
                chat.unread = 0;
                // state.successMessage = "Chat opened successfully";
                // state.errorMessage = "";
            } else {
                // state.successMessage = "";
                // state.errorMessage = "Chat not found";
            }
        },
        updateChatData: (state, action) => {
            const { id, actiontype } = action.payload;
            const chat = state.ChatData.find(c => c.id === id);
            if (!chat) {
                state.errorMessage = "Chat not found";
                return;
            }
            switch (actiontype) {
                case "favorite":
                    chat.isFavourite = true;
                    state.successMessage = "Added to favorites";
                    break;
                case "removefavorite":
                    chat.isFavourite = false;
                    state.successMessage = "Removed from favorites";
                    break;
                case "pin":
                    chat.isPinned = true;
                    state.successMessage = "Chat pinned";
                    break;
                case "unpin":
                    chat.isPinned = false;
                    state.successMessage = "Chat unpinned";
                    break;
                case "clear":
                    chat.messages = [];
                    state.successMessage = "Conversation cleared";
                    break;
                case "deleteChat":
                    state.ChatData = state.ChatData.filter(c => c.id !== id);
                    state.activeChat = null;
                    state.successMessage = "Chat deleted";
                    break;
                default:
                    break;
            }
        },
        updateallchats: (state, action) => {
            if (action.payload === "readall") {
                state.ChatData = state.ChatData.map(c => ({
                    ...c,
                    unread: 0
                }));
                state.successMessage = "All chats marked as read";
            }
            else if (action.payload === "archiveall") {
                state.ChatData = state.ChatData.map(c => ({
                    ...c,
                    isArchived: true
                }));
                state.successMessage = "All chats archived";
            }
        },
        createnewchat: (state, action) => {
            state.ChatData.push(action.payload);
            state.successMessage = "New chat created";
        },
        sendMessage: (state, action) => {
            const { id, newmessage } = action.payload;
            const chat = state.ChatData.find(c => c.id === id);
            if (chat) {
                chat.messages.push(newmessage);
                if (state.activeChat !== id) {
                    chat.unread += 1;
                }
            }
        },
        removeMessage: (state, action) => {
            const { id, messageId } = action.payload;
            const chat = state.ChatData.find(c => c.id === id);
            if (chat) {
                chat.messages = chat.messages.filter(m => m.id !== messageId);
                state.successMessage = "Message deleted";
            }
        },
        updateMessage: (state, action) => {
            const { id, messageId, updatedMessage } = action.payload;
            const chat = state.ChatData.find(c => c.id === id);
            if (chat) {
                const messageIndex = chat.messages.findIndex(m => m.id === messageId);
                if (messageIndex !== -1) {
                    chat.messages[messageIndex] = { ...chat.messages[messageIndex], ...updatedMessage };
                    state.successMessage = "Message updated";
                }
            }
        },
        startcall: (state, action) => {
            state.activeitem = "call";
            state.callobject = action.payload;
            state.successMessage = "Call started";
        },
        endcall: (state) => {
            // state.activeitem = "calls";
            state.callobject = {
                id: null,
                type: "",
                username: "",
                phone: "",
                status: "",
                datetime: "",
                duration: "",
                caller: "",
                isRecorded: false,
                isGroupCall: false,
                notes: ""
            };
            state.successMessage = "Call ended";
        },
        createcall: (state, action) => {
            const { callData, id } = action.payload;
            const chat = state.ChatData.find(chat => chat.id === id);
            if (chat) {
                if (!chat.calls) chat.calls = [];
                chat.calls.push(callData);
                state.successMessage = "Call added to history";
            }
        },
        updatecall: (state, action) => {
            const { chatId, callId, data } = action.payload;
            const chat = state.ChatData.find(chat => chat.id === chatId);
            if (chat && chat.calls) {
                const index = chat.calls.findIndex(call => call.id === callId);
                if (index !== -1) {
                    chat.calls[index] = {
                        ...chat.calls[index],
                        ...data
                    };
                    state.successMessage = "Call updated";
                }
            }
        },
        clearcalls: (state, action) => {
            const { id } = action.payload;
            const chat = state.ChatData.find(chat => chat.id === id);
            if (chat) {
                chat.calls = [];
                state.successMessage = "Call history cleared";
            }
        },
        addStory: (state, action) => {
            const { story } = action.payload;
            state.user.stories.unshift({
                ...story,
                viewed: false
            });
            state.successMessage = "Story added";
        },
        removeStory: (state, action) => {
            const { storyId } = action.payload;
            state.user.stories = state.user.stories.filter(s => s.id !== storyId);
            state.successMessage = "Story removed";
        },
        markStoryAsRead: (state, action) => {
            const { storyId } = action.payload;
            const story = state.user.stories.find(s => s.id === storyId);
            if (story) story.viewed = true;
        },
        addtocontacts: (state, action) => {
            const { id, username } = action.payload;
            const contact = state.ChatData.find(c => c.id === id);
            if (contact) {
                contact.isContact = true;
                contact.username = username;
                state.successMessage = "Contact added successfully";
            } else {
                state.errorMessage = "Contact not found";
            }
        },
        createnewcontact: (state, action) => {
            const { id, username, phone } = action.payload;
            const contact = state.ChatData.find(c => c.id === id);
            if (contact) {
                contact.username = username;
                contact.phone = phone;
                contact.isContact = true;
                state.successMessage = "Contact created successfully";
            } else {
                state.errorMessage = "Contact not found";
            }
        },
        updatecontact: (state, action) => {
            const { id, username, phone } = action.payload;
            const contact = state.ChatData.find(c => c.id === id);
            if (contact) {
                contact.username = username;
                contact.phone = phone;
                state.successMessage = "Contact updated successfully";
            } else {
                state.errorMessage = "Contact not found";
            }
        },
        removecontact: (state, action) => {
            const { id } = action.payload;
            const chat = state.ChatData.find(c => c.id === id);
            if (chat) {
                chat.username = "";
                chat.isContact = false;
                state.successMessage = "Contact removed successfully";
            } else {
                state.errorMessage = "Contact not found";
            }
        },
        creategroupe: (state, action) => {
            const { group } = action.payload;
            state.ChatData.push(group);
            state.successMessage = "Group created successfully";
        },
        updategroupe: (state, action) => {
            const { id, groupname, members } = action.payload;
            const group = state.ChatData.find(c => c.id === id && c.isGroup);
            if (group) {
                group.username = groupname;
                group.members = members;
                state.successMessage = "Group updated successfully";
            } else {
                state.errorMessage = "Group not found";
            }
        },
        removegroupe: (state, action) => {
            const { id } = action.payload;
            state.ChatData = state.ChatData.filter(c => c.id !== id || !c.isGroup);
            state.successMessage = "Group removed successfully";
        },
        removeMedia: (state, action) => {
            const { chatId, mediaId } = action.payload;
            const chat = state.ChatData.find(c => c.id === chatId);
            if (chat && chat.media) {
                chat.media = chat.media.filter(m => m.id !== mediaId);
                state.successMessage = "Media removed successfully";
            } else {
                state.errorMessage = "Chat or media not found";
            }
        },
        archivechat: (state, action) => {
            const { id } = action.payload;
            const chat = state.ChatData.find(c => c.id === id);
            if (chat) {
                chat.isArchived = true;
                state.successMessage = "Chat archived successfully";
            } else {
                state.errorMessage = "Chat not found";
            }
        },
        unarchivechat: (state, action) => {
            const { chatId } = action.payload;
            const chat = state.ChatData.find(c => c.id === chatId);
            if (chat) {
                chat.isArchived = false;
                state.successMessage = "Chat unarchived successfully";
            } else {
                state.errorMessage = "Chat not found";
            }
        },
        unarchiveallchats: (state) => {
            state.ChatData = state.ChatData.map(c => ({
                ...c,
                isArchived: false
            }));
            state.successMessage = "All chats unarchived successfully";
        },
        unfavoriteallchat: (state) => {
            state.ChatData = state.ChatData.map(c => ({
                ...c,
                isFavourite: false
            }));
            state.successMessage = "All chats removed from favorites successfully";
        },
        deleteStory: (state, action) => {
            const { storyId } = action.payload;
            state.user.stories = state.user.stories.filter(s => s.id !== storyId);
            state.successMessage = "Story deleted";
        },
        incrementStoryViews: (state, action) => {
            const { storyId, viewerId } = action.payload;
            const story = state.user.stories.find(s => s.id === storyId);
            if (story && !story.viewers.includes(viewerId)) {
                story.viewers.push(viewerId);
            }
        },
        login: (state) => {
            state.isAuthenticated = true;
        }
    }
});

export const {
    setSuccessMessage,
    setErrorMessage,
    setWarnningMessage,
    clearMessages,
    updateactiveitem,
    updateactiveChat,
    updateChatData,
    updateallchats,
    createnewchat,
    sendMessage,
    updateMessage,
    removeMessage,
    startcall,
    endcall,
    createcall,
    updatecall,
    clearcalls,
    addStory,
    removeStory,
    markStoryAsRead,
    addtocontacts,
    createnewcontact,
    updatecontact,
    removecontact,
    creategroupe,
    updategroupe,
    removegroupe,
    removeMedia,
    unarchivechat,
    archivechat,
    unarchiveallchats,
    unfavoriteallchat,
    deleteStory,
    incrementStoryViews,
    login
} = ChatSlice.actions;