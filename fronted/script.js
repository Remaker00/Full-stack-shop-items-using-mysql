const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');

userForm.addEventListener('submit', handleSubmit);

let editingUserId = null;
async function handleSubmit(event)  {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const des = document.getElementById('des').value;
    const price = document.getElementById('price').value;
    const quan = document.getElementById('quan').value;

    const userData = {name,des,price,quan};

    try {
        if (editingUserId) {
            //const updatedData = {name,des,price,quan};
            await fetch(`/api/users/${editingUserId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            editingUserId = null; // Clear editing state after update
        } else {
            await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        }    

        // Clear form fields
        userForm.reset();

        // Refresh user list
        fetchUsers();
    } catch (error) {
        console.error('Error:', error);
    }
};

async function fetchUsers() {
    await fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.des} - ${user.price} - ${user.quan}  `;
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    editUser(user.id, user.name, user.des, user.price, user.quan);
                });
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteUser(user.id);
                });
                const buy1Button = document.createElement('button');
                buy1Button.textContent = 'Buy1';
                buy1Button.addEventListener('click', () => {
                    buy1User(user.id, user.quan);
                });
                li.appendChild(deleteButton);
                li.appendChild(editButton);
                li.appendChild(buy1Button);
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Refresh user list
            fetchUsers();
        } else {
            console.error('Error deleting user.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editUser(userId, name, des, price, quan) {

    try {
        if (userId) {
            document.getElementById('name').value = name;
            document.getElementById('des').value = des;
            document.getElementById('price').value = price;
            document.getElementById('quan').value = quan;
        
            editingUserId = userId;
        } else {
            console.log("Error while fetching data");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function buy1User(userId, quan) {
    try {
        if(userId && quan) {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quan: quan - 1 })
            });

            if (response.ok) {
                // Refresh user list
                fetchUsers();
            } else {
                console.error('Error updating user quantity.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

fetchUsers();
