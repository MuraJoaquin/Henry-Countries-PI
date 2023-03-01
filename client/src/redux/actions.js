import axios from 'axios'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRY = 'GET_COUNTRY'
export const FILTERED_BY_NAME = 'FILTERED_BY_NAME'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const FILTER_BY_ACTIVITY_AND_CONTINENT = 'FILTER_BY_ACTIVITY_AND_CONTINENT'
export const ORDER_ASC = 'ORDER_ASC'

export const getCountries =  () => {
    return async function(dispatch){
        const data = (await axios.get('http://localhost:3001/countries')).data
        dispatch({type:GET_COUNTRIES, payload:data})
    }
}

export const getCountryById = (id) => {
    return async function(dispatch){
        const data = (await axios.get(`http://localhost:3001/countries/${id}`)).data
        dispatch({type:GET_COUNTRY, payload:data})
    }
}

export const filterCountriesByName = (name) => {
    return async function(dispatch){
        try {
            const data = (await axios.get(`http://localhost:3001/countries?name=${name}`)).data
            dispatch({type: FILTERED_BY_NAME, payload: data})
        } catch (error) {
            alert("Invalid country, TRY AGAIN")
        }
    }
}

export const getActivities = () => {
    return async function (dispatch){
        const data = (await axios.get('http://localhost:3001/activities')).data
         dispatch({type:GET_ACTIVITIES, payload:data})
    }
}

export const filters = (value) => {
    return {type:FILTER_BY_ACTIVITY_AND_CONTINENT,payload:value}
}

