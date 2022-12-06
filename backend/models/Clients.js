import mongoose from 'mongoose'

const clientsSchema = new mongoose.Schema({
  plate: {type: String, required: true, unique: true, uppercase: true, trim: true},
  client: {type: String, required: true, trim: true},
  repair: {type: String, required: true},
  date: {type: Date, defaul: Date.now(), required: true},
  charge: {type: Number, required: true}
}, {
  timestamps: true,
})

const Client = mongoose.model('Client', clientsSchema)

export default Client