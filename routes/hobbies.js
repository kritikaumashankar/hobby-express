var express = require('express');
var router = express.Router();
var Hobby = require('../models').Hobby;

var hobbies = [
  {id: 1, title: 'Dancing'},
  {id: 2, title: 'Reading books'},
  {id: 3, title: 'Listening to music'}
]

//GET hobby listings.

router.get('/', function(req, res){
  Hobby.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
  .then(function(hobbies){
    return res.render('hobbies', {hobbies: hobbies })
  })
  //res.render('hobbies', {hobbies: hobbies })
});

//POST add hobby listing
router.post('/',function(req,res){
  var title = req.body.title;
  Hobby.create({ title: title })
    .then( function() {
      res.redirect('/hobbies');
    });
});

router.delete('/:id',function(req,res){
  Hobby.findById(req.params.id)
  .then( function(hobby){
      hobby.destroy()
  })
  .then( function(){
    return res.redirect('/hobbies');
  });
});

router.get('/:id/edit', function(req,res){
  Hobby.findById(req.params.id)
  .then( function(hobby){
    return res.render('edit',{hobby: hobby});
  });
});

router.put('/:id',function(req,res){
  Hobby.update(
    { title: req.body.title },
    { where: {id: req.params.id } }
  )
  .then( function(){
    return res.redirect('/hobbies');
  })
});

module.exports = router;