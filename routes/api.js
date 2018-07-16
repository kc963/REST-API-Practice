const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja.js');

router.get('/ninjas', function(req, res, next){
  Ninja.aggregate([{
    $geoNear: {
      near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
      spherical: true,
      maxDistance: 100000,
      distanceField: "dist.calculated"
    }
  }]).then(function(results){
    res.send(results);
    console.log("hello");
    console.log(results);
  });
  //Ninja.geoNear(
  //  {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
  //  {maxDistance: 100000, spherical: true}
  //).then(function(ninjas){
  //  res.send(ninjas);
  //});
});

router.post('/ninjas', function(req, res, next){
  //console.log(req.body);
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja);
  }).catch(next);
});

router.put('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ninja){
    Ninja.findOne({_id: req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  });
});

router.delete('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});

module.exports = router;
