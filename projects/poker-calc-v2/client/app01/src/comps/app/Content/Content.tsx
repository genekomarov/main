import React from "react";
import NashChartPanel from "comps/app/NashChartPanel/NashChartPanel";
import CalcSettings from "comps/app/CalcSettings/CalcSettings";
import Cards from "comps/app/Cards/Cards";
import CombOdds from "comps/app/CombOdds/CombOdds";
import Simulation from "comps/app/Simulation/Simulation";
import theme from 'comps/themes/light/theme.module.scss';

function Content(): React.ReactElement {
    return (
        <div className={theme.light}>
            Content
            <NashChartPanel/>
            <CalcSettings/>
            <Cards/>
            <CombOdds/>
            <Simulation/>
        </div>
    );
}

export default Content;