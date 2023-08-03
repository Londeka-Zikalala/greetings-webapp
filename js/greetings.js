function Greeting() {
    var alreadyGreeted = {};
    var greetingsCounter = 0;
  
    function inputString(name) {
      const regex = /^[a-zA-Z]+$/i;
      return typeof name === 'string' && name.trim() !== '' && regex.test(name.trim()) ? name.toLowerCase() : '';
    }
  
    function greetedFunction(name) {
      var transformedName = inputString(name);
      if (!alreadyGreeted[transformedName]) {
        alreadyGreeted[transformedName] = true;
        greetingsCounter++;
        return false; 
      }
      return true; 
    }
  
    function greetFunction(name, language) {
      var transformedName = inputString(name);
      if (language === 'Swati') {
          return 'Sawubona ' + transformedName;
        } else if (language === 'English') {
          return 'Hello ' + transformedName;
        } else if (language === 'Sotho') {
          return 'Dumela ' + transformedName;
        }
      }
  
    function errorMessages(name, language) {
      var transformedName = inputString(name);
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
      greetFunction,
      getCounter,
      errorMessages,
      reset
    };
  }