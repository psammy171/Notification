import { useRef, useState } from "react";
import { TextInput, View, Animated, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
    st:{
        borderWidth:1,
        borderBottomWidth:3,
        height:50,
        width:'80%',
        borderRadius:8,
    },
    onFocus:{

    }
})

const Input = () => {

    const [animation, setAnimation] = useState(new Animated.Value(0))
      
    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:["rgb(0,0,0)" , "rgb(17,113,13)"]
      })

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        console.log("Called")
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      };
    
      const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(animation, { 
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      };

    return (
        <View style={{width:'80%', flex:1,justifyContent:'center',alignItems:'center'}}>
            <Animated.View style={[styles.st,{borderColor:boxInterpolation}]}>
                <TextInput
                    onFocus={fadeIn}
                    onBlur={fadeOut}
                    style={{width:'100%',height:50}}/>
            </Animated.View>
            <TextInput style={{height:50,width:'100%', backgroundColor:'red'}}/>
        </View>
    )
}

export default Input;