let currentUser: UserType;

const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}

const getCurrentUserState = () => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState
};