
const handleAddUser = (event) => {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const user = { name, email };

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Response from server:', data);
      if (data.id) {
        alert('User added successfully');
        form.reset();
      }
    })
    .catch((error) => console.error('Error:', error));
};
