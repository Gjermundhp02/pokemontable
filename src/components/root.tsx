import { Outlet, useLocation } from "react-router-dom";
import "../styles/root.css";
import FilterButton from "./filter";

export function Root() {
    const location = useLocation();
    return (
        <div id="RootContainer">
            <div id="RootHeader">
                <h1>{location.pathname === "/" ? "Pokémon Table" : "Pokémon Details"}</h1>
                {location.pathname === "/" && <FilterButton/>}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}