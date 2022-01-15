var router = require('express').Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

router.get('/', (req, res) => {
    User.find({}, ['fullname', 'email', 'bio', 'birthdate'],(err, users) => {
        res.json(users);
    })
});

router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id},(err, user) => {
        res.json(user);
    })
});

router.post('/', (req, res, next) => {
    var newUser = req.body;
    console.log(newUser);
    var user = new User();
    user.fullname = newUser.fullname;
    user.email = newUser.email;
    user.birthdate = newUser.birthdate;
    user.bio = newUser.bio;
    user.setPassword(newUser.password);

    user.save().then(() => {
        return res.json({isCreated: true});
    }).catch(next);
});

router.delete('/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id}, () => {
        res.json({isDeleted: true})
    })
});
router.put('/:id', (req, res) => {

    User.updateOne({_id: req.params.id}, {$set: {
        fullname: req.body.fullname,
        bio: req.body.bio,
    }}).then(() => {
        res.json({isUpdated: true});
    })
});


module.exports = router;