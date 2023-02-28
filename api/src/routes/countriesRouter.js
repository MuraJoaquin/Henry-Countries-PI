const {Router}= require('express')
const {getCountriesHandler,getCountryHandler} = require('../handlers/countriesHandler')
const {validateForQuery} = require('../middlewares/validation')

const countriesRouter = Router()

countriesRouter.get('/', validateForQuery, getCountriesHandler)
countriesRouter.get('/:id', getCountryHandler)



module.exports = countriesRouter


