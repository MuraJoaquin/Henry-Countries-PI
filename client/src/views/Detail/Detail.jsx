import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCountryById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css"


const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const [isLoading, SetIsLoading] = useState(true)

    const country = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getCountryById(id))
        return () => { SetIsLoading(true) }
    }, [dispatch, id]
    )

    useEffect(() => {
        SetIsLoading(false)
    }, [country])
    return (
        <div>
            {
                isLoading ? <p>Loading...</p> :
                    <div>                    
                            <p>ID: {country.id}</p>                      
                            <p>NAME: {country.name}</p>                      
                            <img src={country.flag} alt=''></img>                                              
                            <p>CONTINENT: {country.continent}</p>                      
                            <p>CAPITAL: {country.capital}</p>                                               
                            {country.subregion && <p>SUBREGION: {country.subregion}</p>}                      
                            <p>AREA: {country.area} </p>                       
                            <p>POPULATION: {country.population} </p>                       
                            {country.activities && <p> Activities : {country.activities.map(a => a.name + ' ')}</p>}
                    </div>
            }

        </div>
    )
}

export default Detail