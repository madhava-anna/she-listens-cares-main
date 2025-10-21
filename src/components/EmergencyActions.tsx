import { AlertCircle, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EmergencyActionsProps {
  phoneNumber: string;
}

const EmergencyActions = ({ phoneNumber }: EmergencyActionsProps) => {
  const { toast } = useToast();

  const sendEmergencySMS = (type: "safety" | "health" | "complaint") => {
    const messages = {
      safety: "Emergency SMS sent to nearest police station with your location and phone number: " + (phoneNumber || "Not provided"),
      health: "Emergency SMS sent to nearest hospital with your location and phone number: " + (phoneNumber || "Not provided"),
      complaint: "Complaint SMS sent to authorities with your details and phone number: " + (phoneNumber || "Not provided")
    };

    toast({
      title: "Emergency Alert Sent",
      description: messages[type],
      duration: 5000,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Button
        onClick={() => sendEmergencySMS("safety")}
        className="h-auto py-4 flex-col gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        size="lg"
      >
        <AlertCircle className="w-6 h-6" />
        <div className="text-center">
          <div className="font-bold">Safety Emergency</div>
          <div className="text-xs opacity-90">Alert Police</div>
        </div>
      </Button>
      
      <Button
        onClick={() => sendEmergencySMS("health")}
        className="h-auto py-4 flex-col gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
        size="lg"
      >
        <Heart className="w-6 h-6" />
        <div className="text-center">
          <div className="font-bold">Health Emergency</div>
          <div className="text-xs opacity-90">Alert Hospital</div>
        </div>
      </Button>
      
      <Button
        onClick={() => sendEmergencySMS("complaint")}
        className="h-auto py-4 flex-col gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        size="lg"
      >
        <Info className="w-6 h-6" />
        <div className="text-center">
          <div className="font-bold">File Complaint</div>
          <div className="text-xs opacity-90">Report to Authorities</div>
        </div>
      </Button>
    </div>
  );
};

export default EmergencyActions;
