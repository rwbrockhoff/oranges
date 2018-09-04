module.exports = {
    getACard: (req,res)=>{
        const db = req.app.get('db')
        db.get_A_card()
        .then(response => {
            let cardArray = []
            for(let i = 0; i < req.body.numOfCards; i++){
                //Randomizes a number between 0 and response.length
                let number = Math.floor(Math.random() * Math.floor(response.length))
                let card = response.splice(number,1)
                cardArray.push(card)
                console.log(cardArray)
            }
            res.status(200).send(cardArray)
        })
    },
    getQCard: (req,res)=>{
        const db = req.app.get('db')
        db.get_Q_card()
        .then(response => {
            //Randomizes a number between 0 and response.length
            let number = Math.floor(Math.random() * Math.floor(response.length))
            let card = response.splice(number,1)
            console.log(card)
            res.status(200).send(card)
        })
    }
}