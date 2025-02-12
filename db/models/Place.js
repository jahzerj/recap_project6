import mongoose from 'mongoose';

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
});

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);

export default Place;

// "name": "Elbphilharmonie",
// "location": "Hamburg",
// "image": "https://images.unsplash.com/photo-1553547274-0df401ae03c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGF1c3NlbmFsc3RlciUyMGhhbWJ1cmd8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
// "mapURL": "https://www.google.com/maps/place/Elbphilharmonie+Hamburg/@53.543085,9.9859608,15.47z/data=!4m5!3m4!1s0x47b18f066770c44f:0xb2e4ab2a68984286!8m2!3d53.5413297!4d9.9841308",
// "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi dolorem inventore, minima, blanditiis si
