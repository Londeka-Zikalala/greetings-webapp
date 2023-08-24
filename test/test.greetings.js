import assert from "assert";
import Greeting from "../js/greetings.js";
import usersTable from "../service/users.js"
import pgPromise from "pg-promise";
const pgp = pgPromise();
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products_test';

const db = pgp(connectionString);

describe('The greetings function', function(){
  const greeter = Greeting();

    it('should input word strings only', function(){
       
        let invalid = 256
        assert.equal(greeter.inputString(invalid), false)
    })
    it('should recognise "john" and "John" as the same name', function(){
 
        var name = 'John'
        var name2 = 'john'
        assert.equal(greeter.inputString(name), 'john')
        assert.equal(greeter.inputString(name2), 'john')

    })
    it('should greet any name in Swati', function(){
       
        assert.equal(greeter.greetFunction('Londeka', 'Swati'), 'Sawubona londeka' )
        assert.equal(greeter.greetFunction('Nate', 'Swati'),'Sawubona nate' )
        assert.equal(greeter.greetFunction('Nsovo', 'Swati'),  'Sawubona nsovo')
    });

    it('should greet any name in Sotho', function(){
  
        assert.equal(greeter.greetFunction('Londeka', 'Sotho'),'Dumela londeka')
            assert.equal(greeter.greetFunction('Nate', 'Sotho'), 'Dumela nate' )
            assert.equal(greeter.greetFunction('Nsovo', 'Sotho'), 'Dumela nsovo' )


    })

    it('should greet any name in English',function(){
        

        assert.equal(greeter.greetFunction('Londeka', 'English'),'Hello londeka')
            assert.equal(greeter.greetFunction('Nate', 'English'),'Hello nate')
            assert.equal(greeter.greetFunction('Nsovo', 'English'), 'Hello nsovo')

    })
    })

   
describe('The users Table', async function(){
    let user = usersTable(db);
    beforeEach(async function(){
        await db.none("delete from users")
        await user.reset();
    })
    done();

    it('should add a new user and increment the greet count',async function(){
        
    let name = 'Londeka';
    let language = 'Sotho';
try{
    let result = await user.greetedFunction(name, language);
    let userCount = await user.getUserCount(name);
    let counter = user.getCounter();

    assert.isTrue(result);
    assert.equal(userCount, 1);
    assert.equal(counter, 1);
        
} catch(error){
    throw error
}

    })

    it('should keep count of existing user greetings', async function(){
        let name = 'Londeka';
        let language = 'Sotho';
       try{
        await user.greetedFunction(name,language);
        assert.equal(await user.getUserCount(name), 1)
       } catch(error){
        throw error
       }
    })


    it('should get a list of greeted names', async function(){
        let name1 = 'Londeka';
        let name2 = 'Kelly'
        let language = 'Sotho';
        try{
            await user.greetedFunction(name1,language);
        await user.greetedFunction(name2,language);

        assert.deepEqual(await user.getGreetedName(), ['londeka', 'kelly'])
        }catch(error){
            throw error
        }
        
    })

    it('should reset the data',async function(){
           let name1 = 'Londeka';
        let name2 = 'Kelly'
        let language = 'Sotho';
        try{
            await user.greetedFunction(name1,language);
        await user.greetedFunction(name2,language);
       let userCount = await user.getUserCount(name);
        await user.reset()
        assert.equal(userCount, 0);
        
        }catch(error){
            throw error
        }
        
       
    })
    
    after(function(){
        db.$pool.end
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
    


})




