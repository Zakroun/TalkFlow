import { createSelector } from "@reduxjs/toolkit";

const selectChatData = state => state.chat.ChatData;
const selectChannels = state => state.chat.Channels;
const selectFollowers = state => state.chat.ChannelFollowersData;

export const selectActiveStories = createSelector(
    [selectChatData],
    chatData =>
        chatData.filter(c =>
            c.isContact &&
            c.stories?.some(
                s => new Date(s.expiresAt) > new Date()
            )
        )
);

export const selectUserActiveStories = createSelector(
    [state => state.chat.user],
    user =>
        user.stories?.filter(
            s => new Date(s.expiresAt) > new Date()
        ) || []
);

export const selectUnseenStories = createSelector(
    [selectChatData],
    chatData =>
        chatData.filter(c =>
            c.isContact &&
            c.stories?.some(s => s.isSeen === false)
        )
);

export const selectFlatStories = createSelector(
    [selectChatData],
    chatData =>
        chatData
            .filter(c => c.isContact && c.stories?.length)
            .flatMap(c => c.stories)
);

export const selectConatcts = createSelector(
    [selectChatData],
    chatData => chatData.filter(c => c.isContact)
);

export const selectFavourites = createSelector(
    [selectChatData],
    chatData => chatData.filter(c => c.isFavourite)
);
export const selectArchivedChats = createSelector(
    [selectChatData],
    chatData => chatData.filter(c => c.isArchived)
);

export const selectBlockedContacts = createSelector(
    [selectChatData],
    chatData => chatData.filter(c => c.isBlocked)
);
export const selectGroups = createSelector(
    [selectChatData],
    chatData => chatData.filter(c => c.isGroup)
);
export const selectChannelsData = createSelector(
    [selectChannels],
    channels => channels
);
export const selectChannelFollowers = createSelector(
    [selectFollowers],
    followers => followers
);
export const selectMediaChats = createSelector(
    [selectChatData],
    chatData =>
        chatData.filter(c => Array.isArray(c.media) && c.media.length > 0)
);

export const unreadMessagesCountSelector = createSelector(
    [selectChatData],
    chatData =>
        chatData.reduce((total, chat) => total + (chat.unread || 0), 0)
);