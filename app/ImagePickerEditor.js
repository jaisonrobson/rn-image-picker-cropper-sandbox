import { React, useState } from 'react'
import { View, Button, Image } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import ImageCropper from './ImageCropper'

const ImagePickerEditor = () => {
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

export default ImagePickerEditor