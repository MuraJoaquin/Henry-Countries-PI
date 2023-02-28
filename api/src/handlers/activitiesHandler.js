const {createActivity,getActivities} = require('../controllers/activitiesControllers')

const postActivitiesHandler = async (req,res) => {
    try {
        const {name,difficulty,duration,season,countriesId} = req.body
        const result = await createActivity(name,difficulty,duration,season,countriesId)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const getActivitiesHandler = async (req,res) => {
    try {
        const result = await getActivities()
        if(result.length) return res.status(200).send(result)
        else{
            return res.send('No activities')
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
    
}
 
module.exports = {postActivitiesHandler,getActivitiesHandler}