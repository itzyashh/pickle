import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useCallback } from 'react'
import WrapperComponent from '../components/WrapperComponent'
import Header from '../components/Header'
import { FlashList } from '@shopify/flash-list'
import { moderateScale, verticalScale } from '../assets/scaling'
import colors from '../constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faLink, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import fontFamily from '../assets/fonts/fontFamily'
import strings from '../constants/lang'
import { styles } from './styles/editProfileStyle'
import CustomModal from '../components/CustomModal'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'

const Links = () => {
  const {isDark,language} = useSelector(state => state?.appSettings)
    const [addLinksModal, setAddLinksModal] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const renderItem = useCallback( ({ item }) => (
    <View style={style.itemStyle}>
    <View style={{flex:0.1}}>
        <FontAwesomeIcon icon={faLink} size={moderateScale(20)} color={isDark?colors.white:colors.black} />

    </View>
    <View style={{flex:0.8}}>
         <Text numberOfLines={1} style={{color:colors.blue}}>https://www.youtube.com/watch?v=f_rahNNVDQ8&t=3104s</Text>

    </View>
        <FontAwesomeIcon icon={faChevronRight} size={moderateScale(20)} color={isDark?colors.white:colors.black} />
    </View>

          ),[])


  return (
    <WrapperComponent>
        <Header showTitle title={strings.ADD_LINKS} />
        <View style={{flex:1,padding:moderateScale(16)}}>
        <Pressable onPress={()=>setAddLinksModal(true)} style={[style.itemStyle,{justifyContent:'flex-start',gap:moderateScale(30)}]}>
            <FontAwesomeIcon icon={faPlus} size={moderateScale(20)} color={isDark?colors.white:colors.black} />
            <Text style={[{color:isDark?colors.white:colors.black,marginVertical:verticalScale(20)},style.title]}>{strings.ADD_LINKS}</Text>
        </Pressable>
            <FlashList
                data={[{}, {}, {}]}
                renderItem={renderItem}
                estimatedItemSize={200}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={()=><View style={style.seperator} />}
                />
        </View>
        <CustomModal
        style={{margin:0,justifyContent:'flex-end'}}
        isVisible={addLinksModal}
        avoidKeyboard
        onBackdropPress={()=>setAddLinksModal(false)}
        key={'1'}
        >
      
          <View style={[styles.modalView,{backgroundColor:isDark?colors.theme:colors.themeLight}]}>
          <View style={{gap:verticalScale(10),marginBottom:verticalScale(15)}}>

          <CustomTextInput onChangeText={setTitle} placeholder={strings.TITLE}  />
        <CustomTextInput onChangeText={setUrl} placeholder={strings.ADD_URL}  />
          </View>

          <CustomButton title={strings.NEXT} onPress={()=>{}}/>
          </View>
        </CustomModal>
    </WrapperComponent>
  )
}

export default Links

const style = StyleSheet.create({
    itemStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    seperator:{
        flex:1,
        height:moderateScale(1),
        backgroundColor:colors.grayO50,
        width:'100%',
        alignSelf:'flex-end',
        marginVertical:moderateScale(12)
      },
      title:{
          fontSize:moderateScale(16),
          fontFamily:fontFamily.semiBold,

      }

})