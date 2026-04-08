const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('users server is running');
});

const users = [
  { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
  { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
  { id: 3, name: 'Sabila', email: 'sabila@gmail.com' }
];

app.get('/users', (req, res) => {
  res.send(users); 
});

app.post('/users', (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  const newUser = users[users.length - 1];  
  res.send(newUser);
});


app.listen(port, () => {
  console.log(`Users Server running on port ${port}`);
});