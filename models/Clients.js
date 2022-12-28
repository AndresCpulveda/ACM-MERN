import mongoose from 'mongoose'

const clientsSchema = new mongoose.Schema({
  plate: {type: String, required: true, uppercase: true, trim: true},
  client: {type: String, lowercase: true, required: true, trim: true},
  repair: {type: String, required: true, lowercase: true},
  date: {type: Date, defaul: Date.now(), required: true},
  charge: {type: Number, required: true}
}, {
  timestamps: true,
})

const Client = mongoose.model('Client', clientsSchema)

export default Client