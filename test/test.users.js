import assert from "assert"
import usersTable from "../service/users.js"



   
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

    let result = await user.greetedFunction(name, language);
    let userCount = await user.getUserCount(name);
    let counter = user.getCounter();

    assert.isTrue(result);
    assert.equal(userCount, 1);
    assert.equal(counter, 1);
 

    })

    it('should keep count of existing user greetings', async function(){
        let name = 'Londeka';
        let language = 'Sotho';
     
        await user.greetedFunction(name,language);
        assert.equal(await user.getUserCount(name), 1)
       
    })


    it('should get a list of greeted names', async function(){
        let name1 = 'Londeka';
        let name2 = 'Kelly'
        let language = 'Sotho';
        
            await user.greetedFunction(name1,language);
        await user.greetedFunction(name2,language);

        assert.deepEqual(await user.getGreetedName(), ['londeka', 'kelly'])
       
        
    })

    it('should reset the data',async function(){
           let name1 = 'Londeka';
        let name2 = 'Kelly'
        let language = 'Sotho';
       
            await user.greetedFunction(name1,language);
        await user.greetedFunction(name2,language);
       let userCount = await user.getUserCount(name);
        await user.reset()
        assert.equal(userCount, 0);
        
       
        
       
    })
    
    after(function(){
        db.$pool.end
    })
    
})
    

