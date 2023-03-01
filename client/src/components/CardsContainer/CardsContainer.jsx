import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Card from "../Card/Card"
import Paginated from "../Paginated/Paginated"
import style from "./CardsContainer.module.css"
import { getCountries } from "../../redux/actions"


const CardsContainer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountries())
    },[dispatch])

    const countries = useSelector(state => state.countries)

    const [isLoading, SetisLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const lastCountry = currentPage * countriesPerPage // indice 10 // cuando currentPage sea 2, indice va a ser 20
    const firstCountry = lastCountry - countriesPerPage // indice 0 // cuando currentPage sea 2, indice va a ser 10
    const currentCountries = countries.slice(firstCountry, lastCountry) // me va a slicear del indice 0 al indice 9 // cuando currentPage sea 2, slicea del indice 10 al 19


    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=> {
        countries.length && SetisLoading(false)
    },[countries])
    return (
        <>
            {
                isLoading ? <p>Loading...</p> :
                    <>
                        <div className={style.mainContainer}>
                            {
                                currentCountries.length ? currentCountries.map(country => {
                                    return <Card
                                        key={country.id}
                                        id={country.id}
                                        flag={country.flag}
                                        name={country.name}
                                        continent={country.continent}
                                    />
                                }):
                                <p>No results</p>
                            }
                        </div>
                        <div>
                            <Paginated
                                countries={countries.length}
                                countriesPerPage={countriesPerPage}
                                paginated={paginated}
                            ></Paginated>
                        </div>
                    </>
            }
        </>

    )
}

export default CardsContainer