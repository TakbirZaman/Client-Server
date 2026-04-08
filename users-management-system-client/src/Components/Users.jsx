const Users = () => {

  const handleAddUser = e => {
    // Prevent the default form submission behavior
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    console.log(user);

    // Create user in the server
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log('data after post', data);
        // Optionally clear the form after submitting
        e.target.reset(); 
      })
      .catch(error => console.error("Error adding user:", error));
  };

  return (
    <div>
      <h2>Add a New User</h2>
      {/* The form calls handleAddUser when submitted */}
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <br /><br />
        <input type="email" name="email" placeholder="Email" required />
        <br /><br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Users;
