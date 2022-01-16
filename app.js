const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
var methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

//connect db
mongoose.connect('mongodb://localhost/pcat-test-db');

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

//upload image
app.post('/photos', async (req, res) => {
  //console.log(req.files.image); // the uploaded file object
  //  await Photo.create(req.body);
  //
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
  });
  res.redirect('/');
});

//edit
app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});



//put request
app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});

//delete request
app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deleteImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deleteImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

// app.get('/', (req, res) => {
//   const photo = {
//     id: 1,
//     name: 'photo Name',
//     description: 'photo description',
//   };
//   res.send(photo);
// });
const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda oluşturuldu.`);
});
