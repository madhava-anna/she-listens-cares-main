import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/ChatMessage";
import { getAIResponse } from "@/utils/aiResponses";

interface Message {
  role: "user" | "assistant";
  content: string;
  category?: "safety" | "health" | "info";
}

interface ChatInterfaceProps {
  phoneNumber: string;
}

const ChatInterface = ({ phoneNumber }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm here to help you with safety concerns, healthcare questions, or information about government programs. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Speak the last assistant message if speech is enabled
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant" && isSpeechEnabled && messages.length > 1) {
      speakText(lastMessage.content);
    }
  }, [messages, isSpeechEnabled]);

  const speakText = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    // Try to use a female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Google UK English Female')
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeech = () => {
    if (isSpeechEnabled) {
      window.speechSynthesis.cancel();
    }
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Error",
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Stop any ongoing speech when starting to listen
      window.speechSynthesis.cancel();
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now. I'm listening.",
      });
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;


    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    
    // Get AI response
    setTimeout(() => {get_ai_response_direct(input.trim());}, 500);

  };
  const get_ai_response_direct = (msg?:string) => {
    var json_msg =

        {"messages":[
          {
              "role": "system",
              "content":"You are an AI assistant specialized in assisting women with safety concerns, healthcare questions, and information about government programs in Democratic Republic of the Congo. Provide empathetic, accurate, and helpful responses. Include relevant helpline numbers and resources when applicable. Keep responses concise and easy to understand."
          },
          {
              "role": "user",
              "content": msg
          }
      ]
      };
    fetch("https://ai-model-interface.prod-088.workers.dev",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(json_msg)
    })
    .then(response => response.json())
    .then(data => {
      const response = data["result"].response;
      //const response="Response from AI model";
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response if enabled
      if (isSpeechEnabled) {
        speakText(response);
      }
    })
    .catch(function(res){ console.log(res) })
    //return "This is a placeholder response.";
  }

 


  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden border">
      <div className="h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 bg-muted/30">
        <div className="flex gap-2">
          <Button
            onClick={toggleListening}
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            className="shrink-0"
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            onClick={toggleSpeech}
            variant={isSpeechEnabled ? "default" : "outline"}
            size="icon"
            className="shrink-0"
            title={isSpeechEnabled ? "Disable voice output" : "Enable voice output"}
          >
            {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type or speak your question..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
