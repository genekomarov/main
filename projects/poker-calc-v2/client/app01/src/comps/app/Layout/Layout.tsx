import React from "react";
import NashChartPanel from "comps/app/NashChart/NashChart";
import CalcSettings from "comps/app/CalcSettings/CalcSettings";
import Cards from "comps/app/Cards/Cards";
import CombOdds from "comps/app/CombOdds/CombOdds";
import Simulation from "comps/app/Simulation/Simulation";
import CardSelector from "comps/app/CardSelector/CardSelector";
import { ThemeContext } from "comps/app/Theme/Theme";

function Layout(): React.ReactElement {
    const theme = React.useContext(ThemeContext);
    return (
        <div>
            Layout
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

export default Layout;