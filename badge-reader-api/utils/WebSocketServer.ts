import WebSocket from 'ws'
import http from 'http'

export function createWebSocketServer (server: http.Server) {
  const wss = new WebSocket.Server({ server })
  // WebSocket connection handling
  wss.on('connection', (ws, req) => {
    const origin = req.headers.origin

    if (isValidOrigin(origin)) {
      console.log('[+] WebSocket connection established from allowed origin:', origin)

      ws.on('close', () => {
        console.log('[-] WebSocket connection closed')
      })
    } else {
      // Connection is not allowed
      console.log('[-] WebSocket connection from not allowed origin:', origin)
      ws.send('Connection not allowed')
      ws.close()
    }
  })

  function isValidOrigin (origin: string | undefined) {
    const allowedOrigin = 'http://localhost:3000'
    return origin === allowedOrigin
  }

  return wss
}
