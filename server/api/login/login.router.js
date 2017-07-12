var router = require('express').Router();
const User = require('../users/user.model')

//email password
router.post('/', (req,res,next) => {
  User.findOne({where: req.body})
  .then(user => {
    if(user){
      req.session.user = user
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  })
  .catch(next)

})

module.exports = router
