A NodeJs App to justify a given text with login and register and middelware that allows only 80000 words per day 


First of all create the database 
``` 
CREATE DATABASE api; 
```

Then create the table users 

```
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  password VARCHAR(10),
  date_vue DATE,
  nb_mots integer
);
```

The routes: 
```
localhost:3001/api/register 
 ``` 
 to register a user entering form encoded name, email and password 
``` 
localhost:3001/api/login
```
 to login using email and password 
``` 
localhost:3001/api/justify 
```
 to justify the text entered in the body 
