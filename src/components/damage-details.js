import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import colorBasedOnType from '../styles/searchColor'
const DamageDetails = ({damage}) => {

    const MapVigot = () => {
        return (

            damage.vigot.map((item, index) => {
                return (
                    <View key={index} 
                    style={{...styles.typesContainer, 
                    width: 120,
                    backgroundColor: colorBasedOnType[item]}}>
                        <Text style={styles.fontSubHeader}>{item}</Text>
                    </View>
                )
            })
        )
    }

    const MapWeaknesses = () => {
        return (

            damage.weakness.map((item, index) => {
                return (
                    <View key={index} 
                    style={{...styles.typesContainer, 
                    width: 120,
                    backgroundColor: colorBasedOnType[item]}}>
                        <Text style={styles.fontSubHeader}>{item}</Text>
                    </View>
                )
            })
        )
    }

    return (
        <View style={styles.damageContent}>
            <View>
            <View style={styles.eachDamageContainer}>
            <Text style={styles.fontHeader}>Vigot</Text>
            <View style={styles.itemsContainer}>
            <MapVigot/>
            </View>
            </View>
            <View style={styles.eachDamageContainer}>
            <Text style={styles.fontHeader}>Weakness</Text>
            <View style={styles.itemsContainer}>
            <MapWeaknesses/>
            </View>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    damageContent: {
        marginTop: 30,
        alignItems: 'center',
    },
    eachDamageContainer: {
        marginVertical: 10,
        // minWidth: 300
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'flex-start',
    },
    typesContainer: {
        borderRadius: 12,
        backgroundColor: 'blue',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 3

    },
    fontHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 12,
        color: 'black'
    },
    fontSubHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
})
export default DamageDetails