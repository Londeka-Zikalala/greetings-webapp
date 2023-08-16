import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './db.js';
import Greeting from './js/greetings.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const greeting = Greeting();


//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//handlebars engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//public static
app.use(express.static('public'));


//root route 


app.get('/', (req, res) => {
    res.render('index')
    
});


app.post('/greet', async (req, res) => {
    const name = req.body.name;
    const language = req.body.chooseLanguage;

    const message = greeting.greetFunction(name, language);

        greeting.greetedFunction(name)

    try{ 
            await db.none('UPDATE users SET timesgreeted = timesgreeted + 1 WHERE  name =$1', name)


    } catch (error){
        console.error('Error updating user data:', error);
    };

        greeting.errorMessages(name, language)
    const  timesGreeted = greeting.getCounter();
    let errorMessage= greeting.getErrorMessage()

    
    
    res.render('index', {
        name: '',
        timesGreeted,
        message,
        errorMessage,
       

    })
});

app.get('/counter/:name',async (req, res) => {
    const name = req.params.name;

    try{
        const userData = await db.oneOrNone('SELECT  timesgreeted FROM greetings_schema.users WHERE name = $1', name);
        const timesGreeted = userData ? userData.timesGreeted:0;
        res.render('counter',{
            name,
            timesGreeted
        });

    } catch (error){
        console.error('Error fetching user data:', error);
        res.render('counter',{
            name,
            timesGreeted:0
        });
    };
    
    /*const timesGreeted = greeting.getUserCount(name);
    res.render('counter', {
        name,
        timesGreeted
    })*/
    
})


app.get('/greeted', async (req, res) => {

        try{
            const greetedName = await db.any('SELECT name FROM greetings_schema.users');
            res.render('greeted',{
                greeted: greetedName
            })
        }   catch (error){
            console.error('Error fetching greeted name:', error);
            res.render('greeted',{
                greeted:''
            });
        };

    /*const greeted = greeting.getGreetedName();

    res.render('greeted', {
        greeted
    })*/
});

app.post('/reset', (req, res) => {
    greeting.reset()

    res.render('index')
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
