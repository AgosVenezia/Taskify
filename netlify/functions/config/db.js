import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected. Host: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    // process.exit(1);
  }
};

/*
const closeDB = async () => {
  try {
    // console.log('mongoose.Connection.client -> ', client)
    mongoose.connection.close(mongoose.connection)
  } catch (err) {
    console.error(`Error: ${err.message}`)    
  }
}
*/

mongoose.connection.on('disconnected', (ref) => {
  console.log('Mongoose disconnected event.')
})

mongoose.connection.on('close', (ref) => {
  console.log('Mongoose close event.')
})

// export { connectDB, closeDB };
export default connectDB;
