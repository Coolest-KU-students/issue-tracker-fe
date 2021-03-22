import { Themes } from './Themes';

const Theme = (state = { Theme: getThemeStyle(getStoredTheme()) }, action) => {
    if (action.type) return getThemeStyle(action.type === '@@INIT' ? getStoredTheme() : action.type);
    else return state;
};

export default Theme;

const getStoredTheme = () => {
    return localStorage.getItem('Theme');
};

const getThemeStyle = (theme) => {
    switch (theme) {
        case 'Dark':
            return Themes.Dark;
        case 'Light':
            return Themes.Light;
        default:
            return Themes.Light;
    }
};
