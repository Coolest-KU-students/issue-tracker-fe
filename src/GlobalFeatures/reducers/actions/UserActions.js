export const LoggingIn = (Login) => {
    return {
        type: 'Logging In',
        Login: Login,
    };
};

export const LoggingOut = () => {
    return {
        type: 'Logging Out',
    };
};
