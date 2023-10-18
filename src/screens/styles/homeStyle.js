import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { moderateScale } from "../../assets/scaling";
import fontFamily from "../../assets/fonts/fontFamily";



export const styles = StyleSheet.create({
    box: {
         backgroundColor:colors.grayO50,
            padding:moderateScale(10),
            margin:moderateScale(10),
            borderRadius:moderateScale(10),
    },
    name:{
        fontFamily:fontFamily.bold,
        fontSize:moderateScale(15),
        fontWeight:'bold',
    },
});