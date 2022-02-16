import mongoose from 'mongoose'

const connectDB = async () => {   // the crud operations will always return a promise
  try {
    const conn = await mongoose.connect('mongodb+srv://paul123:paul123@cluster0.y0hfe.mongodb.net/proshop', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1) // it means exit the process with failure
  }
}

export default connectDB
