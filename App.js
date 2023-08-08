import { StatusBar } from 'expo-status-bar';
import * as Notification from 'expo-notifications' 
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect } from 'react';
import Constants from 'expo-constants'
import Input from './Input';


const allowsNotificationsAsync = async () => {
  const settings = await Notification.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notification.IosAuthorizationStatus.PROVISIONAL
  );
};
 
const requestPermissionsAsync = async () => {
  return await Notification.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};


Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound:false,
      shouldSetBadge: false,
      
    }
  }
})

export default function App() {

  useEffect(() => {
    const setUpPushNotification = async () => {
      const hasPushNotificationPermissionGranted = await allowsNotificationsAsync();

      if (!hasPushNotificationPermissionGranted) {
        await requestPermissionsAsync();
      }
      Notification.getExpoPushTokenAsync({projectId:Constants.manifest2.id})
      .then((pushNotification) => {
        console.log("Push Token : ", pushNotification)
      })
      .catch(err => console.log("Error",err))
    }
    setUpPushNotification()
  },[])

  const onScheduleNotification = async () => {


    Notification.scheduleNotificationAsync({
      content:{
        title:"My first notification",
        body:"This is body of notification",
        data:{
          userId:"psammy171"
        }
      },
      trigger:{
        seconds:2,
      }
    })
  }


  useEffect(() => {
    const subscription1 = Notification.addNotificationReceivedListener((notification) => {
      const data = notification.request.content.data
      // console.log("Notification received")
      // console.log(notification.request.content.data)
    })

    const subscription2 = Notification.addNotificationResponseReceivedListener((responsee) => {
      console.log(responsee.notification.request.content.data)

    })

    return () => {
      subscription1.remove()
      subscription2.remove()
    }
  },[])

  return (
    <View style={styles.container}>
      <Button title={"Schedule notification"} onPress={onScheduleNotification} />
      <StatusBar style="auto" />
      <Input/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
