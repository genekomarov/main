import React from "react";
import {default as lightTheme} from 'comps/themes/light/theme.module.scss';

export const ThemeContext = React.createContext<ITheme>(lightTheme);

interface ITheme {
    [key: string]: string;
}

interface IProps {
    children: React.ReactNode;
    theme: ITheme;
}

function ThemeProvider(props: IProps): React.ReactElement {
    const  {children, theme} = props;
    return (
        <ThemeContext.Provider value={theme}>
            <div className={theme.themeClass}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;