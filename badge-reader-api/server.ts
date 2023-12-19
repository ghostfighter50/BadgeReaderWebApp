import express from 'express'
import mongoose from 'mongoose'
import https from 'https'
import cors from 'cors'
import fs from 'fs'
import badgeRoutes from './routes/badgeRoute'
import scanRoutes from './routes/scanRoute'
import adminRoutes from './routes/adminRoute'
import databaseConfig from './config/database.json'
import clientConfig from './config/client.json'
import { initializeAdmin } from './utils/InitializeAdmin'
import { createWebSocketServer } from './utils/WebSocketServer'

/**
 * Express application instance
 * @type {express.Express}
 */
const app = express()

/**
 * SSL config
 */
const options = {
  key: fs.readFileSync('../certificates/localhost-key.pem'),
  cert: fs.readFileSync('../certificates/localhost.pem')
}
/**
 * https server instance created using Express app
 * @type {https.Server}
 */
const server = https.createServer(options, app) // Use 'https.createServer' instead

// Connect to the MongoDB database
mongoose.connect(databaseConfig.url)

// Use Express JSON parser
app.use(express.json())

app.use(
  cors({
    origin: `https://${clientConfig.host}:${clientConfig.port}`,
    credentials: true
  })
)

/**
 * WebSocket server instance created using https server
 * @type {WebSocket.Server}
 */
const wss = createWebSocketServer(server)

// Initialize admin in the database
initializeAdmin()

// Routes
app.use('/api/badges', badgeRoutes)
app.use('/api/scan', scanRoutes)
app.use('/api/admin', adminRoutes)

// Start the server
const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.clear()
  console.log(`[+] Server is running on port : ${PORT}`)
})

/**
 * WebSocket server instance exported for external use
 * @type {WebSocket.Server}
 */
export { wss }
