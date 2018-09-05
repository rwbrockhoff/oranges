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
            res.status(200).send(card)
        })
    },
    newPlayer: (req,res)=>{
        const db = req.app.get('db')
        db.add_user({userName: req.body.userName})
        .then(response =>{
            req.session.userid = response[0].id
            res.status(200).send(response)
            // console.log(response)
        })
    },
    deletePlayer: (req,res) => {
        const db = req.app.get('db')
        db.delete_player({id: req.params.id})
        .then(response =>{
            res.status(200).send('deleted')
        })

    }
}