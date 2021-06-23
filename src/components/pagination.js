import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Pagination = ({ numberOfPokemons, changePage }) => {

    const totalPokemonShown = 880
    const lastPage = totalPokemonShown / numberOfPokemons.limit
    const firstPage = 1
    
    let onePageBefore = parseInt(numberOfPokemons.currentPage ) - 1
    let twoPagesBefore = parseInt(numberOfPokemons.currentPage ) - 2
    
    let onePageAfter = parseInt(numberOfPokemons.currentPage ) + 1
    let twoPagesAfter = parseInt(numberOfPokemons.currentPage ) + 2
        
    const goTo = (selectedPage) => {
        changePage(selectedPage)
    }

    return (
        <View>
        {
            numberOfPokemons.currentPage === firstPage
                ?
                <View style={styles.paginationContainer}>
                    <View style={styles.activeSquare}>
                        <Text style={styles.activePaginationFont}> {numberOfPokemons.currentPage} </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {onePageAfter} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(twoPagesAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {twoPagesAfter} </Text>
                    </TouchableOpacity>
                    <View style={styles.nonActiveSquare}>
                        <Text style={styles.nonActivePaginationFont}> ... </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(lastPage)}>
                        <Text style={styles.nonActivePaginationFont}> {lastPage} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {'>'} </Text>
                    </TouchableOpacity>
                </View>
                :
                numberOfPokemons.currentPage  === 2
                ?
                <View style={styles.paginationContainer}>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {'<'} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {onePageBefore} </Text>
                    </TouchableOpacity>
                    <View style={styles.activeSquare}>
                        <Text style={styles.activePaginationFont}> {numberOfPokemons.currentPage} </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {onePageAfter} </Text>
                    </TouchableOpacity>
                    <View style={styles.nonActiveSquare}>
                        <Text style={styles.nonActivePaginationFont}> ... </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(lastPage)}>
                        <Text style={styles.nonActivePaginationFont}> {lastPage} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {'>'} </Text>
                    </TouchableOpacity>
                </View>
                :
                numberOfPokemons.currentPage === lastPage
                ?
                <View style={styles.paginationContainer}>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {'<'} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(firstPage)}>
                        <Text style={styles.nonActivePaginationFont}> {firstPage} </Text>
                    </TouchableOpacity>
                    <View style={styles.nonActiveSquare}>
                        <Text style={styles.nonActivePaginationFont}> ... </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(twoPagesBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {twoPagesBefore} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {onePageBefore} </Text>
                    </TouchableOpacity>
                    <View style={styles.activeSquare}>
                        <Text style={styles.activePaginationFont}> {numberOfPokemons.currentPage} </Text>
                    </View>
                </View>
                :
                numberOfPokemons.currentPage  < lastPage && numberOfPokemons.currentPage > (lastPage - 2)
                ?
                <View style={styles.paginationContainer}>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {'<'} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(firstPage)}>
                        <Text style={styles.nonActivePaginationFont}> {firstPage} </Text>
                    </TouchableOpacity>
                    <View style={styles.nonActiveSquare}>
                        <Text style={styles.nonActivePaginationFont}> ... </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {onePageBefore} </Text>
                    </TouchableOpacity>
                    <View style={styles.activeSquare}>
                        <Text style={styles.activePaginationFont}> {numberOfPokemons.currentPage} </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {onePageAfter} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {'>'} </Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.paginationContainer}>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageBefore)}>
                        <Text style={styles.nonActivePaginationFont}> {'<'} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(firstPage)}>
                        <Text style={styles.nonActivePaginationFont}> {firstPage} </Text>
                    </TouchableOpacity>
                    <View style={styles.nonActiveSquare}>
                        <Text style={styles.nonActivePaginationFont}> ... </Text>
                    </View>
                    <View style={styles.activeSquare}>
                        <Text style={styles.activePaginationFont}> {numberOfPokemons.currentPage} </Text>
                    </View>
                    <View style={styles.nonActiveSquare}>
                        <Text style={styles.nonActivePaginationFont}> ... </Text>
                    </View>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(lastPage)}>
                        <Text style={styles.nonActivePaginationFont}> {lastPage} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveSquare} onPress={() => goTo(onePageAfter)}>
                        <Text style={styles.nonActivePaginationFont}> {'>'} </Text>
                    </TouchableOpacity>
                </View>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    paginationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,

    },
    activeSquare: {
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: '#fdd66b',
        height: 330 / 7,
        width: 330 / 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
        marginHorizontal: 2,
        borderRadius: 10
    },
    nonActiveSquare: {
        borderColor: '#565656',
        borderWidth: 1,
        height: 330 / 7,
        width: 330 / 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
        borderRadius: 10
    },
    activePaginationFont: {
        fontWeight: 'bold',
        color: '#152a5e',
        fontSize: 16
    },
    nonActivePaginationFont: {
        fontWeight: 'bold',
        color: '#152a5e',
        fontSize: 16
    },
})

export default Pagination