import { StyleSheet } from "react-native";
import { moderateScale, scale, textScale, verticalScale } from "../../assets/scaling";
import fontFamily from "../../assets/fonts/fontFamily";

export const styles = StyleSheet.create({
    username : {
        fontSize: textScale(19),
        fontFamily:fontFamily.bold,
    },
    email : {
        fontSize: textScale(15),
        fontFamily:fontFamily.regular,
    },
    bio : {
        fontSize: textScale(14),
        fontFamily:fontFamily.regular,
        marginTop:moderateScale(15),
        paddingRight:moderateScale(55)
    },
    dashboard :{
        marginTop:verticalScale(15),
        padding:moderateScale(10),
        borderRadius:moderateScale(10),
    },
    dashboardTitle : {
        fontSize: textScale(14),
        fontFamily:fontFamily.semiBold,
    },
    dashboardText : {
        fontSize: textScale(13),
        fontFamily:fontFamily.regular,
    },
})