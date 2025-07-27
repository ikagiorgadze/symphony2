# Symphony Telegram Bot Webhook

A Node.js webhook server for integrating Telegram bot messaging with the Symphony Hotel PMS system.

## Features

- Receive incoming Telegram messages via webhook
- Real-time message broadcasting via WebSocket
- Send outbound messages (currently unused)
- Health monitoring and webhook management

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file with:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Server Configuration
PORT=3001
```

### 3. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### POST `/webhook`
Receives incoming Telegram messages and broadcasts them via WebSocket.

**Expected payload**: Telegram Bot API update object

### POST `/send-message`
Send a message to a Telegram chat (currently unused).

**Request body**:
```json
{
  "chatId": "chat_id_or_username",
  "message": "Hello from Symphony Hotel!"
}
```

### POST `/set-webhook`
Configure the Telegram webhook URL.

**Request body**:
```json
{
  "webhookUrl": "https://your-domain.com/webhook"
}
```

### GET `/webhook-info`
Get current webhook configuration information.

### GET `/health`
Health check endpoint showing server status and WebSocket client count.

## WebSocket Integration

The server runs a WebSocket server on port 8080 for real-time communication with the frontend.

**Message format**:
```json
{
  "type": "telegram_message",
  "data": {
    "id": "message_id",
    "phoneNumber": "+1234567890",
    "username": "@username",
    "firstName": "John",
    "lastName": "Doe",
    "message": "Hello hotel!",
    "timestamp": "2024-01-01T12:00:00Z",
    "direction": "incoming",
    "status": "delivered",
    "chatId": 123456789,
    "type": "text"
  }
}
```

## Testing

### Local Testing with ngrok

1. Install ngrok: https://ngrok.com/
2. Start your server: `npm run dev`
3. In another terminal: `ngrok http 3001`
4. Use the ngrok HTTPS URL for your webhook

### Set Webhook

```bash
curl -X POST http://localhost:3001/set-webhook \
  -H "Content-Type: application/json" \
  -d '{"webhookUrl": "https://your-ngrok-url.ngrok.io/webhook"}'
```

## Security

- Always use HTTPS in production
- Keep your bot token secure
- Consider implementing rate limiting
- Validate incoming webhook requests

## Deployment

### Heroku
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
heroku config:set TELEGRAM_BOT_TOKEN=your_token
git push heroku main
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Troubleshooting

- **Webhook not receiving messages**: Check that your URL is publicly accessible and uses HTTPS
- **WebSocket connection failed**: Ensure port 8080 is not blocked
- **Bot not responding**: Verify your bot token and that the bot is not blocked 