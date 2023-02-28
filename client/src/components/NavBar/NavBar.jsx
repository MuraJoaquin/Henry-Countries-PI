import { Link } from "react-router-dom"
import style from './NavBar.module.css'

const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <p><Link to={"/home"}>Home</Link> </p>
            <p><Link to={"/create"}>Create activity</Link></p>
        </div>
    )
}
export default NavBar