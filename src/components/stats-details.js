import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import * as Progress from 'react-native-progress'

import {convertSpecial} from '../helper/query'

const StatsDetails = ({ stats, name }) => {
    const [statsData, setStatsData] = React.useState([])
    React.useEffect(() => {
        setStatsData(stats)
    }, [statsData])

    const MapStats = () => {
        let total = 0
        return (
            <View>
                {
                    statsData.map((stats, index) => {
                        let defaultProgress = stats.base_stat / 100
                        total += stats.base_stat
                        return (
                            <View key={index} style={styles.eachStat}>
                                <View style={styles.subHeaderContainer}>
                                    <Text style={styles.fontSubHeader}>{convertSpecial(stats.stat.name)}</Text>
                                </View>
                                <View style={styles.progressContainer}>
                                    <Text style={styles.fontText}>{stats.base_stat}</Text>
                                    <Progress.Bar style={{ borderColor: 'white', margin: 10, backgroundColor: '#ededed' }} progress={defaultProgress} width={200} color={stats.base_stat >= 50 ? '#28a428' : '#f95154'} />
                                </View>
                            </View>
                        )
                    })

                }
                <View style={styles.eachStat}>
                    <View style={styles.subHeaderContainer}>
                    <Text style={styles.fontSubHeader}>Total</Text>
                    </View>
                    <View style={styles.progressContainer}>
                    <Text style={styles.fontText}>{total}</Text>
                    <Progress.Bar style={{ borderColor: 'white', margin: 10, backgroundColor: '#ededed' }} progress={total / 600} width={200} color={total >= 300 ? '#28a428' : '#f95154'} />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.statsContent}>
            <MapStats />

            <View style={styles.infoContainer}>
            <Text style={styles.fontHeader}>Type Defenses</Text>
            <Text style={styles.fontSubHeader}>The effectiveness of each type on {convertSpecial(name)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statsContent: {
        marginTop: 20,
        padding: 20,
    },
    fontHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 8,
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
        width: 80
    },
    fontText: {
        fontSize: 16,
        marginLeft: 30,
        fontWeight: '600'
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 280
    },
    infoContainer: {
        marginHorizontal: 10
    }
})

export default StatsDetails