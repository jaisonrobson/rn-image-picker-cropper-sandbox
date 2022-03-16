import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import InstagramLikeImageCropper from 'react-native-instagram-like-image-cropper'

const InstagramImageCropper = ({ image, onSuccessfulCrop }) => {
    return (
        <View>
            <InstagramLikeImageCropper
                onCropped={data => console.log('data', data)}
                image={{
                    width: image.width,
                    height: image.height,
                    uri: image.uri,
                }}
            />
        </View>
    )
}

export default InstagramImageCropper