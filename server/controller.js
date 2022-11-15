const Sequelize = require('sequelize')

const CONNECTION_STRING = process.env.CONNECTION_STRING

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {

    newHighScore: (req,res) => {
        let {name, score} = req.body
        sequelize.query(`
            INSERT INTO scores(name, score)
            VALUES ('${name}', ${score});
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('sequelize error')
        })
    },
    getHighScores: (req,res) => {
        sequelize.query(`
            SELECT name, score FROM scores
            ORDER BY score DESC
            LIMIT 5;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}