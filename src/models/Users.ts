import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
})

const User = mongoose.model('Users', UserSchema)
export default User

// module.exports = mongoose.model('Users', UserSchema)