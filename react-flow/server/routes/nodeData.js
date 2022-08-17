const express = require('express');
const fs = require('fs');

const router = express.Router();


// component 추가할 때
router.post('/', (req, res) => {
    // console.log(req.body);
    const component = req.body;
    const filePath = `./${component.path.group}/${component.path.category}/${component.componentName}.json`;
    const folderPath = `./${component.path.group}`;

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            res.send({err, fileList: [], folderList: []});
            return;
        }
        else {
            let existCategory = [];

            files.forEach(file => {
                existCategory.push(file);
            })

            res.send({folderList: existCategory});

            if(existCategory.includes(component.path.category)) {
                fs.writeFile(filePath, JSON.stringify(component), (err) => {
                    if (err) throw err;
                    console.log("파일 저장 완료");
                })
            }
            else {
                fs.mkdir(`${folderPath}/${component.path.category}`, (err) => {
                    if (err) throw err;
                    console.log("폴더 생성 완료");
                })
                fs.writeFile(filePath, JSON.stringify(component), (err) => {
                    if (err) throw err;
                    console.log("파일 저장 완료");
                })
            }
        }
    })
});
// router.post('/', (req, res) => {
//     // console.log(req.body);
//     const flow = req.body;

//     fs.writeFile("./writeFileDir/test.json", JSON.stringify(flow), (err) => {
//         if (err) throw err;
//         console.log("파일 저장 완료");
//     })

//     return res.send('성공');
// });

const file = fs.readFileSync('./writeFileDir/test.json', 'utf8', (err) => {
    if (err) throw err;
});

router.get('/', (req, res) => {
    res.json(file);
});


// 컴포넌트 드래그앤드랍으로 불러올 때
let componentNodePath = "";
router.post('/componentPath', (req, res) => {
    componentNodePath = req.body;
    // console.log(componentNodePath);
    res.send("완료")
});

router.get('/componentPath', (req, res) => {
    res.send(componentNodePath);
});

router.get('/componentNodeData', (req, res) => {
    const componentNodePath = req.query.componentNodePath;
    // console.log(componentNodePath)
    const componentNode = fs.readFileSync(`${componentNodePath}`, 'utf8', (err) => {
        if (err) throw err;
    });
    // console.log(componentNode)

    res.json(componentNode);
});


// router.post('/saveTest', (req, res) => {
//     const flow = req.body;

//     fs.writeFile("./writeFileDir/test.json", JSON.stringify(flow), (err) => {
//         if (err) throw err;
//         console.log("파일 저장 완료");
//     })

//     return res.send('성공');
// });

module.exports = router;