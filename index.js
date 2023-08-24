import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import db from './db.js';
import usersTable from './service/users.js';
import Greeting from './js/greetings.js';


const app = express();
const greeting = Greeting();
const user = usersTable(db)


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
         await user.greetedFunction(name,language);
       
    }
    
    const  timesGreeted = user.getCounter();
    let errorMessage= greeting.getErrorMessage();

    
    res.render('index', {
        name: '',
        timesGreeted,
        message,
        errorMessage,
       

    })
});

app.get('/counter/:name', async(req, res) => {
    const name = req.params.name;
    const timesGreeted= await user.getUserCount(name)
        res.render('counter',{
            name,
            timesGreeted
        });

    });



    app.get('/greeted', async (req, res) => {
        const greeted = await user.getGreetedName();
        res.render('greeted', {
            greeted
        });
    });
    

app.post('/reset', async (req, res) => {
  
    try {
        await user.reset();
        res.status(200).send('Reset successful');
      } catch (error) {
        console.error('Error resetting data', error);
        res.status(500).send('Error resetting data');
      }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
