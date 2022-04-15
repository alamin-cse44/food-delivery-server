const express = require('express');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); // string er data json e convert kore post er jonno available rakhbe


// user : foodMaster || ${process.env.DB_USER}
// password : brOOnhzmP4XQNavA || ${process.env.DB_PASS}



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ezng0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const database = client.db("foodDelivery");
    const foodsCollection = database.collection("foods");

    // -------------  Food Adding Start -----------
    // POST FOR ADD FOODS
    app.post('/foods', async (req, res) => {
      const newFood = req.body;
      const result = await foodsCollection.insertOne(newFood);
      console.log('added food', result);
      res.json(result);
    });

    // GET FOR FOODS
    app.get('/foods', async (req, res) => {
      const cursor = foodsCollection.find({});
      const foods = await cursor.toArray();
      res.send(foods);
    })
    
  } finally {
    // await client.close();
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