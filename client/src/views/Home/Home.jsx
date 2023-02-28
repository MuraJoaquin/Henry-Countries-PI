
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getActivities,  filters } from "../../redux/actions"
import CardsContainer from "../../components/CardsContainer/CardsContainer"
import SearchBar from "../../components/SearchBar/SearchBar"
import style from './Home.module.css'


const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])


    const changeFilterHandler = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        })
        console.log({ ...filtros, [e.target.name]: e.target.value });
        // e.target.name === 'ordering' && setOrder(`Ordered ${e.target.value}`)
        dispatch(filters({ ...filtros, [e.target.name]: e.target.value }))
    }

    // const [order, setOrder] = useState('')
    const [filtros, setFiltros] = useState({
        continent: "All",
        activity: "",
        ordering: "rand"
    })
    const activities = useSelector(state => state.activities)
    const contintents = ["All", "Europe", "North America", "South America", "Africa", "Asia", "Oceania"]

    return (
        <>
            <SearchBar></SearchBar>
            <div className={style.selectDiv}>
                <select className={style.select} name="continent" onChange={changeFilterHandler}>
                    {
                        contintents.map((c, i) => {
                            return (
                                <option key={i} value={c}>{c}</option>
                            )
                        }
                        )
                    }
                </select>
                {
                    typeof activities === 'string' ? (null) : (
                        <select className={style.select} name="activity" onChange={changeFilterHandler}>
                            <option name="activity" value="">---</option>
                            {
                                activities.map(a => {
                                    return (
                                        <option key={a.id} value={a.name}> {a.name}</option>
                                    )
                                })
                            }
                        </select>
                    )
                }
                <select className={style.select} name="ordering" onChange={changeFilterHandler}>
                    <option value="rand">random</option>
                    <option value="asc">ascendente</option>
                    <option value="desc">descendente</option>
                    <option value="population">por poblacion</option>
                </select>
            </div>
            <CardsContainer />
        </>
    )
}

export default Home