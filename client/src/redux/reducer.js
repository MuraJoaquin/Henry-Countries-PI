import { GET_COUNTRIES, GET_COUNTRY, FILTERED_BY_NAME,GET_ACTIVITIES,FILTER_BY_ACTIVITY_AND_CONTINENT, ORDER_ASC} from "./actions"

const initialState = {
    countries : [],
    alwaysCountries : [],
    detail : {},
    activities: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COUNTRIES:
            const randomCountries = orderRandom(action.payload)
            // const ascCountries = orderAsc(action.payload)
            return{
                ...state,
                countries: randomCountries,
                alwaysCountries: randomCountries
            }
        case GET_COUNTRY:
            return{
                ...state,
                detail:action.payload
            }
        case FILTERED_BY_NAME:
            return{
                ...state,
                countries: action.payload
            }
        case FILTER_BY_ACTIVITY_AND_CONTINENT:
            const countries = state.alwaysCountries
            const countriesFilteredByContinent =  action.payload.continent === "All" ?   countries  : countries.filter(c => c.continent === action.payload.continent)
            const filteredCountries = filterByActivities(action.payload.activity,countriesFilteredByContinent)
            const orderedCountries = orderBySort(action.payload.ordering,filteredCountries)
            const orderedCountriesByPopulation = orderByPopulation(action.payload.population,orderedCountries)
            return{
                ...state,
                countries: orderedCountriesByPopulation
            }      
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        default:
            return{ ...state }
    }
}
export default rootReducer

const filterByActivities = (nameOfActivity,countries) => {
    console.log(countries);
    if(nameOfActivity === "") return countries
    else {
         return countries.filter(c => c.activities.find(a => a.name === nameOfActivity))
    }
}

const orderBySort = (valueOfOrdering,countries) => {
    const sortedArray = valueOfOrdering === 'asc'  ?
            countries.sort(function (a,b){
                if(a.name > b.name) return 1
                if(b.name > a.name) return -1
                return 0 
            }) :
            valueOfOrdering === 'desc' ?
            countries.sort(function (a,b){
                if(a.name > b.name) return -1
                if(b.name > a.name) return 1
                return 0 
            }): orderRandom(countries) 
    return sortedArray
}

const orderRandom = (countries) => {
    countries.sort(function () { 
        return  Math.random()-0.5
    }) 
    return countries
}

const orderByPopulation = (order,countries) => {
    const orderedArray = order === "pop_asc" ?
    countries.sort(function (a,b){
        if(a.population > b.population) return -1
        if(b.population > a.population) return 1
        return 0 
    }):
    order === "pop_desc" ?
    countries.sort(function (a,b){
        if(a.population > b.population) return 1
        if(b.population > a.population) return -1
        return 0 
    }): countries
    return orderedArray

}