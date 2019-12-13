import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/index'

class Server {
  private app: express.Application

  public constructor () {
    this.app = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(cors())
  }

  private database (): void {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes (): void {
    for (const route in routes) {
      this.app.use(routes[route])
    }
  }

  public start (): void {
    this.app.listen(8080, () => {
      console.log('Node Server on 8080')
    })
  }
}

dotenv.config()

new Server().start()
