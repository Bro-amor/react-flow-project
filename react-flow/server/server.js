const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5001;

const serverTest = require('./routes/serverTest');
const nodeData = require('./routes/nodeData');
const getFolderList = require('./routes/getFolderList');
const flowProcess = require('./routes/flowProcess');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/serverTest', serverTest);
app.use('/nodeData', nodeData);
app.use('/getFolderList', getFolderList);
app.use('/flowProcess', flowProcess);

app.get('/', function(req, res) {
    res.send("React-Flow Server Page");
});

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});