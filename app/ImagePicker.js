import { React, useState } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePicker = () => {
    const [image, setImage] = useState({ uri: '' })

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
        }
    }

    return (
        <View>
            <Button
                onPress={takePhoto}
                title="Take Photo"
                color="#841584"
                accessibilityLabel="Learn more about this button"
            />

            <Button
                onPress={selectFromGallery}
                title="Select from gallery"
                color="#841584"
                accessibilityLabel="Learn more about this button"
            />

            <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: image.uri }}
            />
        </View>
    )
}

export default ImagePicker