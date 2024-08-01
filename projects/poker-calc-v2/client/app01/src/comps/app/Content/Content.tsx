import React from "react";
import Layout from 'comps/app/Layout/Layout';
import {default as lightTheme} from 'comps/themes/light/theme.module.scss';
import {default as ThemeProvider} from 'comps/app/Theme/Theme';

function Content(): React.ReactElement {
    return (
        <ThemeProvider theme={lightTheme}>
            <Layout/>
        </ThemeProvider>
    );
}

export default Content;