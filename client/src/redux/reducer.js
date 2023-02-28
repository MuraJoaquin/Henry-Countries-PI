import { GET_COUNTRIES, GET_COUNTRY, FILTERED_BY_NAME,GET_ACTIVITIES,FILTER_BY_ACTIVITY_AND_CONTINENT} from "./actions"

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

            return{
                ...state,
                countries: orderedCountries
            }
        // case FILTER_BY_CONTINENT:
        //     const countries = state.alwaysCountries
        //     const countriesFiltered = action.payload === "All" ?   countries  : countries.filter(c => c.continent === action.payload)
        //     return {
        //         ...state,
        //         countries:countriesFiltered
        //     }
    
        // case FILTER_BY_ACTIVITY:
        //     const allCountries = state.countries
        //     const filteredCountries = filterByActivities(action.payload,allCountries)
        //     console.log(filteredCountries);
        //     return {
        //         ...state,
        //         countries: filteredCountries
        //     }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        // case ORDER_BY_SORT:
        //     const sortedArray = action.payload === 'asc' ?
        //     state.countries.sort(function (a,b){
        //         if(a.name > b.name) return 1
        //         if(b.name > a.name) return -1
        //         return 0 
        //     }) :
        //     action.payload === 'desc' ?
        //     state.countries.sort(function (a,b){
        //         if(a.name > b.name) return -1
        //         if(b.name > a.name) return 1
        //         return 0 
        //     }) : 
        //     state.countries.sort(function (a,b){
        //         if(a.population > b.population) return -1
        //         if(b.population > a.population) return 1
        //         return 0 
        //     })
        //     return{
        //         ...state,
        //         countries: sortedArray
        //     }
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
            }) :
            valueOfOrdering === 'rand' ?
            orderRandom(countries) :
            countries.sort(function (a,b){
                if(a.population > b.population) return -1
                if(b.population > a.population) return 1
                return 0 
            })
    return sortedArray
}

const orderRandom = (countries) => {
    countries.sort(function () { 
        return  Math.random()-0.5
    }) 
    return countries
}