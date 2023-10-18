import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { moderateScale, moderateScaleVertical, verticalScale } from "../../assets/scaling";
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
    location:{
        fontFamily:fontFamily.regular,
        fontSize:moderateScale(12),
        color:colors.grayO50,
    },
    postImage:{
        marginTop:verticalScale(10),
        width:'100%',
        height:moderateScaleVertical(400),
        overflow:'hidden',
    },
    captionContainer:{
        marginTop:verticalScale(10),
        paddingHorizontal:moderateScale(12)
    },
    caption:{
        fontFamily:fontFamily.regular,
        fontSize:moderateScale(16),
    }
});