const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

//middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

// app.get('/', (req, res) => {
//   const photo = {
//     id: 1,
//     name: 'photo Name',
//     description: 'photo description',
//   };
//   res.send(photo);
// });

app.listen(port, () => {
  console.log(`sunucu ${port} portunda oluşturuldu.`);
});
