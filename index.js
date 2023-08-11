import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Greeting from './js/greetings.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const greeting = Greeting();

const databaseUrl = process.env.DATABASE_URL;


//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//handlebars engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//public static
app.use(express.static('public'));

function errorMessageMiddleware(req, res, next){
    const name = req.body.name;
    const language = req.body.chooseLanguage;
    let errorMessage = greeting.greetFunction(name, language)

    if(!name && language=== null ){
        res.locals.errorMessage = errorMessage;
        setTimeout(()=>{
            res.locals.errorMessage = '';
            next();
        }, 2000);
    } else{
        next();
    }
};
//root route  
app.get('/', errorMessageMiddleware, (req, res) => {
    res.render('index')
});


app.post('/greet', errorMessageMiddleware, (req, res) => {
    const name = req.body.name;
    const language = req.body.chooseLanguage;
    const message = greeting.greetFunction(name, language);
    let errorMessage = greeting.greetFunction(name, language);

    if (name && language==!null ) {

        greeting.greetedFunction(name)

    };

    const timesGreeted = greeting.getCounter()
    res.render('index', {
        name: '',
        timesGreeted,
        message,
        errorMessage
    })
    console.log(timesGreeted)
});

app.get('/counter/:name', (req, res) => {
    const name = req.params.name;
    const timesGreeted = greeting.getUserCount(name);
    res.render('counter', {
        name,
        timesGreeted
    })
    console.log(timesGreeted)
})
app.get('/greeted', (req, res) => {

    const greeted = greeting.getGreetedName();

    res.render('greeted', {
        greeted
    })
});

app.post('/reset', (req, res) => {
    greeting.reset()

    res.render('index')
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
