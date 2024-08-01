import React from "react";
import NashChartPanel from "comps/app/NashChart/NashChart";
import CalcSettings from "comps/app/CalcSettings/CalcSettings";
import Cards from "comps/app/Cards/Cards";
import CombOdds from "comps/app/CombOdds/CombOdds";
import Simulation from "comps/app/Simulation/Simulation";
import CardSelector from "comps/app/CardSelector/CardSelector";
import theme from 'comps/themes/light/theme.module.scss';

function Content(): React.ReactElement {
    return (
        <div className={theme.light}>
            Content
            <div className={theme.flex}>
                <div>
                    <NashChartPanel/>
                    <CalcSettings/>
                    <Cards/>
                    <CombOdds/>
                    <Simulation/>
                </div>
                <div>
                    <CardSelector/>
                </div>
            </div>
        </div>
    );
}

export default Content;