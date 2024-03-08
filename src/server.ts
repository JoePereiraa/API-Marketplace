
import express from 'express'
import { router } from './routes'
// import { Routes } from './routes'

const app = express()
app.use(express.json())
app.use(router)

// Routes()

app.listen(3333, () => console.log('Server started'))