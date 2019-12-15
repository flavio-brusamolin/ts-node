import { Schema, model, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface User extends Document {
  _id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  createdAt: Date,
  updatedAt: Date
}

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String
}, {
  timestamps: true
})

UserSchema.plugin(uniqueValidator, { message: 'User {PATH} already exists' })

export default model<User>('User', UserSchema)
