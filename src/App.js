import "./App.css";
import Fader from "./Components/Fader";

import React, { useState } from "react";
import { onMessageListener } from "../src/FirebaseInit";
import Notifications from "./Components/Notifications/Notifications";
import ReactNotificationComponent from "./Components/Notifications/ReactNotification";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  console.log(show, notification);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
      <Fader text="Hello React"></Fader>
    </div>
  );
}

export default App;