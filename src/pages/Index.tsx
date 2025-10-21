import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import EmergencyActions from "@/components/EmergencyActions";
import Header from "@/components/Header";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <EmergencyActions phoneNumber={phoneNumber} />
        <ChatInterface phoneNumber={phoneNumber} />
      </div>
    </div>
  );
};

export default Index;
