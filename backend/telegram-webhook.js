const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// WebSocket server for real-time communication
const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket server running on port 8080');

// Broadcast message to all connected clients
function broadcastMessage(message) {
  const data = JSON.stringify(message);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Helper function to send message with inline keyboard
async function sendMessageWithButtons(chatId, text, buttons) {
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const messageData = {
      chat_id: chatId,
      text: text,
      reply_markup: {
        inline_keyboard: buttons
      }
    };
    
    const response = await axios.post(url, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message with buttons:', error);
  }
}

// Auto-response handler
async function handleAutoResponse(message) {
  const text = message.text?.toLowerCase() || '';
  const chatId = message.chat.id;
  
  // Welcome message with service buttons
  if (text === '/start' || text.includes('hello') || text.includes('hi')) {
    const welcomeButtons = [
      [
        { text: '🏨 Check-in Help', callback_data: 'checkin' },
        { text: '📶 WiFi Issues', callback_data: 'wifi' }
      ],
      [
        { text: '🍽️ Room Service', callback_data: 'roomservice' },
        { text: '🧹 Housekeeping', callback_data: 'housekeeping' }
      ],
      [
        { text: '🛎️ Concierge', callback_data: 'concierge' },
        { text: '🚪 Check-out', callback_data: 'checkout' }
      ],
      [
        { text: '🆘 Emergency', callback_data: 'emergency' }
      ]
    ];
    
    await sendMessageWithButtons(
      chatId,
      '🏨 Welcome to Symphony Hotel! How can I assist you today?',
      welcomeButtons
    );
  }
  
  // Quick help for specific keywords
  else if (text.includes('wifi') || text.includes('internet')) {
    const wifiButtons = [
      [
        { text: '🔑 Get WiFi Password', callback_data: 'wifi_password' },
        { text: '🔧 Technical Support', callback_data: 'wifi_support' }
      ]
    ];
    
    await sendMessageWithButtons(
      chatId,
      '📶 WiFi Help - What would you like to do?',
      wifiButtons
    );
  }
  
  else if (text.includes('room service') || text.includes('food')) {
    const foodButtons = [
      [
        { text: '🍽️ View Menu', callback_data: 'menu' },
        { text: '☕ Coffee/Tea', callback_data: 'coffee' }
      ],
      [
        { text: '🥗 Light Meals', callback_data: 'light_meals' },
        { text: '🍰 Desserts', callback_data: 'desserts' }
      ]
    ];
    
    await sendMessageWithButtons(
      chatId,
      '🍽️ Room Service - What would you like to order?',
      foodButtons
    );
  }
  
  else if (text.includes('housekeeping') || text.includes('cleaning')) {
    const cleaningButtons = [
      [
        { text: '🧻 Extra Towels', callback_data: 'towels' },
        { text: '🛏️ Fresh Bedding', callback_data: 'bedding' }
      ],
      [
        { text: '🧹 Room Cleaning', callback_data: 'cleaning' },
        { text: '🧴 Toiletries', callback_data: 'toiletries' }
      ]
    ];
    
    await sendMessageWithButtons(
      chatId,
      '🧹 Housekeeping Service - What do you need?',
      cleaningButtons
    );
  }
}

// Get button text from callback data
function getButtonText(data) {
  const buttonTexts = {
    'checkin': 'Check-in Help',
    'wifi': 'WiFi Issues', 
    'wifi_password': 'Get WiFi Password',
    'wifi_support': 'Technical Support',
    'roomservice': 'Room Service',
    'menu': 'View Menu',
    'coffee': 'Coffee/Tea',
    'light_meals': 'Light Meals',
    'desserts': 'Desserts',
    'housekeeping': 'Housekeeping',
    'towels': 'Extra Towels',
    'bedding': 'Fresh Bedding', 
    'cleaning': 'Room Cleaning',
    'toiletries': 'Toiletries',
    'concierge': 'Concierge',
    'checkout': 'Check-out',
    'emergency': 'Emergency'
  };
  return buttonTexts[data] || data;
}

// Handle button clicks
async function handleButtonClick(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  
  // Acknowledge the button click (with error handling for expired queries)
  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
      callback_query_id: callbackQuery.id
    });
  } catch (error) {
    if (error.response?.data?.description?.includes('query is too old')) {
      console.log('Callback query expired, continuing with response...');
    } else {
      console.error('Error acknowledging callback query:', error.response?.data || error.message);
    }
  }
  
  // Handle different button actions
  switch (data) {
    case 'checkin':
      await sendMessage(chatId, '🏨 Check-in assistance: Our front desk staff will help you shortly. Your room number and key cards are ready!');
      break;
    case 'wifi':
    case 'wifi_password':
      await sendMessage(chatId, '📶 WiFi Details:\n🔑 Network: Symphony_Guest\n🔑 Password: Hotel2024\n\nIf you have issues, please let us know!');
      break;
    case 'wifi_support':
      await sendMessage(chatId, '🔧 Our IT support has been notified. Someone will assist you within 15 minutes.');
      break;
    case 'roomservice':
    case 'menu':
      await sendMessage(chatId, '🍽️ Room Service Menu:\n🥗 Salads: $12-18\n🍝 Pasta: $16-22\n🥩 Main Courses: $24-35\n🍰 Desserts: $8-12\n\nCall ext. 2468 to order!');
      break;
    case 'coffee':
      await sendMessage(chatId, '☕ Coffee & Tea service:\n☕ Coffee: $4\n🍵 Tea selection: $3\n🥐 Pastries: $6\n\nWe\'ll deliver in 15-20 minutes!');
      break;
    case 'housekeeping':
    case 'towels':
      await sendMessage(chatId, '🧻 Extra towels are being sent to your room right now! They should arrive within 10 minutes.');
      break;
    case 'bedding':
      await sendMessage(chatId, '🛏️ Fresh bedding change has been scheduled. Housekeeping will arrive in 20-30 minutes.');
      break;
    case 'cleaning':
      await sendMessage(chatId, '🧹 Room cleaning service scheduled. We\'ll arrive within the next hour. Please let us know if you need to reschedule.');
      break;
    case 'concierge':
      await sendMessage(chatId, '🛎️ Concierge Services:\n🚗 Transportation\n🎭 Event tickets\n🍽️ Restaurant reservations\n🗺️ Local recommendations\n\nHow can we assist you?');
      break;
    case 'checkout':
      await sendMessage(chatId, '🚪 Check-out assistance:\n📧 Express checkout via email\n🧾 Final bill sent to your room\n🚗 Luggage assistance available\n\nCheckout time: 11 AM');
      break;
    case 'emergency':
      await sendMessage(chatId, '🆘 EMERGENCY: If this is a medical emergency, call 911 immediately.\n\nFor hotel emergencies:\n📞 Front desk: ext. 0\n🔧 Maintenance: ext. 1234\n🚨 Security: ext. 5678');
      break;
    default:
      await sendMessage(chatId, '✅ Thank you for your request! Our team will assist you shortly.');
  }
}

