import React, { useState } from 'react'

const initialLogInValues = {
    username: '',
    password: ''
}

const initialLogInErrors = {
    username: '',
    password: ''
}

function LogIn() {

    const [user, setUser] = useState({ username: "", password: "" });
    
    // Event Handlers
    const handleChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    // onSubmit function
    const handleSubmit = event => {
        event.preventDefault();
        console.log(user.name);
        console.log(user.password);
    };

    return (
        <div className="login">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                 </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                
                <button>Submit</button>

            </form>
        </div>
    )
}

export default LogIn
