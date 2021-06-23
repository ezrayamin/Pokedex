import React from 'react'
import Axios from 'axios'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image, Divider, Icon } from 'react-native-elements'

import { setNumber } from '../helper/query'
import colorBasedOnType from '../styles/searchColor'
import ArrowIcon from '../components/arrow'
import AboutDetails from '../components/about-details'
import StatsDetails from '../components/stats-details'
import EvolutionDetails from '../components/evolution-details'
import DamageDetails from '../components/damage-details'

const PokemonDetail = ({ navigation, route }) => {
    const { data, index } = route.params

    const [title, setTitle] = React.useState('About')
    const [species_evolution, setSpecies_evolution] = React.useState({
        species: {
            info: '',
            category: '',
            egg_groups: ''
        },
        evolution: {
            total: 0,
            evolutionsData: []
        },
    })
    const [damage, setDamage] = React.useState({
        vigot: [],
        weakness: []
    })
    const [loading, setLoading] = React.useState(false)

    const setTitleBorder = (title) => {
        setTitle(title)
    }

    const subHeaders = [
        { title: 'About' },
        { title: 'Base Stats' },
        { title: 'Evolution' },
        { title: 'Damage' }
    ]

    React.useEffect(async () => {
        setLoading(true)
        const getSpecies_evolution = await fetchSpecies_evolution(data.species.url)
        setSpecies_evolution({
            species: {
                info: getSpecies_evolution.species.info,
                category: getSpecies_evolution.species.category,
                egg_groups: getSpecies_evolution.species.egg_groups
            },
            evolution: {
                total: getSpecies_evolution.evolution.total,
                evolutionsData: getSpecies_evolution.evolution.evolutionsData
            }
        })

        const pokemonTypes = data.types
        const getDamage = await fetchDamage(pokemonTypes)
        setLoading(false)
    }, [])

    const fetchSpecies_evolution = async (url) => {
        try {
            const getSpecies = await Axios.get(url)
            const species = getSpecies.data
            // console.log('data', species)

            const findEnglishInfo = species.flavor_text_entries.find(e => e.language.name === 'en')
            const findEnglishCategory = species.genera.find(e => e.language.name == "en")

            const getEvolution = await Axios.get(species.evolution_chain.url)
            const firstForm = getEvolution.data.chain.species.name
            const evolvesTo = getEvolution.data.chain.evolves_to

            let tempEvolution
            if (evolvesTo.length >= 1) {
                const firstEvolutionName = evolvesTo[0].species.name
                const firstEvolutionLevel = evolvesTo[0].evolution_details[0].min_level

                const getPrevData = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${firstForm}`)
                const getPrevId = getPrevData.data.id
                const prevImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPrevId}.png`

                const getFirstEvolutionData = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${firstEvolutionName}`)
                const FirstEvolutionId = getFirstEvolutionData.data.id
                const firstEvolutionImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${FirstEvolutionId}.png`

                const firstEvolutionDetails = { name: firstEvolutionName, min_level: firstEvolutionLevel, img: firstEvolutionImg, previous: { name: firstForm, img: prevImg } }
                // console.log('first', firstEvolutionDetails)
                const secondEvolution = evolvesTo[0].evolves_to


                if (secondEvolution.length >= 1) {

                    const secondEvolutionName = secondEvolution[0].species.name
                    const secondEvolutionLevel = secondEvolution[0].evolution_details[0].min_level

                    const getSecondEvolutionData = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${secondEvolutionName}`)
                    const secondEvolutionId = getSecondEvolutionData.data.id
                    const secondEvolutionImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${secondEvolutionId}.png`

                    const secondEvolutionDetails = { name: secondEvolutionName, min_level: secondEvolutionLevel, img: secondEvolutionImg, previous: { name: firstEvolutionName, img: firstEvolutionImg } }
                    // console.log('second', secondEvolutionDetails)
                    tempEvolution = {
                        total: 2,
                        evolutionsData: [firstEvolutionDetails, secondEvolutionDetails]
                    }
                } else {
                    tempEvolution = {
                        total: 1,
                        evolutionsData: [firstEvolutionDetails]
                    }
                }
            } else {
                tempEvolution = {
                    total: 0,
                    evolutionsData: []
                }
            }

            const tempSpeces_Evolution = {
                species: {
                    info: findEnglishInfo.flavor_text,
                    category: findEnglishCategory.genus,
                    egg_groups: species.egg_groups
                },
                evolution: {
                    total: tempEvolution.total,
                    evolutionsData: tempEvolution.evolutionsData
                },
            }

            return tempSpeces_Evolution

        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchDamage = (typesArray) => {
        let all_double_damage_to = []
        let all_half_damage_to = []

        let all_double_damage_from = []
        let all_half_damage_from = []

        const loopTypes = typesArray.map(async item => {
            try {
                const url = await Axios.get(item.type.url)
                const typeDetails = url.data

                // console.log('each type details', typeDetails)
                const eachType_doubleDamageTo = typeDetails.damage_relations['double_damage_to']
                const eachType_halfDamageTo = typeDetails.damage_relations['half_damage_to']

                eachType_doubleDamageTo.map(item => {
                    all_double_damage_to.push(item.name)
                })

                eachType_halfDamageTo.map(item => {
                    all_half_damage_to.push(item.name)
                })

                const eachType_doubleDamageFrom = typeDetails.damage_relations['double_damage_from']
                const eachType_halfDamageFrom = typeDetails.damage_relations['half_damage_from']

                // console.log(`ddf ${item.type.name}`, eachType_doubleDamageFrom)
                // console.log(`hdf ${item.type.name}`, eachType_halfDamageFrom)

                eachType_doubleDamageFrom.map(item => {
                    all_double_damage_from.push(item.name)
                })

                eachType_halfDamageFrom.map(item => {
                    all_half_damage_from.push(item.name)
                })

                let typeNames = []
                data.types.map(item => {
                    typeNames.push(item.type['name'])
                })

                let tempVigot = []

                all_double_damage_to.forEach(doubles => {
                    if (!all_half_damage_to.includes(doubles) && !typeNames.includes(doubles)) {
                        tempVigot.push(doubles)
                    }
                })

                const distnictVigot = [...new Set(tempVigot)]

                // console.log('all ddf', all_double_damage_from)
                // console.log('all hdf', all_half_damage_from)

                let tempWeaknesses = []
                all_double_damage_from.forEach(doubles => {
                    if (!all_half_damage_from.includes(doubles)) {
                        tempWeaknesses.push(doubles)
                    }
                })

                const distinctWeaknesses = [...new Set(tempWeaknesses)]

                setDamage({
                    vigot: distnictVigot,
                    weakness: distinctWeaknesses
                })
            }
            catch (err) {
                console.log(err)
            }
        })
    }

    const MapTypes = () => {
        return (
            data.types.map((item, index) => {
                let typesLength = item.type['name'].length
                return (
                    <View key={index} style={{ ...styles.typesContainer, width: typesLength <=3 ? 40 : typesLength * 12 }}>
                        <Text style={styles.font}>{item.type['name']}</Text>
                    </View>
                )
            })
        )
    }

    const ShowStats = () => {
        return (
            subHeaders.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => setTitleBorder(item.title)} >
                        <Text style={[styles.fontSubHeader, title === item.title && styles.activeHeader]}>{item.title}</Text>
                        <Divider style={[styles.nonActiveTab, title === item.title && styles.activeTab]} />
                        {/* <View style={{width:'100%', height: 4, backgroundColor: 'red'}}></View> */}
                    </TouchableOpacity>
                )
            })
        )
    }

    return (
        <View style={{ backgroundColor: colorBasedOnType[data.types[0].type.name], height: '100%' }}>
            <View style={{ height: '42%' }}>
                <View style={{ marginTop: 30, paddingHorizontal: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ paddingTop: 11, height: '150%', }} onPress={() => navigation.goBack()}>
                        <ArrowIcon
                            rotate={'180deg'} 
                            color={'white'}/>
                    </TouchableOpacity>
                    <Text style={{ ...styles.font, fontSize: 18 }}>#{setNumber(data.id)}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 10 }}>
                    <View>
                        <Text style={{ ...styles.font, fontSize: 32 }}>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <MapTypes />
                        </View>
                    </View>
                </View>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` }} style={styles.img} />
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statsHeader}>
                    <ShowStats />
                </View>
                {/* <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{width:'25%', height: 4, backgroundColor: 'red'}}></View>
                    <View style={{width:'25%', height: 4, backgroundColor: 'red'}}></View>
                    <View style={{width:'25%', height: 4, backgroundColor: 'red'}}></View>
                    <View style={{width:'25%', height: 4, backgroundColor: 'red'}}></View>
                </View> */}
                {
                    loading
                    ?
                    <View style={{height: '80%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.fontSubHeader}>loading ...</Text>
                    </View>
                    :
                    title === 'About'
                        ?
                        <AboutDetails
                            details={data}
                            species={species_evolution.species} />
                        :
                        title === 'Base Stats'
                            ?
                            <StatsDetails
                                stats={data.stats}
                                name={data.name} />
                            :
                            title === 'Evolution'
                                ?
                                <EvolutionDetails
                                    evolution={species_evolution.evolution.evolutionsData}
                                    data={data}
                                />
                                :
                                title === 'Damage'
                                    ?
                                    <DamageDetails
                                        damage={damage}
                                    />
                                    :
                                    <Text>error</Text>

                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    typesContainer: {
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255,0.4)',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 3

    },
    numContainer: {
        marginTop: 30
    },
    font: {
        color: 'white',
        fontWeight: 'bold',
        // fontSize: 14
    },
    img: {
        width: 250, height: 250
    },
    imgContainer: {
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
        marginHorizontal: 85,
        marginVertical: 150
    },
    statsContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderColor: '#d1e3d6',
        paddingTop: 40
    },
    statsHeader: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-around'
    },
    activeTab: {
        backgroundColor: '#0000b3',
        height: 2,
        marginTop: 10,
    },
    nonActiveTab: {
        backgroundColor: '#d3d3d3',
        height: 2,
        marginTop: 10,
    },
    activeHeader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    statsContent: {
        marginTop: 30,
        padding: 20
    },
    fontSubHeader: {
        color: '#a4a4a4',
        fontWeight: 'bold',
        fontSize: 16
    },
    eachStat: {
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    fontText: {
        fontSize: 15,
        marginLeft: 30
    }
})

export default PokemonDetail