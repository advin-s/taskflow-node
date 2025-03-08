import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routers/tasksRoutes.js'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(morgan('dev'))


mongoose.connect(process.env.DB_CONNECTION_STRING,{
    
}).then(()=> console.log('DB connected')).catch(err => console.log(err)
)

app.use('/taskroute/v1',router)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`)
})
