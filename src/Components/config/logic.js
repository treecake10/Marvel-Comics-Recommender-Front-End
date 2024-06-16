const isPresentInLikes = (likes, item) => {
    return likes.some(likedItem => likedItem.id === item.id);
}

const isPresentInFavorites = (favorites, item) => {
    return favorites.some(favoritedItem => favoritedItem.id === item.id);
}

export {
    isPresentInLikes as isPresentInComicLikes,
    isPresentInLikes as isPresentInCharacterLikes,
    isPresentInLikes as isPresentInSeriesLikes,
    isPresentInLikes as isPresentInEventLikes,
    isPresentInLikes as isPresentInCreatorLikes,
    isPresentInFavorites as isPresentInComicFavorites,
    isPresentInFavorites as isPresentInCharacterFavorites,
    isPresentInFavorites as isPresentInSeriesFavorites,
    isPresentInFavorites as isPresentInEventFavorites,
    isPresentInFavorites as isPresentInCreatorFavorites
};