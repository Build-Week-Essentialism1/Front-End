import React from 'react'

const initialFormValues = {
    username: '',
    password: '',
    email:''
}

const initialFormErrors = {
    username: '',
    password: '',
    email:''
}

function Register() {
    return (
        <div className="login">
            <form>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        required
                    // value=""
                    // onChange=""
                    />
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                    // value=""
                    // onChange=""
                    />
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        
                    // value=""
                    // onChange=""
                    />
                </div>
            </form>
        </div>
    )
}

export default Register
