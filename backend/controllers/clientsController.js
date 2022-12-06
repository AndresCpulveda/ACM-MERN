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

export {addRecord, getLastRecords}