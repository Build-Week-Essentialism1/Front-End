import React from 'react'
import ValueList from './ValueList'

function Dashboard() {

    const handleGoToValues = e => ( <ValueList />)
        
  
    return (
    <div>
        <h1>Essentialism</h1>
        <header className="avatarImgs">
            <img src="img_avatar.png" alt="Avatar" class="avatar" />
            <img src="assets/img_avatar2.png" alt="Avatar" class="avatar" />
        </header> 
            <p>If there's one thing you should take from this app,<br/>
                remember, whatever challenge you face in life,<br/>
                If you don't prioritize yourself, someone else will.
            </p><br/>
            {/* onCLick go to ValueList */}
            <button className="toValues" onClick={() => handleGoToValues}>My Values List</button>
            
    </div>
    )
}

export default Dashboard
