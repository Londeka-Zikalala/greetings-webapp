import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import db from './db.js';
import dbQueries from './dbQueries.js';
import Greeting from './js/greetings.js';


const app = express();
const greeting = Greeting();
const query = dbQueries(db)


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
        let errorMessages = greeting.errorMessages(name, language)
    if(!errorMessages){
         greeting.greetedFunction(name)
       
    }
    
    const  timesGreeted = greeting.getCounter();
    let errorMessage= greeting.getErrorMessage();

        await query.updateUsers(name,language);
    
    res.render('index', {
        name: '',
        timesGreeted,
        message,
        errorMessage,
       

    })
    console.log(errorMessage, timesGreeted, message)
});

app.get('/counter/:name', async(req, res) => {
    const name = req.params.name;
    const timesGreeted= await query.getUsersCount(name);
        res.render('counter',{
            name,
            timesGreeted
        });


    });



    app.get('/greeted', async (req, res) => {
        const greeted = greeting.getGreetedName();
        console.log("Greeted Names:", greeted);
        res.render('greeted', {
            greeted
        });
    });
    

app.post('/reset', (req, res) => {
    greeting.reset()

    res.render('index')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
