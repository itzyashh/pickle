import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { moderateScale, verticalScale, } from "../../assets/scaling";

export const styles = StyleSheet.create({
    iconContainer:{
        padding:moderateScale(8),
        borderRadius:moderateScale(20),
        backgroundColor:colors.theme,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:0,
        bottom:moderateScale(10)
    },
    container:{
        marginTop:verticalScale(30),
        gap:verticalScale(20),
        marginHorizontal:moderateScale(20)
    },

})