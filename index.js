import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import Greeting from './js/greetings.js';

const app = express();
const PORT = process.env.PORT || 3000;
const greeting = Greeting();

//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//handlebars engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//public static
app.use(express.static('public'));

//root route  
app.get('/', (req,res)=>{
    res.render('index')
});

app.post('/', (req,res) => {
    const name = req.body.name;
    const language = req.body.chooseLanguage;
    const message = greeting.greetFunction(name, language);
    res.render('index',{
        message})
});

app.post('/greet', (req,res) => {
    const name = req.body.name;
    const language = req.body.chooseLanguage;
    const message = greeting.greetFunction(name, language);
    const timesGreeted = greeting.getCounter()
    res.render('index', {
        name,
        timesGreeted,
        message
    })
});



app.listen(PORT,  () =>{
    console.log(`Server started on port ${PORT}`)
});
