const mongoose = require("mongoose");
const express = require("express");
let Music_Album = require("../models/Music_Album");
const music_album = require("../models/Music_Album");
const router = express.Router();


router.post("/", async (req, res) => {


    try {
        var data = await Music_Album.findOne({ Album_Name: req.body.Album_Name })
        if (data) {
            return res.status(500).send({
                message: "Album_Name already exist",
                status: 0
            })
        }

        const albumName = new Music_Album(req.body)
        await albumName.save()
        res.status(200).send({message:'Album Created'})
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
        }
})


router.put('/', async (req, res) => {
    try {

        if (req.body.Album_Name) {
            const name = await Music_Album.findOne({ Album_name: req.body.Album_Name })
            if (name) {
                return res.status(500).send({
                    message: 'Album_Name already exists',
                    status: 0
                })
            }
        }
              var updateAlbumName = await Music_Album.findOneAndUpdate({ _id: req.query.albumId }, { $set: req.body }, { new: true })
        res.status(200).send(updateAlbumName);
    } catch (e) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
})


router.get('/', async (req,res) => {
    try {
        let result 
        if (!req.query.albumId) {
            var AlbumDetails = await Music_Album.find({})

            let bubbleSort = (AlbumDetails) => {
                let len = AlbumDetails.length;
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len; j++) {
                        if (AlbumDetails[j] > AlbumDetails[j + 1]) {
                            let tmp = AlbumDetails[j];
                            AlbumDetails[j] = AlbumDetails[j + 1];
                            AlbumDetails[j + 1] = tmp;
                        }
                    }
                }
                return AlbumDetails;
            };

        result = bubbleSort(AlbumDetails)

        } else {
            result = await Music_Album.find({ _id: req.query.albumId }) 

        }
        res.status(200).send(result);

    } catch (e) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
})


router.get('/musicAlbumAndMusicians', async(req,res) => {
    try {
     let result = await music_album.aggregate([
         {
             $match: {Album_Name: req.body.Album_Name}
         },{
             $lookup:  {
                from: "musicians",
                localField: "_id",
                foreignField: "Musicalbumid",
                as: "Musicians_docs"
              }
            
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
