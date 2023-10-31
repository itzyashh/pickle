import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import WrapperComponent from '../components/WrapperComponent'
import Header from '../components/Header'
import strings from '../constants/lang'
import { width } from '../assets/scaling'

const AddPost = ({navigation,route}) => {

const [images, setImages] = React.useState(route.params.selectedImages || []);

console.log('images++', images);

const renderItem = ({item,index}) => {

  // const onSelect = () => {
  //   let clonePhotos = [...photos];
  //   clonePhotos[index].node.isSelected = !clonePhotos[index].node.isSelected;
  //   setPhotos(clonePhotos);
  //   setSelectedImage(clonePhotos[index].node.image.uri);
  //   setSelectedImages(clonePhotos.filter(item => item.node.isSelected));
  // }

  return (
    <TouchableOpacity
      // onPress={}
    >
      <Image
        source={{uri: item?.node?.image?.uri || item?.path }}
        style={{
          width: width / 4,
          height: width / 4,
        }}
      />
      {/* {
      item.node.isSelected &&

      <FontAwesomeIcon
        icon={faCircleCheck}
        size={moderateScale(20)}
        color={'#fff'}
        style={{
          position: 'absolute',
          top: moderateScale(5),
          right: moderateScale(10)
        }}
      />} */}
    </TouchableOpacity>
  );
};

  return (
    <WrapperComponent>
        <Header showTitle title={strings.ADD_INFO} />
        <FlatList
          data={images}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
    </WrapperComponent>
  )
}

export default AddPost