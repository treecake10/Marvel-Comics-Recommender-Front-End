const isPresentInLikes = (likes, item) => {
    return likes.some(likedItem => likedItem.id === item.id);
}

const isPresentInFavorites = (favorites, item) => {
    return favorites.some(favoritedItem => favoritedItem.id === item.id);
}

const isPresentInBookmarks = (bookmarks, item) => {
    return bookmarks.some(bookmarkedItem => bookmarkedItem.id === item.id);
}

export {
    isPresentInBookmarks as isPresentInSeriesBookmarks,
    isPresentInLikes as isPresentInComicLikes,
    isPresentInLikes as isPresentInCharacterLikes,
    isPresentInLikes as isPresentInEventLikes,
    isPresentInLikes as isPresentInCreatorLikes,
    isPresentInFavorites as isPresentInComicFavorites,
    isPresentInFavorites as isPresentInCharacterFavorites,
    isPresentInFavorites as isPresentInEventFavorites,
    isPresentInFavorites as isPresentInCreatorFavorites
};