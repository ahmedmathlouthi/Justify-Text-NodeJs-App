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