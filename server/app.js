const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/resolvers/index')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const { GraphQLInputObjectType } = require('graphql');

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
app.use(express.json())

app.use('/graphql', graphqlHTTP(req => {
  return ({
    schema,
    graphiql: true,
  })
}));

//////////photoUpload

app.use(fileUpload())
app.use(express.static('./public'))

app.post('/uploads', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'no file uploaded' })
  }

  console.log(req.files.file);

  const file = req.files.file
  file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${ file.name}` })
  })
})

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
