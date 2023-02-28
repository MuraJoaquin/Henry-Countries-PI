

const validate = (req,res,next) => {
    const {name,difficulty,duration,season,countriesId} = req.body
    if(!name) return res.status(400).send({error: "Missing name"})
    if(!difficulty) return res.status(400).send({error: "Missing difficulty"})
    if(!duration) return res.status(400).send({error: "Missing duration"})
    if(!season) return res.status(400).send({error: "Missing season"})
    if(!countriesId) return res.status(400).send({error: "Missing countriesId"})

    next()
}

const validateForQuery = (req,res,next) => {
    const {name} = req.query
    if(name && name.length < 3) return res.status(400).send({error: "Insert a longer query, minimum 3 words"})
    next()
}

module.exports = {validate,validateForQuery}