// Simple message sender
async function sendMessage(chatId, text) {
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: chatId,
      text: text
    });
    
    // Broadcast bot response to UI
    if (response.data.ok) {
      const botMessage = {
        id: `bot-${response.data.result.message_id}`,
        phoneNumber: null,
        username: 'Symphony Hotel Bot',
        firstName: 'Symphony Hotel',
        lastName: 'Bot',
        message: text,
        timestamp: new Date(),
        direction: 'outgoing',
        status: 'sent',
        isSimulation: false,
        chatId: chatId,
        type: 'bot_response'
      };
      
      console.log('Broadcasting bot response:', botMessage);
      
      broadcastMessage({
        type: 'telegram_message',
        data: botMessage
      });
      
      console.log('Bot response broadcasted to WebSocket clients');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Telegram webhook to receive messages
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    console.log('Received Telegram update:', JSON.stringify(body, null, 2));
    
    // Process incoming message
    if (body.message) {
      const message = body.message;
      
      // Extract message data
      const telegramMessage = {
        id: message.message_id.toString(),
        phoneNumber: message.contact?.phone_number || null,
        username: message.from?.username ? `@${message.from.username}` : null,
        firstName: message.from?.first_name || null,
        lastName: message.from?.last_name || null,
        message: message.text || message.caption || 'Media message',
        timestamp: new Date(message.date * 1000),
        direction: 'incoming',
        status: 'delivered',
        isSimulation: false,
        chatId: message.chat.id,
        type: message.text ? 'text' : 'media'
      };
      
      console.log('Processed Telegram message:', telegramMessage);
      
      // Broadcast to all connected WebSocket clients
      broadcastMessage({
        type: 'telegram_message',
        data: telegramMessage
      });
      
      console.log('Message broadcasted to WebSocket clients');
      
      // Auto-respond with helpful buttons for certain messages
      await handleAutoResponse(message);
    }
    
    // Handle button clicks (callback queries)
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      
      // Broadcast the button click as a message to the UI
      const buttonClickMessage = {
        id: `btn-${callbackQuery.id}`,
        phoneNumber: callbackQuery.from?.phone_number || null,
        username: callbackQuery.from?.username ? `@${callbackQuery.from.username}` : null,
        firstName: callbackQuery.from?.first_name || null,
        lastName: callbackQuery.from?.last_name || null,
        message: `🔘 Selected: ${getButtonText(callbackQuery.data)}`,
        timestamp: new Date(),
        direction: 'incoming',
        status: 'delivered',
        isSimulation: false,
        chatId: callbackQuery.message.chat.id,
        type: 'button_click'
      };
      
      console.log('Broadcasting button click:', buttonClickMessage);
      
      broadcastMessage({
        type: 'telegram_message',
        data: buttonClickMessage
      });
      
      console.log('Button click broadcasted, handling response...');
      await handleButtonClick(callbackQuery);
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing Telegram webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Send Telegram message (outbound) - currently unused but available
app.post('/send-message', async (req, res) => {
  try {
    const { chatId, message } = req.body;
    
    if (!chatId || !message) {
      return res.status(400).json({ error: 'Chat ID and message are required' });
    }
    
    // Telegram Bot API endpoint
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const messageData = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    };
    
    const response = await axios.post(url, messageData);
    
    if (response.data.ok) {
      console.log('Message sent successfully:', response.data);
      
      // Broadcast the sent message to WebSocket clients
      const sentMessage = {
        id: response.data.result.message_id.toString(),
        chatId: chatId,
        message: message,
        timestamp: new Date(),
        direction: 'outgoing',
        status: 'sent',
        isSimulation: false
      };
      
      broadcastMessage({
        type: 'telegram_message',
        data: sentMessage
      });
      
      res.json({ success: true, messageId: response.data.result.message_id });
    } else {
      console.error('Failed to send message:', response.data);
      res.status(500).json({ error: 'Failed to send message', details: response.data });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Set Telegram webhook
app.post('/set-webhook', async (req, res) => {
  try {
    const { webhookUrl } = req.body;
    
    if (!webhookUrl) {
      return res.status(400).json({ error: 'Webhook URL is required' });
    }
    
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`;
    
    const response = await axios.post(url, {
      url: webhookUrl
    });
    
    if (response.data.ok) {
      console.log('Webhook set successfully:', response.data);
      res.json({ success: true, description: response.data.description });
    } else {
      console.error('Failed to set webhook:', response.data);
      res.status(500).json({ error: 'Failed to set webhook', details: response.data });
    }
  } catch (error) {
    console.error('Error setting webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get webhook info
app.get('/webhook-info', async (req, res) => {
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`;
    
    const response = await axios.get(url);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting webhook info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    websocketClients: wss.clients.size,
    service: 'telegram-bot'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Telegram bot webhook server running on port ${port}`);
  console.log('Endpoints:');
  console.log(`  POST /webhook - Receive Telegram messages`);
  console.log(`  POST /send-message - Send Telegram messages`);
  console.log(`  POST /set-webhook - Set Telegram webhook`);
  console.log(`  GET  /webhook-info - Get webhook information`);
  console.log(`  GET  /health - Health check`);
});

module.exports = app; 