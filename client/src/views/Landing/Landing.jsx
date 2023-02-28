import { Link } from "react-router-dom"
import style from "./Landing.module.css"
const Landing = () => {
    return(
        <div className={style.landingpage}>
            <h1 className={style.titulo}>Lets go in! Discover the World!</h1>
            <Link to={"/home"}>
                <button className={style.button}>Start now</button>
            </Link>
        </div>
    )
}

export default Landing