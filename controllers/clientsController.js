import Client from "../models/Clients.js";

const addRecord = async (req, res) => {
  console.log(req.body);
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
  const regexp = new RegExp("^"+ name); //Regurlar expression that allows to search any string that starts with the given string in the 'name' variable
  const records = await Client.find().where({client: regexp}).sort('-createdAt')
  if(records.length < 1) {
    return res.status(404).json({msg: 'No hay registros con ese nombre'})
  }
  res.json(records)
}

const deleteRecord = async (req, res) => {
  const {id} = req.params;
  const record = await Client.findById(id)
  if(!record) {
    return res.status(404).json({msg: 'No se encontró registro'})
  }
  try {
    await record.deleteOne()
    res.json(record)
  } catch (error) {
    console.log(error)
  }
}

export {addRecord, getLastRecords, searchPlate, searchName, getAllRecords, deleteRecord}