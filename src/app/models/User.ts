import { Schema, model, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface User extends Document {
  name: string,
  email: string,
  password: string,
  role: string,
  createdAt: Date,
  updatedAt: Date
}

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

UserSchema.plugin(uniqueValidator, { message: 'User {PATH} already exists' })

export default model<User>('User', UserSchema)
