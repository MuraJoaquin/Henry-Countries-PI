const {Activity,Country} = require('../db')

const createActivity = async (name,difficulty,duration,season,countriesId) => {
    const activityCreated = await Activity.create({name,difficulty,duration,season})
    await activityCreated.addCountries(countriesId)
    return activityCreated
}

const getActivities = async () => {
    const activities = await Activity.findAll({
        include : {
            model: Country,
            through: {
                attributes: []
            }

            
        }
    })
    return activities
}

module.exports ={createActivity,getActivities}