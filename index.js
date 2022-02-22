const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); // string er data json e convert kore post er jonno available rakhbe

const port = process.env.PORT || 5000;

// user : foodMaster
// password : brOOnhzmP4XQNavA



const uri = "mongodb+srv://foodMaster:brOOnhzmP4XQNavA@cluster0.ezng0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const database = client.db("foodDelivery");
    const usersCollection = database.collection("users");
    const foodsCollection = database.collection("foods");
    // create a document to insert
    const doc = {
      name: "Kacchi",
      price: 420,
      description: "The food is tasty, You can try!",
    }
    const result = await foodsCollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);



// client.connect(err => {
//   const collection = client.db("databaseName").collection("users");
//   // perform actions on the collection object
//   console.log('Hitting the database');
//   const user = { name: 'Mahiya Mahi', email: "mahi@gmail.com", phone: '0155555555' };
//   collection.insertOne(user)
//     .then(() => {
//     console.log('insert successfully');
//   })
//   // client.close();
// });


// practice part

// const userstest = [
//     {id: 1, name: 'abc', email:'abc@gmail.com'},
//     {id: 2, name: 'def', email:'abc@gmail.com'},
//     {id: 3, name: 'zxvc', email:'abc@gmail.com'},
// ]

// // use query parameter
// app.get('/userstest', (req, res) => {
//     const search = req.query.search;
    
//     if (search) {
//         const searchResult = userstest.filter(user => user.name.toLocaleLowerCase().includes(search));
//         res.send(searchResult)
//     }
//     else {
//         res.send(userstest);
//     }
// })

// app.post('/userstest', (req, res) => {
//     const newUser = req.body;
//     newUser.id = userstest.length;
//     userstest.push(newUser);
//     res.json(newUser);
//     res.send("hitted")
//     console.log("inside the post", req.body);
// })

// app.get('/userstest/:id', (req, res) => {
//     // console.log(req.params.id);
//     const id = req.params.id;
//     const user = users[id];
//     res.send(user);
// })

app.get('/', (req, res) => {
    res.send("Hello from node,js");
});

app.listen(port, () => {
    console.log('listening at ', port);
});