module.exports = {
    convertSpecial: (str) => {
        if (str === 'hp') return str.toUpperCase()
        if (str === 'special-attack') return 'Sp. Atk'
        if (str === 'special-defense') return 'Sp. Def'
        
        let wordFind = 'special-'
        let idx = str.indexOf(wordFind)
        let specialString = `Sp. ${str.slice(8)}`
        if (idx > -1)  return specialString

        return str.charAt(0).toUpperCase() + str.slice(1)
    },
    lowerCaseInfo: (str, pokemonName) => {
        let result = str.replace(pokemonName.toUpperCase(), pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1))
        result = result.replace("POKéMON", "Pokémon")
        return result.replace( /[\r\n]+/gm, " " )
    },
    setNumber: (index) => {
        const str = index.toString()
        const pad = "000"
        let res = pad.substring(str.length) + str

        return res
    }

}