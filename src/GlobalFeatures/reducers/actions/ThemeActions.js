export const ChangeTheme = (theme) => {
    localStorage.setItem('Theme', theme);
    return {
        type: theme,
    };
};
