const router = require('express').Router()
// const router= express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                FullName: req.body.FullName,
                email: req.body.email,
                role: req.body.role,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        });


});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication Failed'
                })
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                res.status(401).json({
                    message: 'Authentication Failed'
                })
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'asderfghtyu', { expiresIn: '1h' })
            res.status(200).json({
                token: token,
                expiresIn: 3600
            })


        }).catch(err => {
            return res.status(401).json({
                message: 'Authentication Failed'
            })
        })

})

router.get('', (req, res, next) => {
    User.find().then(documents => {
        res.status(200).json({
            message: 'Users fetched successfully',
            posts: documents
        });
    })

})

module.exports = router;