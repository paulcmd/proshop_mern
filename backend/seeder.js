import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()   // we are deleting from all the 3 collections because we want to seed into an empty database
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id  //Admin user is the first user in the users array/file

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }  //adding admin user id to each product
    })

    await Product.insertMany(sampleProducts)  //inserting products into the database with admin user id

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {    //argv is an array of command line arguments. -d is the second argument thus the second index of the array
  destroyData()
} else {
  importData() // if no -d argument is passed, then import data
}
