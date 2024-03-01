import { StyleSheet } from "react-native";
import { moderateScale, scale, textScale } from "../../assets/scaling";
import fontFamily from "../../assets/fonts/fontFamily";

export const s = StyleSheet.create({
    commentContainer: {
       flexDirection: 'row',
       padding: moderateScale(12),
       marginHorizontal: moderateScale(8),
       borderTopRightRadius: moderateScale(20),
       borderTopLeftRadius: moderateScale(20),
         borderBottomRightRadius: moderateScale(20),

        backgroundColor: 'white',


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    contentBox: {
       marginLeft: moderateScale(14),
       gap: moderateScale(2),
       flex: 1,
    },
    userInfo: {
        flexDirection: 'row',
        gap: moderateScale(8),  
    },

    name: {
        fontFamily:fontFamily.medium,
        fontSize: moderateScale(14),
    },
    time: {
        fontFamily:fontFamily.regular,
        fontSize: moderateScale(13),
        color: '#666',
    },
});