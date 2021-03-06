import { React, useState } from 'react'
import { View, Button, Image } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

import ImageCropper from './ImageCropper'

const ImagePicker = () => {
    const [image, setImage] = useState({ uri: '' })
    const [isCropping, setIsCropping] = useState(false)

    const takePhoto = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            cameraType: 'front',
            includeBase64: false,
        }

        const result = await launchCamera(options)

        if (!result.didCancel && !result.errorCode) {
            setImage(result.assets[0])

            setIsCropping(true)
        }
    }

    const selectFromGallery = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        }

        const result = await launchImageLibrary(options)

        if (!result.didCancel && !result.errorCode) {
            setImage(result.assets[0])

            setIsCropping(true)
        }
    }

    const cropImage = async () => {
        if (image.uri !== '') {
            const manipResult = await manipulateAsync(
                image.uri,
                [
                    {
                        crop: {
                            height: image.height - 250,
                            width: image.width - 250,
                            originX: 100,
                            originY: 100
                        }
                    },
                ],
                { compress: 1, format: SaveFormat.JPEG }
            )

            setImage(manipResult);
        }
    }

    const onSuccessfulCrop = (image) => {
        setImage(image)

        setIsCropping(false)
    }

    return isCropping ? (
        <ImageCropper
            image={image}
            onSaveCropping={onSuccessfulCrop}
            onCancelCropping={() => setIsCropping(false)}
        />
    ) : (
        <View>
            <Button
                onPress={takePhoto}
                title="Take Photo"
                color="#841584"
            />

            <Button
                onPress={selectFromGallery}
                title="Select from gallery"
                color="#841584"
            />

            {
                image.uri !== '' ? (
                    <Image
                        style={{ width: 500, height: 500, resizeMode: 'cover' }}
                        source={{ uri: image.uri }}
                    />
                ) : undefined
            }
        </View>
    )
}

export default ImagePicker