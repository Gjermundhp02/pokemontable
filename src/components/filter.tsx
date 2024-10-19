import { useState } from "react";
import "../styles/filter.css"
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { toggle } from "../redux/table";

export default function FilterButton() {
    const [showFilter, setShowFilter] = useState(false);

    return <div className="filterButton">
        <button type="button" value="Filter" onClick={()=>setShowFilter(!showFilter)}>
            <p>Filter</p>
            <span className="material-symbols-outlined">
                tune
            </span>
        </button>
        {showFilter&&<Filter/>}
    </div>
}

export function Filter() {
    const table = useAppSelector((state) => state.TableState)
    const dispatch = useDispatch()

    return <div className="filter">
        <div>
            <label htmlFor="image">Image</label>
            <input type="checkbox" id="image" name="image" 
                onChange={()=>dispatch(toggle("image"))}
                checked={table.image} />
        </div>
        <div>
            <label htmlFor="weight">Weight</label>
            <input type="checkbox" id="weight" name="weight" 
                onChange={()=>dispatch(toggle("weight"))}
                checked={table.weight} />
        </div>
        <div>
            <label htmlFor="height">Height</label>
            <input type="checkbox" id="height" name="height" 
                onChange={()=>dispatch(toggle("height"))}
                checked={table.height} />
        </div>
        <div>
            <label htmlFor="types">Types</label>
            <input type="checkbox" id="types" name="types" 
                onChange={()=>dispatch(toggle("types"))}
                checked={table.types} />
        </div>
    </div>
}