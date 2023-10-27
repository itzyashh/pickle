import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'

const CustomModal = ({children,
    isVisible=false,
    onBackdropPress=()=>{},
    style={},
    ...props
    }) => {
  return (
    <ReactNativeModal
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        style={{...styles.style,...style}}
        {...props}
    >
        {children}
    </ReactNativeModal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
    style:{
    }
})