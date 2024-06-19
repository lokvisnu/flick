import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback,Animated } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
type NotificationProps = {
    notificationChild:React.ReactNode,
    autoHide:boolean,
    message:string,
    opacity:number,
    type:'INFO' | 'ERROR' | 'CUSTOM',
    position:'TOP' | 'BOTTOM' | 'CENTER',
    hide:()=>void,
}
const NotificationPanel = ({notificationChild,autoHide,message,opacity,type,position,hide}:NotificationProps)=>{
    
    const {height , width} = Dimensions.get('window');
    const AnimationValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(()=>{
        if(type === 'CUSTOM') // if type is custom
            return;
        Animated.timing(AnimationValue,{
            toValue:(position=='TOP')?40:-40,
            duration:200,
            useNativeDriver:true,
        }).start();
    },[]);

    if(type === 'CUSTOM' && !notificationChild){
        console.error('CUSTOM type notification should have a child component');
        hide();
        return null;
    }

    const styles =StyleSheet.create({
        parentContainer:{
            flex:1,
            backgroundColor:`rgba(0,0,0,${opacity})`,
            zIndex:1,
            height:height,
            width:width,
            justifyContent:'center',
            alignItems:'center',
        },
        container:{
            backgroundColor:'#FFFFFF',
            paddingVertical:5,
            paddingHorizontal:10,
            borderRadius:5,
            position:'absolute',
            transform:[{translateY:AnimationValue}],
            top:(position === 'TOP')?-10:(position === 'BOTTOM')?height-20:height/2,
            left:10,
            right:10,
            zIndex:2,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            width:(width - 20),
            elevation:5,    
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.6,
            borderLeftColor:(type === 'INFO')?'#2196F3':(type === 'ERROR')?'#F44336':'#FFEB3B',
            borderLeftWidth:5
        },
        text:{
            color:'black',
            textAlign:'center',
            fontSize:17,
            marginLeft:10,
        }
    });
  return (
    <View style={styles.parentContainer}>
      {
        (type === 'CUSTOM' &&
         notificationChild) &&
        notificationChild
      }
      {
        type !== 'CUSTOM' &&
        <Animated.View style={styles.container}>
            <TouchableWithoutFeedback onPress={hide}><Icon name={'close'} size={20} color='black'/></TouchableWithoutFeedback>
          <Text style={styles.text}>{message}</Text>
        </Animated.View>
      }
    </View>
  )
}
export default NotificationPanel;