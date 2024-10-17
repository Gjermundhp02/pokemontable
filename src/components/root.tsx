import { Outlet } from "react-router-dom";
import "../styles/root.css";

export function Root() {
    return (
        <div>
            <h1>Pokemon Table</h1>
            <div>
                <Outlet />
            </div>
        </div>
    )
}