import style from './Paginated.module.css'
import { useEffect, useState } from 'react'

const Paginated = ({countries,countriesPerPage,paginated}) => {

    const pageNumber = []
    for(let i = 1; i <= Math.ceil(countries/countriesPerPage); i++){  // aca se me guarda cuantas paginaciones va a tener mi paginado. En este caso son 250 paises/ 10 = 25 paginas
        pageNumber.push(i)
    }

    const scroll = () => {
        window.scroll({
            top: 100,
            behavior: 'smooth'
          })
    }
    
    const [current,setCurrent] = useState(1)
    const clickHandlerNext = () => {
        setCurrent(current + 1)
        paginated(current + 1)
        scroll()
    }

    const clickHandlerPrevious = () =>{
        setCurrent(current - 1)
        paginated(current - 1)
        scroll()
    }

    const clickHandlerLast = () => {
        const lastCountry = pageNumber.length - 0
        setCurrent(lastCountry)
        paginated(lastCountry)
        scroll()
    }

    useEffect(() => {
        countries && setCurrent(1)
        countries && paginated(1)
    },[countries])


    return(
        <>
        <div className={style.pagination}>
            {
                current > 1 && <button onClick={clickHandlerPrevious}>Previous</button>
            }
            {
                pageNumber.length && <a className={style.pageNumbers}>{current} de {pageNumber.length}</a>
            }
            {
                current < pageNumber.length && <button onClick={clickHandlerNext}>Next</button>
            }
            {
                pageNumber.length > 2 && current < pageNumber.length - 1 && <button onClick={clickHandlerLast}>Last</button>
            }
        </div>
        </>
    )
}
export default Paginated