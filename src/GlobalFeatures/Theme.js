import { useSelector } from 'react-redux';

const ThemeState = () => {
    return useSelector((state) => state.Theme);
};

export const Theme = ThemeState();
