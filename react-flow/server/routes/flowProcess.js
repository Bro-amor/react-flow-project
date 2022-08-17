const express = require('express');

const router = express.Router();


router.post('/', (req, res) => {
    let inputN = [];
    let defaultN = [];
    let outputN = [];

    const workSpace = req.body;

    const inputNode = workSpace.flow.nodes.filter(nodes => nodes.type == "customInputNode");
    const defaultNode = workSpace.flow.nodes.filter(nodes => nodes.type == "customDefaultNode");
    const outputNode = workSpace.flow.nodes.filter(nodes => nodes.type == "customOutputNode");


    let i_nodeName = "";
    let i_attr = [];
    let i_id = "";

    for (let i = 0; i < inputNode.length; i++) {
        i_nodeName = inputNode[i].data.label;
        i_attr = inputNode[i].data.attr;
        i_id = inputNode[i].id;
        i_goToId = workSpace.flow.edges.filter(edges => edges.source == i_id)[0].target;
        i_goToName = defaultNode.filter(nodes => nodes.id)[0].key;

        inputN.push(
            {
                nodeName : i_nodeName,
                attr : JSON.stringify(i_attr),
                goTo : i_goToName
            }
        );
    };
    

    let d_nodeName = "";
    let d_attr = [];
    let d_id = "";
    // let d_goTo = "";
    let d_receive = [];

    for (let i = 0; i < defaultNode.length; i++) {
        d_nodeName = defaultNode[i].data.label;
        d_attr = defaultNode[i].data.attr;
        d_id = defaultNode[i].id;
        // d_goTo = workSpace.flow.edges.filter(edges => edges.source == d_id)[0].target;
        d_receive = inputNode[i].data.attr;
        d_goToId = workSpace.flow.edges.filter(edges => edges.source == d_id)[0].target;
        d_goToName = outputNode.filter(nodes => nodes.id)[0].key;
        
        defaultN.push(
            {
                // id: d_id,
                nodeName : d_nodeName,
                attr : JSON.stringify(d_attr),
                receive: JSON.stringify(d_receive),
                goTo : d_goToName
            }
        );
    };


    let o_nodeName = "";
    let o_attr = [];
    let o_id = "";
    let o_receive = [];

    for (let i = 0; i < outputNode.length; i++) {
        o_nodeName = outputNode[i].data.label;
        o_attr = outputNode[i].data.attr;
        o_id = outputNode[i].id;
        o_receive = defaultNode[i].data.attr;
        
        outputN.push(
            {
                nodeName : o_nodeName,
                attr : JSON.stringify(o_attr),
                receive: JSON.stringify(o_receive),
            }
        );
    };


    console.log("\ninput : ")
    console.log(inputN)

    console.log("\ndefault : ")
    console.log(defaultN)

    console.log("\noutput : ")
    console.log(outputN)
});

// router.get('/', (req, res) => {
//     res.send({inputN, defaultN, outputN});
// });

module.exports = router;