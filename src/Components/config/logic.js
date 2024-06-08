const isPresentInLikes = (likes, item) => {
    return likes.some(likedItem => likedItem.id === item.id);
}

export {
    isPresentInLikes as isPresentInComicLikes,
    isPresentInLikes as isPresentInCharacterLikes,
    isPresentInLikes as isPresentInSeriesLikes,
    isPresentInLikes as isPresentInEventLikes,
    isPresentInLikes as isPresentInCreatorLikes
};