import { View, Text } from 'react-native'
import React from 'react'
import WrapperComponent from '../components/WrapperComponent'
import Header from '../components/Header'
import strings from '../constants/lang'

const CreatePost = () => {
  return (
    <WrapperComponent>
      <Header backBtnDisabled showTitle title={strings.CREATE_POST} rightText={'Save'}  />
    </WrapperComponent>
  )
}

export default CreatePost