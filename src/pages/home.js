import React from 'react'
import Axios from 'axios'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

import PokemonCard from '../components/pokemonCard'
import Pagination from '../components/pagination'

const HomePage = ({ navigation }) => {

    const [allData, setAllData] = React.useState([])
    const [numberOfPokemons, setNumberOfPokemons] = React.useState({
        currentPage: 1,
        offset: 1,
        limit: 20
    })
    const [currentPageUrl, setCurrentPageUrl] = React.useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
    const [loading, setLoading] = React.useState(false)

    React.useEffect(async () => {
        let cancel

        const getAPI = await Axios.get(currentPageUrl, {
            cancelToken: new Axios.CancelToken(c => cancel = c)
        })
        const results = getAPI.data.results

        let tempData = []

        results.forEach(async item => {

            try {
                setLoading(true)

                const url = await Axios.get(item.url)
                tempData.push(url.data)

                tempData.sort((a, b) => a.id - b.id)

                if (tempData.length === numberOfPokemons.limit) {
                    setAllData(tempData)
                    setLoading(false)
                }

                return () => cancel()
            }
            catch (err) {
                console.log(err)
            }
        })
    }, [currentPageUrl])

    const changePage = (selectedPage) => {
        const newOffset = (selectedPage - 1) * numberOfPokemons.limit
        setNumberOfPokemons({
            currentPage: selectedPage,
            offset: newOffset,
            limit: numberOfPokemons.limit
        })
        setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${newOffset}&limit=20`)
    }

    const MapPokemons = () => {
        return (
            <View style={styles.cardsContainer}>
                {
                    allData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('pokemon-details', {
                                    data: item,
                                    index: index
                                })}
                            >
                                <PokemonCard
                                    image={item.sprites.front_default}
                                    name={item.name}
                                    types={item.types}
                                    id={item.id}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
                {
                    allData.length === numberOfPokemons.limit
                        ?
                        <View>
                            <Pagination
                                numberOfPokemons={numberOfPokemons}
                                changePage={changePage}
                            />
                        </View>
                        :
                        <View></View>
                }
            </View>
        )
    }

    const PokeballLogo = () => {
        return (
            <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: '#d3d3d3', transform: [{ translateY: -70, }], marginLeft: 280, position: 'absolute', display: 'flex', flexDirection: 'row' }}>
                <View style={{ width: 60, height: 20, backgroundColor: 'white', marginTop: 90 }}></View>
                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'white', position: 'absolute', margin: 50, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: '#d3d3d3', position: 'relative', margin: 20 }}></View>
                </View>
                <View style={{ width: 60, height: 20, backgroundColor: 'white', marginTop: 90, marginLeft: 80 }}></View>
            </View>
        )
    }



    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ marginTop: 18, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 80 }}>
                <Text style={styles.fontHeader}>Pokédex</Text>
                <PokeballLogo />
            </View>
            {
                loading
                    ?
                    <View style={{...styles.cardsContainer, marginTop: 350}}>
                        <Text style={styles.fontSubHeader}>loading ...</Text>
                    </View>
                    :
                    <MapPokemons />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fontHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 18,
        marginLeft: 25,
        color: 'black'
    },
    fontSubHeader: {
        color: '#a4a4a4',
        fontWeight: 'bold',
        fontSize: 15
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // backgroundColor: 'grey',

    },
    centralize: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
})

export default HomePage