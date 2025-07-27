import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { 
  MessageSquare, 
  Smartphone, 
  Phone,
  Send
} from "lucide-react"

interface TelegramMessage {
  id: string
  phoneNumber: string
  username?: string
  guestName?: string
  message: string
  timestamp: Date
  direction: 'incoming' | 'outgoing'
  status: 'sent' | 'delivered' | 'read'
  chatId?: number
}

// Mock guest data for linking messages to guests
const mockGuests = [
  { phone: "+1555123456", username: "@sarah_j", chatId: 849700184, name: "Sarah Johnson", vipStatus: "Platinum" },
  { phone: "+1555789012", username: "@chen_michael", chatId: 531359350, name: "Michael Chen", vipStatus: "Gold" },
  { phone: "+1555345678", username: "@emma_wilson", chatId: 123456789, name: "Emma Wilson", vipStatus: "Silver" },
  { phone: "+1555901234", username: "@david_kumar", chatId: 987654321, name: "David Kumar", vipStatus: "Gold" },
]

export function TelegramCommunication() {
  const [messages, setMessages] = useState<TelegramMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const { toast } = useToast()

  // WebSocket connection for real-time messages
  useEffect(() => {
    const connectWebSocket = () => {
      // Close existing connection if any
      if (wsRef.current) {
        wsRef.current.close()
      }
      
      setConnectionStatus('connecting')
      const ws = new WebSocket('ws://localhost:8080')
      
      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setConnectionStatus('connected')
        toast({
          title: "Telegram Connected",
          description: "Real-time messaging is now active",
        })
      }
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.type === 'telegram_message') {
            const message: TelegramMessage = {
              ...data.data,
              timestamp: new Date(data.data.timestamp)
            }
            
            console.log('📨 Received message:', message)
            console.log('📨 Message direction:', message.direction)
            console.log('📨 Is bot message:', message.direction === 'outgoing' || message.username === 'Symphony Hotel Bot')
            
            setMessages(prev => {
              const newMessages = [...prev, message]
              console.log('📨 Total messages now:', newMessages.length)
              return newMessages
            })
            
            // Show toast for incoming messages only
            if (message.direction === 'incoming') {
              const guest = getGuestInfo(message.phoneNumber || message.username)
              toast({
                title: "New Telegram Message",
                description: `${guest?.name || message.username || message.phoneNumber}: ${message.message.substring(0, 50)}...`,
              })
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }
      
      ws.onclose = () => {
        console.log('WebSocket disconnected')
        setIsConnected(false)
        setConnectionStatus('disconnected')
        
        // Attempt to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000)
      }
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
        setConnectionStatus('disconnected')
      }
      
      wsRef.current = ws
    }
    
    connectWebSocket()
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const getGuestInfo = (identifier: string | number) => {
    const id = identifier?.toString()
    return mockGuests.find(guest => 
      guest.phone === id || 
      guest.username === id || 
      guest.chatId?.toString() === id
    )
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date)
  }

  // Group messages by chat/guest - simpler approach
  const groupedMessages = React.useMemo(() => {
    console.log('🔄 Grouping messages, total count:', messages.length)
    console.log('🔄 All messages:', messages)
    
    const groups: { [key: string]: TelegramMessage[] } = {}
    
    messages.forEach(message => {
      // Use chatId as primary key, fallback to username/phone
      const guestKey = message.chatId?.toString() || 
                      message.username || 
                      message.phoneNumber || 
                      'unknown'
      
      console.log(`🔄 Processing message ${message.id}, guestKey: ${guestKey}, direction: ${message.direction}`)
      
      if (!groups[guestKey]) {
        groups[guestKey] = []
      }
      groups[guestKey].push(message)
    })
    
    // Sort messages in each group by timestamp
    Object.keys(groups).forEach(guestKey => {
      groups[guestKey].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
      console.log(`🔄 Group ${guestKey} has ${groups[guestKey].length} messages`)
    })
    
    console.log('🔄 Final grouped messages:', groups)
    return groups
  }, [messages])

  const guestKeys = Object.keys(groupedMessages)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
            <div className="flex items-center bg-blue-500 text-white rounded-full w-8 h-8 mr-3 justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div className="flex items-center">
              <span>Telegram Guest Communication</span>
              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                Live
              </Badge>
            </div>
          </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
                className={connectionStatus === 'connected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
              >
                {connectionStatus === 'connected' ? '🟢 Connected' : connectionStatus === 'connecting' ? '🟡 Connecting...' : '🔴 Disconnected'}
              </Badge>
              <Badge variant="secondary">
                {guestKeys.length} active chats
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="p-4 border rounded-lg bg-blue-50 text-center">
            <p className="text-sm text-blue-700">
              🤖 <strong>Live Telegram Integration</strong> - Each guest conversation appears in separate containers below
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual Guest Chat Containers */}
      {guestKeys.length === 0 ? (
        <Card className="h-[300px]">
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No guest conversations yet</p>
              <p className="text-sm">Guest chats will appear here when they text your bot</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        guestKeys.map(guestKey => {
          const guestMessages = groupedMessages[guestKey]
          // Find the first non-bot message for guest info
          const firstUserMessage = guestMessages.find(msg => 
            msg.direction === 'incoming' && 
            msg.username !== 'Symphony Hotel Bot'
          ) || guestMessages[0]
          
          const guest = getGuestInfo(firstUserMessage.phoneNumber || firstUserMessage.username || '')
          const guestName = guest?.name || firstUserMessage.username || firstUserMessage.phoneNumber || `Chat ${guestKey}`
          
          return (
            <Card key={guestKey} className="h-[400px] flex flex-col">
                              <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <div className="flex items-center bg-blue-500 text-white rounded-full w-6 h-6 mr-2 justify-center">
                        <Send className="w-3 h-3" />
                      </div>
                      {guestName}
                      <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200">
                        Telegram
                      </Badge>
                      {guest?.vipStatus && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {guest.vipStatus}
                        </Badge>
                      )}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {guestMessages.length} messages
                    </Badge>
                  </div>
                </CardHeader>
              
              <CardContent className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 h-[280px] p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-3">
                    {guestMessages.map((message) => {
                      const isBot = message.direction === 'outgoing' || message.username === 'Symphony Hotel Bot'
                      
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isBot ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] p-3 rounded-lg border shadow-sm ${
                              isBot 
                                ? 'bg-blue-100 border-blue-200' 
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            {isBot && (
                              <div className="flex items-center mb-1">
                                <Badge variant="secondary" className="text-xs bg-blue-200 text-blue-800">
                                  🤖 Hotel Bot
                                </Badge>
                              </div>
                            )}
                            <p className="text-sm mb-2">{message.message}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex items-center bg-blue-500 text-white rounded-full w-3 h-3 mr-1 justify-center">
                                  <Send className="w-1.5 h-1.5" />
                                </div>
                                <span className="text-xs opacity-60 text-blue-600">
                                  Telegram
                                </span>
                              </div>
                              <span className="text-xs opacity-70">
                                {formatTimestamp(message.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
} 