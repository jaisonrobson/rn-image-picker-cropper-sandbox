import React, { createRef } from 'react'
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { CropView } from 'react-native-image-crop-tools'

const dimensions = Dimensions.get('screen')

const ImageCropper = ({ onCancelCropping, onSaveCropping: onSaveCroppingParam, image }) => {
    const cropper = createRef()

    const onSaveCropping = () => {
        cropper.current.saveImage(true, 100)
    }

    const onImageCrop = (result) => {
        const newResult = {
            ...result,
            uri: `file://${result.uri}`,
        }

        onSaveCroppingParam(newResult)
    }

    return (
        <View style={styles.container}>
            <CropView
                sourceUrl={image.uri}
                style={{
                    flex: 1,
                    width: dimensions.width,
                    height: dimensions.height,
                }}
                ref={cropper}
                onImageCrop={onImageCrop}
                keepAspectRatio
                aspectRatio={{ width: 10, height: 10 }}
            />

            <View style={styles.buttonsArea}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onCancelCropping}
                >
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => cropper.current.rotateImage(false)}
                >
                    <Text style={styles.buttonText}>-90°</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => cropper.current.rotateImage(true)}
                >
                    <Text style={styles.buttonText}>+90°</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onSaveCropping}
                >
                    <Text style={styles.buttonText}>✓</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#333333',
    },

    buttonsArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 35,
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,
        width: 100,
        height: 50,
        backgroundColor: 'black',
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
    },
})

export default ImageCropper