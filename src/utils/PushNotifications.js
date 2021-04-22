const { Expo } = require('expo-server-sdk');

const sendNotifications = (passengerPushToken,driverPushToken) => {
    // alert(passengerPushToken)
    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    let messages = [];

    if (!Expo.isExpoPushToken(passengerPushToken)) {
        console.error(`Push token ${passengerPushToken} is not a valid Expo push token`);
        return false
    }
    if (!Expo.isExpoPushToken(driverPushToken)) {
        console.error(`Push token ${driverPushToken} is not a valid Expo push token`);
        return false
    }

    messages.push({
        to: passengerPushToken,
        sound: 'default',
        title: "Request Approval",
        body: 'Hello Masiko, your request has been approved ',
        data: { withSome: 'data' },
    })

    messages.push({
        to: driverPushToken,
        sound: 'default',
        title: "New Trip",
        body: 'Hello Driver, a new Trip has been assigned to you ',
        data: { withSome: 'data' },
    })

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {

        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();

    // alert(passengerPushToken)
}


module.exports={sendNotifications}




