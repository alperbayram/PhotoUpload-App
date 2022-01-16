const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect db
mongoose.connect('mongodb://localhost/pcat-test-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('photo', PhotoSchema);

//create a photo
// Photo.create({
//   title: 'photo title 2',
//   description: 'photo description 2 lorem',
// });

//read a photo
// Photo.find({}, (err, data) => {
//     console.log(data);
// })

//updated a photo
// const id = "61e1891e68e267cba08eadde";

// Photo.findByIdAndUpdate(
//     id,
//     {
//         title: "photo title 1 updated",
//         description:"photo description 1 updated"
//     },
//     {
//         new: true,
//     },
//     (err, data) => {
//         console.log(data);
//     }
// )


//delete a photo
// const id = "61e18b3dbb2bcf3311d1e8e9";

// Photo.findByIdAndDelete(id, (err, data) => {
//     console.log("photo 2 is removed.. ");
// })
