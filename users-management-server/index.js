const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
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

app.listen(port, () => {
  console.log(`Users Server running on port ${port}`);
});