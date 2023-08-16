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
    else if(transformedName && language === undefined){
      errorMessage = "Please select a language";

    
    }
    else if(!transformedName) {
      errorMessage = "Enter a valid string (No numbers or charecters)";
   
    }
    
  }


   function greetFunction(name, language) {
    
    const transformedName = inputString(name);
   
      errorMessage = "";
      if(name){
        if (language === 'Swati') {
          message = 'Sawubona ' + transformedName;
        } else if (language === 'English') {
          message = 'Hello ' + transformedName;
        } else if (language === 'Sotho') {
          message = 'Dumela ' + transformedName;
        }
        else{
          message = "";
        }
      }
     
      
    return message
  };
  
  function getErrorMessage(){
  
      return errorMessage
  
}
 

  async function greetedFunction(name) {

    const transformedName = inputString(name)
    if(message){
    await db.none('INSERT INTO greetings_schema.users (name, language, timesgreeted) VALUES ($1, $2, $3)', [name, language, 0]);

      if (!alreadyGreeted[transformedName]) {
        alreadyGreeted[transformedName] = true;
        greetedNames[transformedName] = 1;
        greetingsCounter++;
  
        return false;
      } 
        greetedNames[transformedName]++;
  
      return true;
   
    }
  }


  function getGreetedName() {
    return greetedNames;
  };



  function getUserCount(name) {
   
    const transformedName = inputString(name)
      return greetedNames[transformedName] || 0
  
   
  };

 async function getCounter() {
    
 var dbUsers = await db.oneOrNone("select count(name) from greetings_schema.users")
 greetingsCounter = dbUsers.count
 
  return greetingsCounter ;
    
   
  };

  function reset() {
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