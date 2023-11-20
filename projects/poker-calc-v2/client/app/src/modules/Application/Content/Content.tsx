import React from "react";
import styles from '@/Application/Content/Content.module.scss';
import Panel from '@/Application/Panel/Panel';

export default function Content(): React.JSX.Element {
    const [panels] = React.useState<{
        [name: string]: () => React.JSX.Element
    }>({
        Panel1: Panel,
        Panel2: Panel,
        Panel3: Panel,
    });

    return (
        <div className={styles.content}>
            <panels.Panel1/>
            <panels.Panel2/>
            <panels.Panel3/>
        </div>
    );
}
