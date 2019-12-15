const router = require('express').Router()
const Users = require('../database/users-model')

router.post('/register', async (req, res) => {
    let user = req.body;
    try {
        const new_user = await Users.insert(user)
        res.status(200).json(new_user)
    } catch(e) {
        console.log(e)
        res.status(500).json(e)
    }     
})

router.post('/login', async (req, res) => {
    try {
        let existing = await Users.findByUsername(req.body.username)
        if (existing.password === req.body.password) {
            req.session.user = existing;
            res.status(200).json(`welcome, ${req.session.user.username}`)
        } else {
            res.status(400).json({ err: 'invalid creds'})
        } 
    } catch(e) {
        console.log(e)
        res.status(500).json(e)
    }  
});

module.exports = router;