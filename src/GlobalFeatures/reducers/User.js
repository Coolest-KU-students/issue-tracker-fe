const InitialState = {
    Login: '',
};

const User = (state = InitialState, action) => {
    switch (action.type) {
        case 'Logging In':
            return action.Login;
        case 'Logging Out':
            return InitialState;
        default:
            return state;
    }
};

export default User;
