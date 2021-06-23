import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import {Card} from 'react-native-elements'
import {convertSpecial, lowerCaseInfo} from '../helper/query'

const AboutDetails = ({ details, species }) => {

    const setHeight = (height) => {
        const centimeter = height * 10
        let inches = (centimeter * 0.393700787).toFixed(0);
        const feet = Math.floor(inches / 12);
        inches %= 12;

        const feetAndInches = `${feet}' ${inches}" `
        const meter = ` (${height / 10} m)`
        return feetAndInches + meter
    }

    const setWeight = (weight) => {
        const kilogram = weight / 10
        const pound = (kilogram * 2.20462).toFixed(1)

        const result = `${pound} lb (${kilogram} kg)`
        return result
    }

    const setAbilities = (abilities) => {
        let allAbilities = ''
        abilities.forEach(item => {
            allAbilities += `${convertSpecial(item.ability.name)}, `
        })
        const result = allAbilities.slice(0, -2)
        return result
    }

    const setEgg_groups = (egg_groups) => {
        let allEgg_groups = ''
        egg_groups.forEach(item => {
            allEgg_groups += `${convertSpecial(item.name)}, `
        })
        const result = allEgg_groups.slice(0, -2)
        return result
    }
    
    return (
        <View style={styles.statsContent}>
            <View style={styles.eachStat}>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.fontSubHeader}>Category</Text>
                </View>
                <Text style={{...styles.fontText, marginLeft: 30}}>{species.category}</Text>
            </View>
            <View style={styles.eachStat}>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.fontSubHeader}>Egg Groups</Text>
                </View>
                <Text style={{...styles.fontText, marginLeft: 30}}>{ species.egg_groups.length > 0 ? setEgg_groups(species.egg_groups) : 'None'}</Text>
            </View>
            <View style={styles.eachStat}>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.fontSubHeader}>Abilities</Text>
                </View>
                <View style={{ width: 250 }}>
                    <Text style={{...styles.fontText, marginLeft: 30}}>{setAbilities(details.abilities)}</Text>
                </View>
            </View>
            <Card containerStyle={styles.heightWeightContainer}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 8}}>
            <View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.fontSubHeader}>Height</Text>
                </View>
                <Text style={styles.fontText}>{setHeight(details.height)}</Text>
            </View>
            <View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.fontSubHeader}>Weight</Text>
                </View>
                <Text style={styles.fontText}>{setWeight(details.weight)}</Text>
            </View>
            </View>
            </Card>
            <View style={{marginTop: 40, marginLeft: 13, width: '93%', display: 'flex', alignItems: 'center'}}>
            {/* <Text style={styles.fontHeader}>Information</Text> */}
            <Text style={{color: 'black', fontSize: 14, fontWeight: '700', lineHeight: 18, marginBottom: 30}}>{lowerCaseInfo(species.info, details.name)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statsContent: {
        marginTop: 20,
        padding: 20
    },
    fontHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 10,
        marginVertical: 15,
    },
    fontSubHeader: {
        color: '#a4a4a4',
        fontWeight: 'bold',
        fontSize: 15
    },
    eachStat: {
        marginHorizontal: 10,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',
    },
    subHeaderContainer: {
        width: 100
    },
    fontText: {
        fontSize: 15,
        // marginLeft: 30,
        fontWeight: '700',
        color: 'black'
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 280
    },
    heightWeightContainer: {
        borderRadius: 20, 
        borderWidth: 2, 
        marginVertical: 27,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.22,
        shadowRadius: 4.65,
        elevation: 6
    }
})

export default AboutDetails