const axios = require('axios');


const logic = {
    getQCards(){
        return axios.get('/api/getqcard')
    },
    addUser(user){
        const userToAdd = {...user};
        const newUsers = [];
        newUsers.push(user);
        return newUsers;
    }
}

module.exports = logic;