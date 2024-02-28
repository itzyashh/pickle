import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import WrapperComponent from '../components/WrapperComponent';
import Header from '../components/Header';
import strings from '../constants/lang';
import {moderateScale, verticalScale, width} from '../assets/scaling';
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
import CustomButton from '../components/CustomButton';
import LocalHost from '../api/LocalHost';

const AddPost = ({navigation, route}) => {
  const {isDark, language} = useSelector(state => state?.appSettings);
  const [description, setDescription] = React.useState('');
  const [images, setImages] = React.useState(route.params.selectedImages || []);
  const user_id = useSelector(state => state.auth.userData._id);


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

  const onNext = async () => {
    if (images.length === 0) {
      return showMessage({
        message: 'Please select at least one image',
        type: 'danger',
        icon: 'danger',
      });
    }

    const formData = new FormData();

    formData.append('user_id', user_id);
    formData.append('description', description);
    formData.append('images', images);

    console.log('images', images);
    images.forEach((item, index) => {
      console.log('item', item?.node?.image?.uri ?? item.path)
      formData.append('file', {
        uri:   item?.node?.image?.uri ?? item.path,
        type: "image/png",
        name: `image${index}.jpg`,
      });
    } );

    console.log('formData', formData);
    try {
      const res = await LocalHost.post('/post/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res', res.data);
    } catch (error) {
      console.log('error at createPost', error);
    }
  }



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
      <View style={styles.container}>
        <View>
          <FlatList
            data={images}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{padding: moderateScale(5)}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              images.length < 4 && (
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
            )
            }
          />
          <View style={{marginTop: verticalScale(20)}}>
            <MultiLineTextInput
              onChangeText={setDescription}
              multiline
              placeholder={strings.ADD_DESCRIPTION}
            />
          </View>
        </View>
          <CustomButton
            onPress={onNext}
           title={strings.NEXT} primary />
      </View>
    </WrapperComponent>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    flex: 1,
    justifyContent: 'space-between',
  },
});
