import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import { 
  X, 
  Phone, 
  Loader2,
  CheckCircle2,
  Wallet,
  Shield
} from "lucide-react";

export const PaymentModal = ({ reservation, onClose, onSuccess }) => {
  const { toast } = useToast();
  const { token } = useAuth();
  
  const [provider, setProvider] = useState("orange_money");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast({ title: "Erreur", description: "Entrez votre numéro Mobile Money", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/payments/initiate`, {
        reservation_id: reservation.id,
        provider,
        phone_number: phoneNumber
      }, { headers });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur de paiement";
      toast({ title: "Erreur", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border/50 animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2 font-['Outfit']">
              Paiement réussi!
            </h3>
            <p className="text-muted-foreground mb-4">
              Votre réservation est confirmée
            </p>
            <div className="bg-primary/10 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Code de réservation</p>
              <p className="text-3xl font-mono font-bold text-primary tracking-wider">
                {reservation.code}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Présentez ce code au conducteur
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border/50 animate-scale-in">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-4 top-4 rounded-full"
            onClick={onClose}
            data-testid="close-payment-modal"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-secondary" />
          </div>
          <CardTitle className="text-center text-2xl font-['Outfit']">Paiement Mobile Money</CardTitle>
          <CardDescription className="text-center">
            Payez en toute sécurité via Mobile Money
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount */}
          <div className="bg-muted/50 rounded-2xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Montant à payer</p>
            <p className="text-4xl font-bold text-foreground font-['Outfit']">
              {reservation.amount.toLocaleString()} <span className="text-lg">FCFA</span>
            </p>
          </div>

          {/* Provider Selection */}
          <div className="space-y-3">
            <Label>Choisir le mode de paiement</Label>
            <RadioGroup value={provider} onValueChange={setProvider} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="orange_money" id="orange" className="peer sr-only" />
                <Label 
                  htmlFor="orange" 
                  className="flex flex-col items-center justify-center p-4 border-2 border-border rounded-xl cursor-pointer hover:border-orange-500/50 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-500/5 transition-all"
                  data-testid="provider-orange"
                >
                  <div className="w-12 h-12 rounded-full provider-orange flex items-center justify-center mb-2">
                    <span className="text-white font-bold text-xl">OM</span>
                  </div>
                  <span className="font-medium text-sm">Orange Money</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="mtn_momo" id="mtn" className="peer sr-only" />
                <Label 
                  htmlFor="mtn" 
                  className="flex flex-col items-center justify-center p-4 border-2 border-border rounded-xl cursor-pointer hover:border-yellow-500/50 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-500/5 transition-all"
                  data-testid="provider-mtn"
                >
                  <div className="w-12 h-12 rounded-full provider-mtn flex items-center justify-center mb-2">
                    <span className="font-bold text-xl">MTN</span>
                  </div>
                  <span className="font-medium text-sm">MTN MoMo</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="payment-phone">Numéro {provider === "orange_money" ? "Orange Money" : "MTN MoMo"}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                id="payment-phone"
                type="tel"
                placeholder="+221 77 123 45 67"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 h-12 rounded-xl"
                data-testid="payment-phone-input"
              />
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-xl p-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <p>Paiement sécurisé avec escrow. L'argent sera libéré après validation du trajet.</p>
          </div>

          {/* Pay Button */}
          <Button 
            onClick={handlePayment}
            className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-14 text-lg font-semibold btn-hover-lift"
            disabled={loading}
            data-testid="confirm-payment-btn"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Payer {reservation.amount.toLocaleString()} FCFA
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;