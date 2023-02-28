import { Link } from "react-router-dom"
import style from './Card.module.css'

const Card = (props) => {
    return (
        <div className={style.card}>
            <div>
                <img src={props.flag} alt=''></img>
            </div>
            <div>
                <h3>{props.name}</h3>
            </div>
            <Link to={`/home/${props.id}`} >
                <button>Details</button>
            </Link>

        </div>
    )
}

export default Card