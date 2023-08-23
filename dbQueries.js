import db from './db.js'


function dbQueries(){
    async function updateUsers(name, language) {
        try {
            const existingUser = await db.oneOrNone('SELECT * FROM greetings_schema.users WHERE name = $1',[name]);
    
            if (existingUser) {
                await db.none(
                    'UPDATE greetings_schema.users SET timesgreeted = timesgreeted + 1 WHERE name = $1',[name]);
            } else {
                await db.none(
                    'INSERT INTO greetings_schema.users (name, language, timesgreeted) VALUES ($1, $2, $3)',[name, language, 1]);
            }
        } catch (error) {
            console.error('Error inserting or updating user data', error);
            throw error;
        }
    }
    
    
    async function getUsersCount(name){
        try {
            const userDataArray = await db.any('SELECT timesgreeted FROM greetings_schema.users WHERE name = $1', [name]);
            const totalTimesGreeted = userDataArray.reduce((total, userData) => total + userData.timesgreeted, 0);
            return totalTimesGreeted;
        } catch (error) {
            console.error('Error getting user data', error);
        }
    }

    async function getUserNames(){
       try {const getNames = await db.any('SELECT name FROM greetings_schema.users');
        const greetedUsers = getNames.map(data => data.name);
        return greetedUsers
    }catch (error) {
        console.error('Error getting user names', error);
    }
    }


    return {
        updateUsers,
        getUsersCount,
        getUserNames
    }
}

export default dbQueries