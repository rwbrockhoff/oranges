const {qCard, getDescription, getBasicEndPoint } = require('./Logic')

// Sample Data
var qCardSample = {"id":44,"name":"Relaxing","description":"restful, calming, peaceful"}

test('Should hit endpoint without the database', () => {
    return getBasicEndPoint().then(res => {
        var data = res.data
        expect(typeof data).toBe('string')
    })
})

test('should return true if properly formed card object', () => {
    expect(qCard(qCardSample)).toBe(true);
})


test('Should return a string for a card description', () => {
    return getDescription().then(res => {
        var data = res.data[0]
        expect(data).toHaveProperty('description')
    })
})

test('Should return only one card', () => {
    return getDescription().then(res => {
        var data = res.data
        expect(data).toHaveLength(1)
    })
})

test('Should return an object from axios', () => {
    return getDescription().then(res => {
        var data = res.data
        expect(typeof data).toBe('object')
    })
})

test('Should receive a string from our Description', () => {
    return getDescription().then(res => {
        var data = res.data[0]
        expect.any(Object)
    })
})

