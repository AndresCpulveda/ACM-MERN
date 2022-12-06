import Client from "../models/Clients.js";

const addRecord = async (req, res) => {
  const record = new Client(req.body)
  record.date = Date.now()
  try {
    const saved = await record.save()
    res.json(saved)
  } catch (error) {
    console.log(error);
  }
}

const getLastRecords = async (req, res) => {
  const {amount} = req.body;
  const records = await Client.find().sort('-createdAt').limit(amount);
  res.json(records)
}

const getAllRecords = async (req, res) => {
  const records = await Client.find().sort('-createdAt')
  if(records.length < 1) {
    res.status(404).json({msg: 'No hay ningun registro aún'})
  }
  res.json(records)
}

const searchPlate = async (req, res) => {
  const {plate} = req.body;
  const records = await Client.find().where({plate: plate}).sort('-createdAt')
  if(records.length < 1) {
    return res.status(404).json({msg: 'No hay registros con esa placa'})
  }
  res.json(records)
}

const searchName = async (req, res) => {
  const {name} = req.body;
  const records = await Client.find().where({client: name}).sort('-createdAt')
  if(records.length < 1) {
    return res.status(404).json({msg: 'No hay registros con ese nombre'})
  }
  res.json(records)
}

export {addRecord, getLastRecords, searchPlate, searchName, getAllRecords}