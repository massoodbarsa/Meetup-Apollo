const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/resolvers/index')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

mongoose.set('useFindAndModify', false);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use('/graphql', graphqlHTTP(req => {
  return ({
    schema,
    graphiql: true,
  })
}));

//////////photo
const multer = require('multer')
const path = require('path')
const router = express.Router()


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
}).single('myImage')

//public folder
app.use(express.static('./public'))
app.get('/', (req, res) => {
  console.log('ridi');
})

router.post('/upload',(req,res,next)=>{

})
////////////
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.rkikv.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(4000, () => {
      console.log(`'Connected to '${process.env.DB}`);
    })
  }).catch(err => {
    console.log(err);
  })
