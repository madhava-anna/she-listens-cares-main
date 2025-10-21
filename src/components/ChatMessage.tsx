import { Shield, Heart, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
  category?: "safety" | "health" | "info";
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  const categoryConfig = {
    safety: { icon: Shield, label: "Safety", color: "bg-destructive/10 text-destructive border-destructive/20" },
    health: { icon: Heart, label: "Health", color: "bg-accent/10 text-accent-foreground border-accent/20" },
    info: { icon: Info, label: "Information", color: "bg-secondary/10 text-secondary-foreground border-secondary/20" },
  };

  const CategoryIcon = message.category ? categoryConfig[message.category].icon : null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        {!isUser && message.category && CategoryIcon && (
          <Badge variant="outline" className={`mb-2 ${categoryConfig[message.category].color}`}>
            <CategoryIcon className="w-3 h-3 mr-1" />
            {categoryConfig[message.category].label}
          </Badge>
        )}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
