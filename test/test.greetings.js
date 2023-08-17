import assert from "assert";
import Greeting from "../js/greetings.js";
import db from "../db.js";


describe('The greetings function', function(){
  this.timeout(6000);
  beforeEach(async function () {
    await db.none(
      "TRUNCATE TABLE greetings_schema.users RESTART IDENTITY CASCADE;"
    );
  });
    it('should keep a count of all greetings', async function(){
        var greeter = Greeting(db);
        greeter.greetFunction('Nsovo', 'Swati')
        greeter.greetFunction('Lala', 'Sotho')
        greeter.greetFunction('Nate','English')
        greeter.greetFunction('Londeka','Swati')
       await greeter.greetedFunction('Nsovo', 'Swati');
       await greeter.greetedFunction('Lala', 'Sotho');
       await greeter.greetedFunction('Nate', 'English');
       await greeter.greetedFunction('Londeka', 'Swati');
    
        assert.equal(await greeter.getCounter(), 4)
    });

    it('should should reset the data', async function(){
        var greeter = Greeting(db);
        greeter.greetFunction('Nsovo', 'Swati')
        greeter.greetFunction('Lala', 'Sotho')
        greeter.greetFunction('Nate','English')
        greeter.greetFunction('Londeka','Swati')
       await greeter.greetedFunction('Nsovo', 'Swati');
       await greeter.greetedFunction('Lala', 'Sotho');
       await greeter.greetedFunction('Nate', 'English');
       await greeter.greetedFunction('Londeka', 'Swati');
       await greeter.reset()
        assert.equal(await greeter.getCounter(), 0)
    });

    it('should should count how many times a user has been greeted', async function(){
        var greeter = Greeting(db);
        greeter.greetFunction('Nsovo', 'Swati')
        greeter.greetFunction('Lala', 'Sotho')
        greeter.greetFunction('Londeka','English')
        greeter.greetFunction('Londeka','Swati')
       await greeter.greetedFunction('Nsovo', 'Swati');
       await greeter.greetedFunction('Lala', 'Sotho');
       await greeter.greetedFunction('Londeka', 'English');
       await greeter.greetedFunction('Londeka', 'Swati');
=      
        assert.equal(await greeter.getUserCount('Londeka'), 2)
    });
    


    after(function () {
        db.$pool.end();
      });
    
})




/*describe('The greetings function', function(){
    it('should input word strings only', function(){
        var greeter = Greeting();
        let invalid = 256
        assert.equal(greeter.inputString(invalid), false)
    })
    it('should recognise "john" and "John" as the same name', function(){
        var greeter = Greeting();
        var name = 'John'
        var name2 = 'john'
        assert.equal(greeter.inputString(name), 'john')
        assert.equal(greeter.inputString(name2), 'john')

    })
    it('should greet any name in Swati', function(){
        var greeter = Greeting();
        assert.equal(greeter.greetFunction('Londeka', 'Swati'), 'Sawubona londeka' )
        assert.equal(greeter.greetFunction('Nate', 'Swati'),'Sawubona nate' )
        assert.equal(greeter.greetFunction('Nsovo', 'Swati'),  'Sawubona nsovo')
    });

    it('should greet any name in Sotho', function(){
        var greeter = Greeting();
        assert.equal(greeter.greetFunction('Londeka', 'Sotho'),'Dumela londeka')
            assert.equal(greeter.greetFunction('Nate', 'Sotho'), 'Dumela nate' )
            assert.equal(greeter.greetFunction('Nsovo', 'Sotho'), 'Dumela nsovo' )


    })

    it('should greet any name in English',function(){
        var greeter = Greeting();

        assert.equal(greeter.greetFunction('Londeka', 'English'),'Hello londeka')
            assert.equal(greeter.greetFunction('Nate', 'English'),'Hello nate')
            assert.equal(greeter.greetFunction('Nsovo', 'English'), 'Hello nsovo')

    })
    })

   
describe('greeting counters',function(){
    it('should not increment the counter if a name has already been greeted', function(){
        var greeter = Greeting();
        
        greeter.greetFunction('Londeka', 'Swati')
        greeter.greetFunction('Londeka', 'Swati')
        greeter.greetedFunction('Londeka')

        assert.equal(greeter.getCounter(), 1)

    })


    it('should keep a count of Swati greetings', function(){
        var greeter = Greeting();
        greeter.greetFunction('Nsovo', 'Swati')
        greeter.greetFunction('Lala', 'Swati')
        greeter.greetFunction('Nate','Swati')
        greeter.greetFunction('Londeka','Swati')
            greeter.greetedFunction('Nsovo');
            greeter.greetedFunction('Lala');
            greeter.greetedFunction('Nate');
            greeter.greetedFunction('Londeka');

        assert.equal(greeter.getCounter(), 4)
    })
    it('should keep a count of Sotho greetings', function(){
        var greeter = Greeting();
        greeter.greetFunction('Nsovo', 'English')
        greeter.greetFunction('Lala', 'English')
        greeter.greetFunction('Nate','English')
        greeter.greetFunction('Londeka','English')
            greeter.greetedFunction('Nsovo');
            greeter.greetedFunction('Lala');
            greeter.greetedFunction('Nate');
            greeter.greetedFunction('Londeka');

        assert.equal(greeter.getCounter(), 4)
    })
    
    it('should keep a count of English greetings', function(){
        var greeter = Greeting();
        greeter.greetFunction('Nsovo', 'Sotho')
        greeter.greetFunction('Lala', 'Sotho')
        greeter.greetFunction('Nate','Sotho')
        greeter.greetFunction('Londeka','Sotho')
            greeter.greetedFunction('Nsovo');
            greeter.greetedFunction('Lala');
            greeter.greetedFunction('Nate');
            greeter.greetedFunction('Londeka');

        assert.equal(greeter.getCounter(), 4)
    })

    it('should keep a count of all greetings', function(){
        var greeter = Greeting();
        greeter.greetFunction('Nsovo', 'Swati')
        greeter.greetFunction('Lala', 'Sotho')
        greeter.greetFunction('Nate','English')
        greeter.greetFunction('Londeka','Swati')
            greeter.greetedFunction('Nsovo');
            greeter.greetedFunction('Lala');
            greeter.greetedFunction('Nate');
            greeter.greetedFunction('Londeka');

        assert.equal(greeter.getCounter(), 4)
    })


})
    

describe('error messages', function(){
    it('should give an error message of "Enter a valid string(No numbers or charecters)" when an invalid input is made', function(){
        var greeter = Greeting();
        greeter.errorMessages(1234, 'Swati');
        assert.equal(greeter.getErrorMessage(), 'Enter a valid string (No numbers or charecters)')
    })
    it('should give an error message of "Please select a language" when a language is not selected', function(){
        var greeter = Greeting();
        greeter.errorMessages('Londeka' , undefined);
        assert.equal(greeter.getErrorMessage(), 'Please select a language')
    })
    it('should give an error message of "Select a language and enter a valid string (No numbers or charecters)" when a language is not selected and an input is not made', function(){
        var greeter = Greeting();
        greeter.errorMessages('' , undefined);
        assert.equal(greeter.getErrorMessage(), 'Select a language and enter a valid string (No numbers or charecters)')
    })
    


})*/




