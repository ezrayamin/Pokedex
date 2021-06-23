import React from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import {Card} from 'react-native-elements'
import colorBasedOnType from '../styles/searchColor'

const PokemonCard = ({ image, name, types, id }) => {

    const MapTypes = () => {
        return (
            types.map((item, index) => {
                let typesLength = item.type['name'].length
                return (
                    <View key={index} style={{...styles.typesContainer, width: typesLength <=3 ? 40 : typesLength >= 7 ? 74 : typesLength * 12}}>
                        <Text style={styles.font}>{item.type['name']}</Text>
                    </View>
                )
            })
        )
    }


    return (
        <Card containerStyle={{...styles.cardContainer, backgroundColor: colorBasedOnType[types[0].type.name]}}>
            <View style={styles.cardContent}>
                <View style={{minWidth: '55%'}}>
                    <Text style={{...styles.font, fontSize: name.length >= 12 ? 12 : 14}}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                    <MapTypes />
                </View>
                <View>
                    <Card.Image
                        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
                        style={styles.img}
                        PlaceholderContent={<ActivityIndicator />}
                    >
                    </Card.Image>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 70, 
        height: 70,
        marginTop: 10
    },
    cardContainer: {
        borderRadius: 20, 
        width: 180, 
        height: 115,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        marginVertical: 10
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    typesContainer: {
        borderRadius: 12, 
        backgroundColor: 'rgba(255, 255, 255,0.4)',
        alignItems: 'center',
        marginBottom: 5,
        padding: 3

    },
    font: {
        color: 'white',
        fontWeight: 'bold',
        // fontSize: 14
    }
})

export default PokemonCard