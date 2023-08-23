
export default function Greeting(db) {
  var alreadyGreeted = {};
  var greetedNames = {};
  var greetingsCounter = 0;
  let errorMessage = '';
  let message = '';
  

  function inputString(name) {
    const regex = /^[a-zA-Z]+$/i;
    return typeof name === 'string' && name.trim() !== '' && regex.test(name.trim()) ? name.toLowerCase() : '';

  }

  function errorMessages(name, language){
    let transformedName = inputString(name);
    
    if (transformedName === "" && language === undefined) {
      errorMessage = "Select a language and enter a valid string (No numbers or charecters)";
     
    }
    else if(transformedName  && language === undefined){
      errorMessage = "Please select a language";

    
    }
    else if(!transformedName) {
      errorMessage = "Enter a valid string (No numbers or charecters)";
   
    }

    else{
      errorMessage = ""
    }
    
  }


   function greetFunction(name, language) {
    
    const transformedName = inputString(name);
   
     
      if(transformedName){
        if (language === 'Swati') {
          message = 'Sawubona ' + transformedName;
        } else if (language === 'English') {
          message = 'Hello ' + transformedName;
        } else if (language === 'Sotho') {
          message = 'Dumela ' + transformedName;
        }
      }
     
      
    return message
  };
  

  function getErrorMessage(){
  
      return errorMessage
  
}
 

async function greetedFunction(name, language) {
  const transformedName = inputString(name);

  if (transformedName) {
    try {
      const user = await db.oneOrNone('SELECT * FROM greetings_schema.users WHERE name = $1', [transformedName]);

      if (!user) {
        await db.none('INSERT INTO greetings_schema.users (name, timesgreeted, language) VALUES ($1, $2, $3)', [transformedName, 1, language]);
        greetingsCounter++;
        return false;
      } else {
        await db.none('UPDATE greetings_schema.users SET timesgreeted = timesgreeted + 1 WHERE name = $1', [transformedName]);
        return true;
      }
    } catch (error) {
      console.error('Error interacting with database', error);
      return false;
    }
  }

  return false;
}


async function getGreetedName() {
  try {
    const greetedNames = await db.any('SELECT name FROM greetings_schema.users');
    return greetedNames.map(data => data.name);
  } catch (error) {
    console.error('Error getting greeted names', error);
    return [];
  }
}



async function getUserCount(name) {
  const transformedName = inputString(name);
  
  try {
    const user = await db.oneOrNone('SELECT * FROM greetings_schema.users WHERE name = $1', [transformedName]);
    return user ? user.timesgreeted : 0;
  } catch (error) {
    console.error('Error fetching user count', error);
    return 0;
  }
}

  function getCounter() {
 
return greetingsCounter ;
  
  };

  async function reset() {
    try {
      await db.none("TRUNCATE TABLE greetings_schema.users RESTART IDENTITY CASCADE;");
      greetingsCounter = 0;
      errorMessage = '';
      message = '';
    } catch (error) {
      console.error('Error resetting data', error);
    }
  }

  return {
    inputString,
    greetedFunction,
    getGreetedName,
    greetFunction,
    getCounter,
    getUserCount,
    errorMessages,
    getErrorMessage,
    reset
  };
}