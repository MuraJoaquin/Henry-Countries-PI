const {Router} = require('express')
const {postActivitiesHandler,getActivitiesHandler} = require('../handlers/activitiesHandler')
const activitiesRouter = Router()
const {validate} = require('../middlewares/validation')


activitiesRouter.post('/', validate, postActivitiesHandler)
activitiesRouter.get('/', getActivitiesHandler)

module.exports = activitiesRouter