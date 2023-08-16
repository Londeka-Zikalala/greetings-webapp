import pgp from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const connectionString =  {
    dbURL: process.env.DATABASE_URL
   // ssl: { rejectUnauthorized: false }
}

const db = pgp()(connectionString);
db.connect();
export default db
//Defining Database queries

/*async function addUser(name, language){
    return await db.none('INSERT INTO greetings_schema.users (name, language, timesgreeted) VALUES ($1, $2, $3)', [name, language, 0]);
}

async function getUsers(){
    return await db.any('SELECT * FROM greetings_schema.users');
}*/
