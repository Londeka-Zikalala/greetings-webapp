
export default function Greeting() {
  let errorMessage = '';
  let message = '';


  function inputString(name) {
    const regex = /^[a-zA-Z]+$/i;
    return typeof name === 'string' && name.trim() !== '' && regex.test(name.trim()) ? name.toLowerCase() : '';

  }

  function errorMessages(name, language) {
    let transformedName = inputString(name);

    if (transformedName === "" && language === undefined) {
      errorMessage = "Select a language and enter a valid string (No numbers or charecters)";

    }
    else if (transformedName && language === undefined) {
      errorMessage = "Please select a language";


    }
    else if (!transformedName) {
      errorMessage = "Enter a valid string (No numbers or charecters)";

    }

    else {
      errorMessage = ""
    }

  }




  function greetFunction(name, language) {

    const transformedName = inputString(name);


    if (transformedName) {
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


  function getErrorMessage() {

    return errorMessage

  }




 



  return {
    inputString,
    greetFunction,
    errorMessages,
    getErrorMessage,
  };
}