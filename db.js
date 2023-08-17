import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();


const connectionString = {
    host: process.env.HOSTNAME, 
    port: process.env.PORT,    
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    ssl:true //{  
       // rejectUnauthorized: false, 
       // minVersion: 'TLSv1.2',    
       // ciphers: 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256', 
   // },
}

const db = pgPromise()(connectionString);
db.connect();
export default db
//Defining Database queries

/*async function addUser(name, language){
    return await db.none('INSERT INTO greetings_schema.users (name, language, timesgreeted) VALUES ($1, $2, $3)', [name, language, 0]);
}

async function getUsers(){
    return await db.any('SELECT * FROM greetings_schema.users');
}*/
