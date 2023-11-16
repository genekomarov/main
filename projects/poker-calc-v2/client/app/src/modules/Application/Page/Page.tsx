import React, {useEffect} from "react";
import theme from '@/Common/themes/dark/theme.module.scss';
import styles from '@/Application/Page/Page.module.scss';
import classNames from 'classnames';
import Bulk from '@/Application/Bulk/Bulk';
import Content from '@/Application/Content/Content';

export default function Page(): React.JSX.Element {
    const containerRef = React.createRef<HTMLDivElement>();
    const [containerWidth, setContainerWidth] = React.useState(10);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            setContainerWidth(entries[0].contentRect.width);
        });
        if (!containerRef.current) {
            return;
        }
        resizeObserver.observe(containerRef.current);
        return (): void => {
            if (!containerRef.current) {
                return;
            }
            resizeObserver.unobserve(containerRef.current);
        };
    }, [containerRef]);

    return (
        <div
            className={classNames(theme.dark, styles.panel)}
            ref={containerRef}
        >
            {/* {containerWidth} */}
            <Bulk containerWidth={containerWidth}>
                <Content/>
            </Bulk>
        </div>
    );
}
