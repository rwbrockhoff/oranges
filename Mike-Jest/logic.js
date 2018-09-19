const axios = require('axios')

const logic = {
    add(x){
        return x + x
    },

    maxText(input){
        if(input){
            if(input.length > 24){
                return 'too long!'
            } else if (input.length <= 24) {
                return 'accepted'
            }
        } else {
            return 'please type something'
        }

    },
    getQCard(){
       return axios.get('https://server.aktlist.com/api/getqcard')
    },
    getACard(input){
        return axios.post('https://server.aktlist.com/api/getacard', {numOfCards: input})
    }



}

module.exports = logic