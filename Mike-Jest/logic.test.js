const { add, maxText, getQCard, getACard } = require('./logic')


describe( 'testing the add function', ()=>{

    test('add should be 4 when given 2', ()=> {
        expect(add(2)).toEqual(4)
    })

    test('add should return 10 when given 5', ()=>{
        expect(add(5)).toEqual(10)
    })

})

describe('testing the maxText function', ()=>{

    test('when given a string of 26, it should return "too long"', ()=>{
        expect(maxText('ansnananananananananananan')).toEqual('too long!')
    })

    test('returns accepted when length is 24', ()=>{
        expect(maxText('anananananananananananan')).toEqual('accepted')
    })

    test('returns a string when you dont type anything',()=>{
        expect(maxText()).toEqual('please type something')
    })
})

describe('testing get qCard endpoint', ()=>{

    test('gets status of 200', ()=>{
        return getQCard().then((res) => {
            expect(res.status).toBe(200)
        })
    })

    test('recieves a single card', ()=>{
        return getQCard().then(res=>{
            expect(res.data.length).toBe(1)
        })
    })

})

describe('testing get aCard endpoint', ()=> {

    test('gets status of 200', ()=>{
        return getACard(2).then(res =>{
            expect(res.status).toBe(200)
        })
    })
    
    test('gets 3 cards when given 3', ()=>{
        return getACard(3).then(res =>{
            expect(res.data.length).toBe(3)
        })
    })

    test('gets 5 cards when given 5', ()=>{
        return getACard(5).then(res =>{
            expect(res.data.length).toBe(5)
        })
    })
})