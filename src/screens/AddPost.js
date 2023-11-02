import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import WrapperComponent from '../components/WrapperComponent';
import Header from '../components/Header';
import strings from '../constants/lang';
import {moderateScale, width} from '../assets/scaling';
import colors from '../constants/colors';
import {useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faCross,
} from '@fortawesome/free-solid-svg-icons';
import MultiLineTextInput from '../components/MultiLineTextInput';

const AddPost = ({navigation, route}) => {
  const {isDark, language} = useSelector(state => state?.appSettings);

  const [images, setImages] = React.useState(route.params.selectedImages || []);

  const onPlus = () => {
    if (images.length >= 4) {
      return showMessage({
        message: 'You can select maximum 4 images',
        type: 'danger',
        icon: 'danger',
      });
    }

    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      multiple: true,
      maxFiles: 4 - images.length,
    })
      .then(i => {
        if (i.length + images.length > 4) {
          return showMessage({
            message: 'You can select maximum 4 images',
            type: 'danger',
            icon: 'danger',
          });
        }
        setImages([...images, ...i]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onRemove = index => {
    let cloneImages = [...images];
    cloneImages.splice(index, 1);
    setImages(cloneImages);
  };

  const renderItem = ({item, index}) => {
    // const onSelect = () => {
    //   let clonePhotos = [...photos];
    //   clonePhotos[index].node.isSelected = !clonePhotos[index].node.isSelected;
    //   setPhotos(clonePhotos);
    //   setSelectedImage(clonePhotos[index].node.image.uri);
    //   setSelectedImages(clonePhotos.filter(item => item.node.isSelected));
    // }

    return (
      <View
        // onPress={}
        style={{marginRight: moderateScale(10)}}>
        <Image
          source={{uri: item?.node?.image?.uri || item?.path}}
          style={{
            width: width / 4,
            height: width / 4,
            borderRadius: moderateScale(10),
          }}
        />

        <TouchableOpacity
          onPress={() => onRemove(index)}
          style={{
            position: 'absolute',
            top: moderateScale(-5),
            right: moderateScale(-5),
          }}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size={moderateScale(20)}
            color={colors.button}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <WrapperComponent>
      <Header showTitle title={strings.ADD_INFO} />
      <View style={{padding: moderateScale(16)}}>
        <FlatList
          data={images}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{padding: moderateScale(5)}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <TouchableOpacity
              onPress={onPlus}
              style={{
                width: width / 4,
                height: width / 4,
                borderRadius: moderateScale(10),
                backgroundColor: colors.gray,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(30),
                  color: isDark ? colors.white : colors.black,
                }}>
                +
              </Text>
            </TouchableOpacity>
          }
        />
        <MultiLineTextInput multiline placeholder={strings.ADD_DESCRIPTION} />
      </View>
    </WrapperComponent>
  );
};

export default AddPost;
