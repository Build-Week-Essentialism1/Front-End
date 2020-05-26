import React, { useState } from 'react'

const initialFormValues = {
    username: '',
    password: ''
}

const initialFormErrors = {
    username: '',
    password: ''
}

function LogIn() {
    return (
        <div className="login">
            <form>
                 <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        // value=""
                        // onChange=""
                    />
                 </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                    // value=""
                    // onChange=""
                    />
                </div>
                 
            </form>
        </div>
    )
}

export default LogIn
