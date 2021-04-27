const {sendNotifications} = require('./src/utils/PushNotifications');

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  sendNotifications(req.body.ExpoToken,req.body.driverToken)
  res.send(
    `Notification sent`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));