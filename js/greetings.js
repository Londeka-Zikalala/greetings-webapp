export default function Greeting() {
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
 
 /*function greetedFunction(name) {
  const transformedName = inputString(name);

  if (message) {
    const greetedName = await db.oneOrNone(
      "SELECT name FROM greetings_schema.users WHERE name = $1",
      [transformedName]
    );

    if (greetedName === null) {
      if (language) {
        await db.none('INSERT INTO greetings_schema.users (name, language, timesgreeted) VALUES ($1, $2, $3)', [name, language, 1]);
      } else {
        console.error('Language is missing');
      }
    } else {
      await db.none('UPDATE greetings_schema.users SET timesgreeted = timesgreeted + 1 WHERE  name = $1', [name]);
    }
  }
}*/
  function greetedFunction(name) {

    const transformedName = inputString(name)
    if(message){
      if (!alreadyGreeted[transformedName]) {
        alreadyGreeted[transformedName] = true;
        greetedNames[transformedName] = 1;
        if(!errorMessage){
          greetingsCounter++;
        }
  
        //return false;
      } 
        greetedNames[transformedName]++;
  
      return true;
    }
     /*var greetedName = await db.oneOrNone(
        "select name from greetings_schema.users where name = $1",
        [transformedName]
      )
      if(greetedName === null){
        await db.none('INSERT INTO greetings_schema.users (name, timesgreeted) VALUES ($1, $2)', [name, 1]);
      } else{
        await db.none('UPDATE greetings_schema.users SET timesgreeted = timesgreeted + 1 WHERE  name = $1', [name]) 

      }*/

  }


  function getGreetedName() {
    return greetedNames;
  };



  function getUserCount(name) {
    const transformedName = inputString(name)
    /*const query =
    "select timesgreeted from greetings_schema.users where name = $1";
    const userData = await db.oneOrNone(query, [transformedName]);

    return userData
    */
      return greetedNames[transformedName] || 0
  
   
  };

  function getCounter() {
    
 /*var dbUsers = await db.oneOrNone("select count(name) from greetings_schema.users")
 greetingsCounter = dbUsers.count*/
 
 return greetingsCounter ;
  
  };

  function reset() {

  /*await db.none(
    "TRUNCATE TABLE greetings_schema.users RESTART IDENTITY CASCADE;"
  );
*/

   greetingsCounter = 0;
    alreadyGreeted = {};
    greetedNames = {};

  };

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