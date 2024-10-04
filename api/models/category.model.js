import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema({
 title: {
    type: String,
    required: true,
    unique: true,
    collation: { locale: 'en', strength: 2 },
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

export default mongoose.model("Category", CategorySchema)