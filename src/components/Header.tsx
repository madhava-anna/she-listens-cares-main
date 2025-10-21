import { Shield, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HeaderProps {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const Header = ({ phoneNumber, setPhoneNumber }: HeaderProps) => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="One Woman" className="w-16 h-16" />
            <div>
              <h1 className="text-xl font-bold text-foreground">One Woman</h1>
              <p className="text-sm text-muted-foreground">Your AI companion for safety, health & support</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-[200px]">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">
              <Label htmlFor="phone" className="sr-only">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-9"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
