import React from "react";
import ValueList from "./ValueList";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const handleGoToValues = (e) => <ValueList />;
  const { push } = useHistory();

  return (
    <div>
      <h1>Essentialism</h1>
      <header className="avatarImgs">
        <img src="img_avatar.png" alt="Avatar" class="avatar" />
        <img src="assets/img_avatar2.png" alt="Avatar" class="avatar" />
      </header>
      <p>
        If there's one thing you should take from this app,
        <br />
        remember, whatever challenge you face in life,
        <br />
        If you don't prioritize yourself, someone else will.
      </p>
      <br />
      {/* onCLick go to ValueList */}
      <button className="toValues" onClick={() => push("essentialism")}>
        My Values List
      </button>
    </div>
  );
}

export default Dashboard;
