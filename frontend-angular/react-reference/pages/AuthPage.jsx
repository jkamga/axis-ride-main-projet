import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import { 
  Car, 
  Phone, 
  User, 
  ArrowLeft, 
  Loader2,
  KeyRound,
  CheckCircle2
} from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { login, token } = useAuth();

  const [mode, setMode] = useState(searchParams.get("mode") || "login");
  const [step, setStep] = useState("phone"); // phone, otp
  const [loading, setLoading] = useState(false);

  // Form data
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(searchParams.get("role") || "passenger");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!phone || !fullName) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/register`, {
        phone,
        full_name: fullName,
        role
      });
      setDemoOtp(response.data.demo_otp);
      setStep("otp");
      toast({ title: "OTP envoyé", description: "Vérifiez votre téléphone" });
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de l'inscription";
      toast({ title: "Erreur", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone) {
      toast({ title: "Erreur", description: "Veuillez entrer votre numéro", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login`, { phone });
      setDemoOtp(response.data.demo_otp);
      setStep("otp");
      toast({ title: "OTP envoyé", description: "Vérifiez votre téléphone" });
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de la connexion";
      toast({ title: "Erreur", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({ title: "Erreur", description: "Veuillez entrer le code complet", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "register" ? "/auth/otp/verify" : "/auth/token";
      const response = await axios.post(`${API}${endpoint}`, { phone, otp });
      
      // Fetch user data
      const userResponse = await axios.get(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      
      login(response.data.token, userResponse.data);
      toast({ title: "Bienvenue!", description: "Connexion réussie" });
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.detail || "Code OTP invalide";
      toast({ title: "Erreur", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1758061324477-a152aa3a7b0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBlbGVjdHJpYyUyMGNhciUyMGNpdHklMjBzdHJlZXQlMjBhZnJpY2F8ZW58MHx8fHwxNzY5Nzk2NzkyfDA&ixlib=rb-4.1.0&q=85"
          alt="Auth background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      </div>

      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="rounded-full"
          data-testid="back-home-btn"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Accueil
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
              <Car className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground font-['Outfit']">AxisRide</span>
          </div>

          {step === "phone" ? (
            <Card className="bg-card/80 backdrop-blur-lg border-border/50 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-['Outfit']">
                  {mode === "register" ? "Créer un compte" : "Se connecter"}
                </CardTitle>
                <CardDescription>
                  {mode === "register" 
                    ? "Rejoignez la communauté AxisRide" 
                    : "Connectez-vous avec votre numéro"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={mode} onValueChange={setMode} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" data-testid="login-tab">Connexion</TabsTrigger>
                    <TabsTrigger value="register" data-testid="register-tab">Inscription</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="login-phone">Numéro de téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input 
                            id="login-phone"
                            type="tel"
                            placeholder="+221 77 123 45 67"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10 h-12 rounded-xl"
                            data-testid="login-phone-input"
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full rounded-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold btn-hover-lift"
                        disabled={loading}
                        data-testid="login-submit-btn"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Recevoir le code OTP"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Nom complet</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input 
                            id="register-name"
                            type="text"
                            placeholder="Votre nom complet"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="pl-10 h-12 rounded-xl"
                            data-testid="register-name-input"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-phone">Numéro de téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input 
                            id="register-phone"
                            type="tel"
                            placeholder="+221 77 123 45 67"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10 h-12 rounded-xl"
                            data-testid="register-phone-input"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label>Je suis</Label>
                        <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-4">
                          <div>
                            <RadioGroupItem value="passenger" id="passenger" className="peer sr-only" />
                            <Label 
                              htmlFor="passenger" 
                              className="flex flex-col items-center justify-center p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                              data-testid="role-passenger"
                            >
                              <User className="w-6 h-6 mb-2" />
                              <span className="font-medium">Passager</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="driver" id="driver" className="peer sr-only" />
                            <Label 
                              htmlFor="driver" 
                              className="flex flex-col items-center justify-center p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                              data-testid="role-driver"
                            >
                              <Car className="w-6 h-6 mb-2" />
                              <span className="font-medium">Conducteur</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 text-base font-semibold btn-hover-lift"
                        disabled={loading}
                        data-testid="register-submit-btn"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Créer mon compte"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card/80 backdrop-blur-lg border-border/50 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-['Outfit']">Vérification OTP</CardTitle>
                <CardDescription>
                  Entrez le code envoyé au {phone}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Demo OTP display */}
                {demoOtp && (
                  <div className="bg-accent/20 border border-accent/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Code de démonstration:</p>
                    <p className="text-2xl font-mono font-bold text-accent-foreground tracking-widest">{demoOtp}</p>
                  </div>
                )}

                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otp} 
                    onChange={setOtp}
                    data-testid="otp-input"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button 
                  onClick={handleVerifyOtp}
                  className="w-full rounded-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold btn-hover-lift"
                  disabled={loading || otp.length !== 6}
                  data-testid="verify-otp-btn"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Vérifier et continuer
                    </>
                  )}
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={() => setStep("phone")}
                  className="w-full rounded-full"
                  data-testid="back-to-phone-btn"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Modifier le numéro
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;