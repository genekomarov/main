import React from "react";
import Panel from "@/Application/_page/Page/Content/Panel";
import styles from '@/Application/_page/Page/Content.module.scss';

export default function Content(): React.JSX.Element {
    return (
        <main className={styles.content}>
            <Panel/>
            <Panel/>
            <Panel/>
        </main>
    );
}
