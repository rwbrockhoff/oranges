const axios = require('axios')

const logic = {

    qCard(qCardSample){
        if(qCardSample.id >= 0){
            return true
        }
        return false
    },
    
    getDescription(){
        return axios.get('https://server.aktlist.com/api/getqcard')
    },
    getBasicEndPoint(){
        return axios.get('https://server.aktlist.com/dylan')
    }
}

module.exports = logic;