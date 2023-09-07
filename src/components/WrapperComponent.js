import { SafeAreaView, StyleSheet,  View } from 'react-native'
import colors from '../constants/colors'

const WrapperComponent = ({style={},children}) => {
  return (
    <View style={styles.container}>
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