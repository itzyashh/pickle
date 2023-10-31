import {View, Text, PermissionsAndroid, Platform, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import WrapperComponent from '../components/WrapperComponent';
import Header from '../components/Header';
import strings from '../constants/lang';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import CustomButton from '../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {FlashList} from '@shopify/flash-list';
import {height, moderateScale, width} from '../assets/scaling';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../navigation/routes';
import colors from '../constants/colors';

const CreatePost = ({navigation}) => {
  const [photos, setPhotos] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedImages, setSelectedImages] = React.useState([]);
  console.log('photos', photos);
  console.log('selectedImages', selectedImages);
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function getPicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        console.log('r', r);
        let data = r.edges.reverse();
        setPhotos(data);
        setSelectedImage(data[0]?.node.image.uri);
      })
      .catch(err => {
        //Error Loading Images
        console.log('err', err);
      });
  }

  useEffect(() => {
    getPicture();
  }, []);

  const onNext = () => {
    navigation.navigate(routes.addPost, {selectedImages});
  }

  const onCameraPress = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const listHeaderComponent = () => {
    if (!photos || photos.length === 0) {
      return null;
    }
    return (
      <Image
        source={{uri: selectedImage}}
        style={{
          width: width,
          height: width / 2,
        }}
      />
    );
  };

  const renderItem = ({item,index}) => {

    const onSelect = () => {
      let clonePhotos = [...photos];
      clonePhotos[index].node.isSelected = !clonePhotos[index].node.isSelected;
      setPhotos(clonePhotos);
      setSelectedImage(clonePhotos[index].node.image.uri);
      setSelectedImages(clonePhotos.filter(item => item.node.isSelected));
    }

    return (
      <TouchableOpacity
        onPress={onSelect}
      >
        <Image
          source={{uri: item.node.image.uri}}
          style={{
            width: width / 4,
            height: width / 4,
          }}
        />{
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
        />}
      </TouchableOpacity>
    );
  };

  return (
    <WrapperComponent>
      <Header
        backBtnDisabled
        showTitle
        title={strings.CREATE_POST}
        rightText={strings.NEXT}
        onRightPress={onNext}
      />
      <FlashList
        data={photos}
        numColumns={4}
        horizontal={false}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        // ListHeaderComponentStyle={{ marginBottom:moderateScale(20) }}
        keyExtractor={(item, index) => item.node.timestamp + index}
        estimatedItemSize={80}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(100),
          paddingTop: moderateScale(20),
          paddingHorizontal: moderateScale(10),
        }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: moderateScale(20),
          right: moderateScale(20),
          width: moderateScale(60),
          height: moderateScale(60),
          borderRadius: moderateScale(30),
          backgroundColor: colors.button,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontAwesomeIcon icon={faCamera} size={moderateScale(30)} color={colors.white} />
      </TouchableOpacity>
    </WrapperComponent>
  );
};

export default CreatePost;
