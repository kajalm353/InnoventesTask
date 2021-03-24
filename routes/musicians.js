const mongoose = require("mongoose");
const express = require("express");
let Musicians = require("../models/Musicians");
const router = express.Router();


router.post('/', async (req,res) => {
    try {
  
          const musicians = new Musicians(req.body)
          await musicians.save()
          res.status(200).send({message:'Musicians Record Created'})
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })        
    }

})

router.put('/', async (req, res) => {
    try {
              var updateMusicians = await Musicians.findOneAndUpdate({ _id: req.query.musiciansId }, { $set: req.body }, { new: true })
        res.status(200).send(updateMusicians);
    } catch (e) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
})


router.get('/', async(req,res) => {
    try {
     let result = await Musicians.aggregate([
         {
             $match: {Musician_Name: req.body.Musician_Name}
         },{
             $lookup:  {
                from: "music_album",
                localField: "Musicalbumid",
                foreignField: "_id",
                as: "Album_docs"
              }
            
         },
         {
            $sort: {"Album_docs.Price": 1}
          }
     ])

     res.status(200).send(result)
    
    
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
    
    
    })
module.exports = router;