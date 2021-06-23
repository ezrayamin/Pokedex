import React from 'react'
import {View} from 'react-native'

const ArrowIcon = ({rotate, color}) => {
    return (
        <View style={{ marginBottom: 10, transform: [{rotate: rotate}] }}>
            <View style={{ width: 20, height: 5, backgroundColor: color, borderRadius: 5, marginTop: 5, marginLeft: 2 }}></View>
            <View style={{ width: 10, height: 5, backgroundColor: color, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, position: 'absolute', transform: [{ rotate: "45deg" }], marginLeft: 15, marginTop: 3 }}></View>
            <View style={{ width: 10, height: 5, backgroundColor: color, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, position: 'absolute', transform: [{ rotate: "-45deg" }], marginLeft: 14, marginTop: 7 }}></View>
        </View>
    )
}

export default ArrowIcon