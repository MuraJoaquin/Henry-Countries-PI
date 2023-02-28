import { useState } from "react"
import { useDispatch} from "react-redux"
import { filterCountriesByName,getCountries } from "../../redux/actions"
import style from './SearchBar.module.css'
const SearchBar = () => {
    
    const dispatch = useDispatch()

    const [name,setName] = useState("")
    const [error,setError] = useState("")

    const changeHandler = (e) => {
        setName(e.target.value)
    }
    const handleClick = () => {
        validate()
        if(!name) dispatch(getCountries())
        else{
            if(name.length > 2) dispatch(filterCountriesByName(name))
        }
        setName("")
    }
    const validate = () => {
        if(name.length === 1 || name.length === 2){
            setError("Search failed, 3 letters required")
        }else{
            setError("")
        }
    }
    
    return (
        <div>
            <br></br>
            <input className={style.input} type="text" placeholder="Search..." value={name} onChange={changeHandler}></input>
            <button className={style.button} onClick={handleClick}>Search</button>
            <span className={style.error}>{error && error}</span>
        </div>
    )
}

export default SearchBar