const helper = require('./server');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const createUser = (request, response) => {
    const { name, email, password } = request.body
  
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

const login = (req, res) => {
    const {email, password} = req.body;
    pool.query('SELECT * FROM users WHERE email = $1  AND password = $2', [email, password], (error, results) => {
      if (error) {
        throw error
      }
      if(results.rows['0']){
        let generator = new helper();
        let token = generator.generateToken(results.rows['0'].email) 
        res.status(200).json({token: token})
      }
    })
}

function getDateNbMots(email){
    return new Promise((resolve, reject)=>{
        pool.query('SELECT date_vue, nb_mots FROM users WHERE email = $1', [email])
        .then((res)=>{
            resolve(res)
        })
        .catch(error => reject(error))
    })
  
}

function updateUser(email, nbMots){
    let date = new Date();
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE users SET date_vue = $1, nb_mots = nb_mots + $2 WHERE email = $3',
            [date, nbMots, email])
        .then(res => {
            resolve(res);
        })
        .catch(err =>{ 
            reject(err)
        });
    })
    
}

  module.exports = { createUser, login, getDateNbMots, updateUser }