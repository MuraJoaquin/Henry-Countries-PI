
const {getApiCountries,getCountryById,getCountriesByName} = require('../controllers/countriesControllers')


const getCountriesHandler = async (req,res) => {
    const {name} = req.query
    try {
        const result = name ? await getCountriesByName(name) : await getApiCountries()
        if(result.length) return res.status(200).send(result)
        else{
            throw Error(`The country with name ${name} does not exist`)
        }
    } catch (error) {
        res.status(400).send({error:error.message})

    }
}

const getCountryHandler = async (req,res) => {
    const {id} = req.params
    try {
        const result = await getCountryById(id)
        if(result){
            return res.status(200).send(result)
        }
        throw Error(`The country with id ${id} does not exist`)
        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}



module.exports = {getCountriesHandler,getCountryHandler}
