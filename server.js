let jwt = require('jsonwebtoken');

class Helper {
  generateToken(email) {
    let token = jwt.sign({email: email},
      process.env.JWT_KEY,
      { expiresIn: '24h' // expires in 24 hours
      }
    );
    return token;
  }

  changeText = (text) =>{
    var len = 80
    var re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
    var lines = text.match(re);
    var result = lines.map(function(line) {
      if (line.slice(-1) === '\n') {
        line = line.slice(0, line.length - 1);
      }
      return line;
    }).join('\n');
    result = result.replace(/(^[ \t]*\n)/gm, "")
    return result;
  }

  justify = (req, res) => {
    try{
      var inputText = req.body
      // if first try words count more than 80000 raise error
      if(inputText.split('').length >= 80000){
        res.json({message: 'Payment Required'});
      }
      var result =  this.changeText(inputText);
      res.send(result);
    }
    catch(err){
      res.json(err);
    }
  }

  
}
module.exports = Helper


