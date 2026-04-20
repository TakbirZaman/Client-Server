const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String (এখানে আপনার আসল URI বসাবেন)
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Database এবং Collection সিলেক্ট করা
    const database = client.db("myTodoDB"); // আপনার ডাটাবেসের নাম
    const usersCollection = database.collection("users"); 

    // 0. READ: Get all users from Database
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // 1. CREATE: Add a new user
    app.post('/users', async (req, res) => { 
      try {
        const newUser = req.body; 
        const result = await usersCollection.insertOne(newUser); 
        res.send(result); 
      } catch (error) {
        res.status(500).send({ message: "Error creating user", error });
      }
    });

    // 2. UPDATE: Modify an existing user by ID
    app.put('/users/:id', async (req, res) => { 
      try {
        const id = req.params.id; 
        const filter = { _id: new ObjectId(id) }; 
        const updatedData = req.body; 
        
        const updateDoc = {
          $set: {
            ...updatedData 
          },
        };
        
        const result = await usersCollection.updateOne(filter, updateDoc); 
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error updating user", error });
      }
    });

    // 3. DELETE: Remove a user by ID
    app.delete('/users/:id', async (req, res) => { 
      try {
        const id = req.params.id; 
        const query = { _id: new ObjectId(id) }; 
        
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error deleting user", error });
      }
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
      console.log(error);
  }
}

// ফাংশনটি কল করা হচ্ছে
run().catch(console.dir);


// Basic test route
app.get('/', (req, res) => {
  res.send('Users server is running');
});

app.listen(port, () => {
  console.log(`Users Server running on port ${port}`);
});