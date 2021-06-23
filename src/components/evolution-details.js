import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Image} from 'react-native-elements'

import { convertSpecial } from '../helper/query'
import ArrowIcon from './arrow'

const EvolutionDetails = ({ data, evolution }) => {
    const [evolutionData, setEvolutionData] = React.useState(evolution)

    // React.useEffect(() => {
    //     console.log(evolutionData)
    // }, [])

    const MapEvolutions = () => {
        return (
            evolutionData.map((item, index) => {
                return (
                    <View style={styles.eachEvolutionContainer} key={index}>
                        <View style={styles.centralize}>
                            <Image source={{ uri: item.previous.img }} style={styles.img} />
                            <Text>{convertSpecial(item.previous.name)}</Text>
                        </View>
                        <View style={styles.centralize}>
                            <ArrowIcon
                            rotate={'0deg'}
                            color={'#a4a4a4'}/>
                            <Text>Lvl. {item.min_level ?? '??'}</Text>
                        </View>
                        <View style={styles.centralize}>
                            <Image source={{ uri: item.img }} style={styles.img} />
                            <Text>{convertSpecial(item.name)}</Text>
                        </View>
                    </View>
                )
            })
        )
    }

    return (
        <View style={styles.evolutionContent}>
            {evolutionData.length === 0 
            ?
            <View style={{...styles.centralize, height: '75%'}}>
                <Text style={styles.fontSubHeader}>This Pokémon doesn't evolve</Text>
            </View>
            :
            <MapEvolutions />
        }
        </View>
    )
}

const styles = StyleSheet.create({
    evolutionContent: {
        padding: 20,
    },
    eachEvolutionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    img: {
        width: 100,
        height: 100
    },
    eachPokemonContainer: {
        backgroundColor: 'red'
    },
    centralize: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    fontSubHeader: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 15
    },
})

export default EvolutionDetails