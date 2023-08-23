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
 

   function greetedFunction(name) {

    const transformedName = inputString(name)
    if(message){
      if (!alreadyGreeted[transformedName]) {
        alreadyGreeted[transformedName] = true;
        greetedNames[transformedName] = 1;
        if(!errorMessage){
          greetingsCounter++;
        }
  
      return false;
      } else{
        greetedNames[transformedName]++;
  
        return true;
      }
       
    }
      return false;

  }


  function getGreetedName() {
    return greetedNames;
  };



   function getUserCount(name) {
    const transformedName = inputString(name)
 return greetedNames[transformedName] || 0
  
   
  };

  function getCounter() {
 
return greetingsCounter ;
  
  };

  async function reset() {

  await db.none(
    "TRUNCATE TABLE greetings_schema.users RESTART IDENTITY CASCADE;"
  );


   /*greetingsCounter = 0;
    alreadyGreeted = {};
    greetedNames = {};*/

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