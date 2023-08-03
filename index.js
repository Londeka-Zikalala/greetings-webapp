import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3011;

//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//handlebars engine
app.use(engine , 'express-handlebars');
app.set('view engine', 'handlebars');
app.set('views', './views');
//public static
app.use(express.static('public'));

//root route
app.get('/', (req,res)=>{
    res.render('index',{title: 'Greetings App'})
});

app.listen(PORT =>{
    console.log('Server started on port ${PORT}')
});
