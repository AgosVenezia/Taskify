import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectada. Host: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
  }
};

mongoose.connection.on('disconnected', (ref) => {
  console.log('Conexión Mongoose desconectada.')
})

mongoose.connection.on('close', (ref) => {
  console.log('Conexión Mongoose cerrada.')
})

export default connectDB;
