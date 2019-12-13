import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  role: string,
  createdAt: Date,
  updatedAt: Date
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user']
  }
}, {
  timestamps: true
})

export default model<UserInterface>('User', UserSchema)
