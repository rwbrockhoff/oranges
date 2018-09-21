const {getQCards, addUser} = require('../josh-tests/logic');

let user = {
    username: 'Yeshua'
}

describe('Can get q card', () => {
    test('Get status 200', () => {
        getQCards().then(res => {
            expect(res.status).toBe(200)
        })
    });
    test('gets array from server', () => {
        getQCards().then(res => {
            expect(Array.isArray(res.data)).toBe(true)
        })
    });
    test('Recieve a qcard', () => {
        getQCards().then(res => {
            expect(res.data[0]).toEqual(qcard)
        })
    });
    test('Card has name property', () => {
        getQCards().then(res => {
            expect(res.data[0].name).toEqual(name)
        })
    });
    test('card has description', () => {
        getQCards().then(res => {
            expect(res.data[0].description).toEqual(description)
        })
    })
})

// describe('User stuff', () => {
//     let users = [];

//     beforeEach(() => {
//         users = [];
//         user = {
//             username: 'Yeshua'
//         };
//     });

//     test('user should have username', () => {
//         expect(addUser(newUsers[0].username).toEqual(username))
//     })
// })