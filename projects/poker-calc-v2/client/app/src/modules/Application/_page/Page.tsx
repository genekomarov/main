import React from "react";
import theme from '@/Common/themes/dark/theme.module.scss';
import styles from '@/Application/_page/Page.module.scss';
import classNames from 'classnames';
import Content from "@/Application/_page/Page/Content";

export default function Page(): React.JSX.Element {
    return (
        <div className={classNames(theme.dark, styles.panel)}>
            <Content/>
        </div>
    );
}
