export default function Greeting() {
  var alreadyGreeted = {};
  var greetedNames = {};
  var greetingsCounter = 0;

  function inputString(name) {
    const regex = /^[a-zA-Z]+$/i;
    return typeof name === 'string' && name.trim() !== '' && regex.test(name.trim()) ? name.toLowerCase() : '';

  }

  function greetedFunction(name) {
    const transformedName = inputString(name)
    if (!alreadyGreeted[transformedName]) {
      alreadyGreeted[transformedName] = true;
      greetedNames[transformedName] = 1;
      greetingsCounter++;

      return false;
    }
    greetedNames[transformedName]++
    return true;
  }

  function getGreetedName() {
    return greetedNames;
  }
  function errorMessages(name, language) {
    const transformedName = inputString(name);
    if (!transformedName && language === "") {
      return "Select a language and enter a valid string (No numbers or charecters)";
    }
    else if (language === "") {
      return "Please select a language";
    }
    else if (!transformedName) {
      return "Enter a valid string (No numbers or charecters)";
    }
    else {
      return "";
    }
  }
  
  function greetFunction(name, language) {
    const transformedName = inputString(name);
    var errorMessage = errorMessages(name,language);
    var message = "";
    if(!errorMessage){
      if (language === 'Swati') {
        message = 'Sawubona ' + transformedName;
      } else if (language === 'English') {
        message = 'Hello ' + transformedName;
      } else if (language === 'Sotho') {
        message = 'Dumela ' + transformedName;
      }
    }
    return {
      message, 
      errorMessage
    }
    }
    

  function getUserCount(name) {
    const transformedName = inputString(name)
    greetedFunction(transformedName)
    return greetedNames[transformedName] || 0
  }
  function getCounter() {
    return greetingsCounter;
  }

  function reset() {
    greetingsCounter = 0;
    alreadyGreeted = {};
    greetedNames = {};

  }

  return {
    inputString,
    greetedFunction,
    getGreetedName,
    greetFunction,
    getCounter,
    getUserCount,
    errorMessages,
    reset
  };
}