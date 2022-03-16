import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Button, Image } from 'react-native'
import Crop from 'react-native-avatar-crop'

const AvatarImageCropper = ({ image, onSuccessfulCrop }) => {
    let crop
    const { width: SCREEN_WIDTH } = Dimensions.get("window")

    const cropImage = async () => {
        // crop accepts quality, default is 1
        // uri will have cropped image cache path
        if (crop) {
            const newImage = await crop(0.9)

            // onSuccessfulCrop(newImage)
        }
    }

    return (
        <View>
            <Crop
                source={{ uri: image.uri }}
                cropShape={"circle"} // rect || circle
                width={SCREEN_WIDTH} // default value
                height={SCREEN_WIDTH} // defalt value
                cropArea={{
                    width: SCREEN_WIDTH / 1.3, // required
                    height: SCREEN_WIDTH / 1.3, // required
                }}
                borderWidth={0} // default 2
                backgroundColor={"#FFFFFF"} // default #FFFFFF, use same format
                opacity={0.7} // between 0 and 1, default is 1
                maxZoom={3} // default 3
                resizeMode={"contain"} // default "cover"
                onCrop={(cropCallback) => (crop = cropCallback)} // returns a function
            />

            <Button
                onPress={cropImage}
                title="Crop"
                color="#841584"
            />
        </View>
    )
}

export default AvatarImageCropper