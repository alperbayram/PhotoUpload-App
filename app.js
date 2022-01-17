const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const PhotoContoller = require('./controllers/PhotoControllers');
const PageContoller = require('./controllers/PageControllers');

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
app.get('/', PhotoContoller.getAllPhotos);
app.get('/photos/:id', PhotoContoller.getPhoto);
app.post('/photos', PhotoContoller.createPhoto);
app.put('/photos/:id', PhotoContoller.updatePhotos);
app.delete('/photos/:id', PhotoContoller.deletePhotos);

//pages
app.get('/about', PageContoller.aboutPage);
app.get('/add', PageContoller.addPage);
app.get('/photos/edit/:id', PageContoller.editPage);

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda oluşturuldu.`);
});
