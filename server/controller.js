module.exports = {
    getACard: (req,res)=>{
        const db = req.app.get('db')
        db.get_A_card({id:7})
        .then(response => {
            res.status(200).send(response)
        })
    },
    getQCard: (req,res)=>{
        const db = req.app.get('db')
        db.get_Q_card({id:7})
        .then(response => {
            res.status(200).send(response)
        })
    }
}