const handleUpdateUser = e => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  
  // Package the extracted data into an object
  const updatedUser = { name, email };
  console.log("Sending data to server:", updatedUser);

  // Update user info in the DB
  // NOTE: Use backticks (`) for template literals to inject ${user._id}
  fetch(`http://localhost:3000/users/${user._id}`, {
    method: 'PUT', // Specify the update method
    headers: {
      'Content-Type': 'application/json' // Tell the server to expect JSON data
    },
    body: JSON.stringify(updatedUser) // Convert the JavaScript object to a JSON string
  })
    .then(res => res.json())
    .then(data => {
      console.log('Update success:', data);
      
      // If MongoDB successfully updated the document, it returns modifiedCount > 0
      if (data.modifiedCount > 0) {
        alert("User updated successfully!");
        // Optional: You might want to refresh the UI or redirect the user here
      }
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
}

// ... your component code ...

return (
  <div>
    <h2>Update User</h2>
    {/* Make sure your form calls the function on submit */}
    <form onSubmit={handleUpdateUser}>
      <input type="text" name="name" defaultValue={user?.name} required />
      <br />
      <input type="email" name="email" defaultValue={user?.email} required />
      <br />
      <button type="submit">Update</button>
    </form>
  </div>
);cd