import style from './Paginated.module.css'
import { useEffect, useState } from 'react'

const Paginated = ({countries,countriesPerPage,paginated}) => {

    const pageNumber = []
    for(let i = 1; i <= Math.ceil(countries/countriesPerPage); i++){  // aca se me guarda cuantas paginaciones va a tener mi paginado. En este caso son 250 paises/ 10 = 25 paginas
        pageNumber.push(i)
    }
    const [current,setCurrent] = useState(1)
    const clickHandlerNext = () => {
        setCurrent(current+1)
        paginated(current + 1)
    }

    const clickHandlerPrevious = () =>{
        setCurrent(current - 1)
        paginated(current - 1)
    }

    const clickHandlerLast = () => {
        const lastCountry = pageNumber.length - 0
        setCurrent(lastCountry)
        paginated(lastCountry)
    }

    useEffect(() => {
        countries && setCurrent(1)
        countries && paginated(1)
    },[countries])

    return(
        <>
        <div className={style.pagination}>
            {
                current > 1 && <a onClick={clickHandlerPrevious}> <button>Previous</button></a>
            }
            {
                pageNumber.length && <a className={style.pageNumbers}>{current} de {pageNumber.length}</a>
            }
            {
                current < pageNumber.length && <a onClick={clickHandlerNext}> <button>Next</button></a>
            }
            {
                pageNumber.length > 2 && current < pageNumber.length - 1 && <a onClick={clickHandlerLast}> <button>Last</button></a>
            }
        </div>
        </>


        // <div>
        //     <ul className={style.paginated}>
        //         {pageNumber && pageNumber.map(number => (
        //             <li key={number}>
        //                 <a onClick={() => paginated(number)}>{number}</a> 
        //             </li> //por cada numerito adentro del array, me crea una pagina
        //         ))}
        //     </ul>
        // </div>
    )
}
export default Paginated