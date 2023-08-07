export default function Greeting() {
    var alreadyGreeted = {};
    var greetingsCounter = 0;
    var transformedName = '';
  
    function inputString(name) {
      const regex = /^[a-zA-Z]+$/i;
      transformedName = typeof name === 'string' && name.trim() !== '' && regex.test(name.trim()) ? name.toLowerCase() : '';
      return transformedName 
    }
  
    function greetedFunction(transformedName) {
      if (!alreadyGreeted[transformedName]) {
        alreadyGreeted[transformedName] = true;
        greetingsCounter++;
        return false; 
      }
      return true; 
    }
  
    function getGreetedName(){
        return  transformedName;
    }

    function greetFunction(name, language) {
     inputString(name);
      if (language === 'Swati') {
          return 'Sawubona ' + transformedName;
        } else if (language === 'English') {
          return 'Hello ' + transformedName;
        } else if (language === 'Sotho') {
          return 'Dumela ' + transformedName;
        }
      }
  
    function errorMessages(name, language) {
      inputString(name);
      if (!transformedName && language === "") {
        return "Select a language and enter a valid string (No numbers or charecters)";
      } 
      else if(language === ""){
        return "Please select a language";
      }
      else if(!transformedName){
        return "Enter a valid string (No numbers or charecters)";
      }
      else{
        return "";
      }
    }
  
    function getCounter() {
      return greetingsCounter;
    }
  
    function reset() {
      greetingsCounter = 0;
      alreadyGreeted = {};
    }
  
    return {
      inputString,
      greetedFunction,
      getGreetedName,
      greetFunction,
      getCounter,
      errorMessages,
      reset
    };
  }