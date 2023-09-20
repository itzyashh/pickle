import { SafeAreaView, StyleSheet,  View } from 'react-native'
import colors from '../constants/colors'
import { useSelector } from 'react-redux'

const WrapperComponent = ({style={},children}) => {
  const isDark = useSelector(state => state?.appSettings?.isDark)
  console.log('isDark',isDark);

  return (
    <View style={[styles.container,true&&{backgroundColor:colors.white}]}>
    <SafeAreaView style={{flex:1}} >
        {children}
    </SafeAreaView>
    </View>
  )
}

export default WrapperComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.theme,      
    }
})