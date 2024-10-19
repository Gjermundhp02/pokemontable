import { Link } from "react-router-dom"
import"../styles/nav.css"
import { useAppSelector } from "../redux/store"
import { useDispatch } from "react-redux"
import { setActiveRow } from "../redux/table"

export default function Nav({ id }: { id: number | undefined }) {
    const { activeRow } = useAppSelector((state) => state.TableState)
    const dispatch = useDispatch()
    if (!id) return <></>

    return <nav className="nav">
        <Link to={"/"}>
            <span className="material-symbols-outlined">
                close
            </span>
        </Link>
        <div className="right">
            {id>1 && <Link 
                            to={`/${id-1}`}
                            onClick={()=>dispatch(setActiveRow(activeRow-1))} >
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </Link>}
            <Link 
                to={`/${id+1}`} 
                onClick={()=>dispatch(setActiveRow(activeRow+1))} >
                <span className="material-symbols-outlined">
                    arrow_forward
                </span>
            </Link>
        </div>
    </nav>
}