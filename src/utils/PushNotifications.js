const { Expo } = require('expo-server-sdk');

const sendNotifications = (pushToken) => {
    // alert(pushToken)
    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    let messages = [];

    if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        return false
    }

    messages.push({
        to: pushToken,
        sound: 'default',
        title: "Request Approval",
        body: 'Hello Masiko, your request has been approved ',
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

    // alert(pushToken)
}


module.exports={sendNotifications}




