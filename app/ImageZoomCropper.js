import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
} from 'react-native'

import ImageZoomAndCrop from 'react-native-image-zoom-and-crop'

const { width, height } = Dimensions.get('window')

const ImageZoomCropper = ({ image }) => {
    const [cropperParams, setCropperParams] = useState({})

    const handleCropPress = async () => {
        const cropSize = {
            width: width / 2,
            height: height / 2,
        }

        try {
            const result = await ImageZoomAndCrop.crop({
                ...cropperParams,
                imageUri: image.uri,
                cropSize,
                cropAreaSize: { width, height },
            })

            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.wrapper}>
            <ImageZoomAndCrop
                imageUri={image.uri}
                cropAreaWidth={width}
                cropAreaHeight={height}
                setCropperParams={setCropperParams}
            />

            <View style={styles.buttonWrapper}>
                <Button onPress={handleCropPress} title="Crop It!" color="pink" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },

    buttonWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
})

export default ImageZoomCropper