const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    path = req.query.path;
    
    fs.readdir(path, (err, files) => {
        if (err) {
            res.send({err, fileList: [], folderList: []});
            return;
        }
        else {
            let folders = [];

            files.forEach(file => {
                folders.push(file);
            })

            res.send({folderList: folders});
        }
    })

});

module.exports = router;