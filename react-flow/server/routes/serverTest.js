const express = require('express');

const router = express.Router();

// let id = 2;
// const todoList = [
//     {
//         id: 1,
//         text: '할일 1',
//         done: false,
//     },
// ];

// router.get('/todo', (req, res) => {
//     res.json(todoList);
// });

// router.post('/todo', (req, res) => {
//     const { text, done } = req.body;
//     console.log(req.body);
//     todoList.push({
//         id: id++,
//         text,
//         done,
//     });
//     return res.send('성공');
// });

// let flow = [];

// router.post('/test', (req, res) => {
//     console.log(req.body);
//     flow = req.body;
//     return res.send('성공');
// });

// router.get('/test', (req, res) => {
//     res.json(flow);
// });

module.exports = router;