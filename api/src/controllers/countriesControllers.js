const axios = require('axios')
const {Country,Activity} = require('../db')
const { Op } = require("sequelize")

const cleanArray = (arr) =>  
    arr.map((elem) => {
        return{
            id: elem.cca3,
            name: elem.name.common,
            flag: elem.flags ? elem.flags[1] : "",
            continent: elem.continents ? elem.continents[0] : "",
            capital: elem.capital ? elem.capital[0] : "",
            subregion: elem.hasOwnProperty('subregion') ? elem.subregion : "",
            area: elem.area,
            population: elem.population
        }
    })

const saveApiDataInDb = async () => {
    const apicountriesRow = (await axios.get("https://restcountries.com/v3/all")).data
    const apiCountries = cleanArray(apicountriesRow)
    await Country.bulkCreate(apiCountries)
}


const getApiCountries = async () => {
    const countries = await Country.findAll({
        include :{
            model: Activity, // nose pq se cambia el orden de los paises
            through: {
                attributes: []
            }
        }
    })
    return countries

}

const getCountriesByName = async (name) => {
    const countriesFoundByName = await Country.findAll({
        where: {
            name: { [Op.iLike] : `%${name}%`}
        }
    })
    return countriesFoundByName

}


const getCountryById = async (id) => {
    const countryFound = await Country.findByPk(id,{
        include : {
            model: Activity,
            through: {
                attributes : []
            }
        }     
    })
    return countryFound
}




module.exports = {getApiCountries,getCountryById,getCountriesByName,saveApiDataInDb}