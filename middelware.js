let jwt = require('jsonwebtoken');
const db = require('./queries')

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        return canJustify(decoded.email, req.body)
          .then(response=> {
            if (response) return  res.status(402).json({message: "Payment Required"})
            else return next();
          })
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

async function canJustify(email, body) {
  try{
    let nbMots = body.split(' ').length;
    let {rows} =  await db.getDateNbMots(email);
    let date = new Date();

    if(rows[0]['nb_mots'] >= 800 && isSameDay(date, rows[0]['date_vue']) ){
      return true;
    }
    else{
      await db.updateUser(email, nbMots);
      return false ;
    }
  }catch(err){
    return err;
  }
}

const isSameDay = (a, b) => {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate()=== b.getDate()
}


module.exports = {
  checkToken: checkToken,
};

