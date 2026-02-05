import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/App";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Crown,
  Check,
  CreditCard,
  Smartphone,
  Calendar,
  Gift,
  ArrowRight,
  Loader2,
  Shield,
  Star
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { token, user } = useAuth();
  const { toast } = useToast();
  
  const [subscription, setSubscription] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  // Mobile Money form
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const isEnglish = i18n.language === "en";

  useEffect(() => {
    if (token) {
      fetchSubscriptionStatus();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/subscriptions/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus(data);
        if (data.has_subscription) {
          const subResponse = await fetch(`${BACKEND_URL}/api/subscriptions/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (subResponse.ok) {
            setSubscription(await subResponse.json());
          }
        }
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const startTrial = async () => {
    if (!token) {
      navigate("/auth?mode=register");
      return;
    }
    
    setProcessing(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/subscriptions/start-trial`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        toast({
          title: isEnglish ? "Free trial started!" : "Essai gratuit activé!",
          description: isEnglish 
            ? "You have 30 days to explore AxisRide" 
            : "Vous avez 30 jours pour découvrir AxisRide"
        });
        fetchSubscriptionStatus();
      } else {
        const error = await response.json();
        toast({
          title: isEnglish ? "Error" : "Erreur",
          description: error.detail,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: isEnglish ? "Error" : "Erreur",
        description: isEnglish ? "An error occurred" : "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const payWithMobileMoney = async () => {
    if (!mobileMoneyProvider || !phoneNumber) {
      toast({
        title: isEnglish ? "Error" : "Erreur",
        description: isEnglish 
          ? "Please fill in all fields" 
          : "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/subscriptions/pay/mobile-money`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          provider: mobileMoneyProvider,
          phone_number: phoneNumber
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        toast({
          title: isEnglish ? "Payment successful!" : "Paiement réussi!",
          description: data.message
        });
        setPaymentMethod(null);
        fetchSubscriptionStatus();
      } else {
        const error = await response.json();
        toast({
          title: isEnglish ? "Payment failed" : "Paiement échoué",
          description: error.detail,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: isEnglish ? "Error" : "Erreur",
        description: isEnglish ? "An error occurred" : "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const payWithStripe = async () => {
    setProcessing(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/subscriptions/pay/stripe/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          origin_url: window.location.origin
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Redirect to Stripe Checkout
        window.location.href = data.checkout_url;
      } else {
        const error = await response.json();
        toast({
          title: isEnglish ? "Error" : "Erreur",
          description: error.detail || (isEnglish ? "Failed to create checkout session" : "Échec de la création de la session de paiement"),
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: isEnglish ? "Error" : "Erreur",
        description: isEnglish ? "An error occurred" : "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  // Check for payment status after Stripe redirect
  const checkStripePaymentStatus = async (sessionId) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/subscriptions/pay/stripe/status/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.payment_status === "paid") {
          toast({
            title: isEnglish ? "Payment successful!" : "Paiement réussi!",
            description: data.message
          });
        } else if (data.status === "expired") {
          toast({
            title: isEnglish ? "Session expired" : "Session expirée",
            description: data.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    } finally {
      setLoading(false);
      fetchSubscriptionStatus();
      // Clean up URL params
      window.history.replaceState({}, document.title, "/subscription");
    }
  };

  // Check URL for Stripe return params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    const paymentStatus = urlParams.get("payment");
    
    if (sessionId && token) {
      checkStripePaymentStatus(sessionId);
    } else if (paymentStatus === "cancelled") {
      toast({
        title: isEnglish ? "Payment cancelled" : "Paiement annulé",
        description: isEnglish ? "Your payment was cancelled" : "Votre paiement a été annulé",
        variant: "destructive"
      });
      window.history.replaceState({}, document.title, "/subscription");
    }
  }, [token]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(isEnglish ? "en-US" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const benefits = [
    isEnglish ? "Unlimited trip search" : "Recherche de trajets illimitée",
    isEnglish ? "Book seats instantly" : "Réservation de places instantanée",
    isEnglish ? "Secure Mobile Money payments" : "Paiements Mobile Money sécurisés",
    isEnglish ? "Trip notifications" : "Notifications de trajets",
    isEnglish ? "Join carpooling groups" : "Rejoindre des groupes de covoiturage",
    isEnglish ? "Rate and review drivers" : "Noter et évaluer les conducteurs",
    isEnglish ? "Priority customer support" : "Support client prioritaire",
    isEnglish ? "No hidden fees" : "Aucun frais caché"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            {isEnglish ? "Annual Subscription" : "Abonnement Annuel"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Outfit']">
            {isEnglish ? "Travel without limits with" : "Voyagez sans limites avec"}{" "}
            <span className="gradient-text">AxisRide</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isEnglish 
              ? "Subscribe for only 5,000 FCFA per year and enjoy all the features of the platform."
              : "Abonnez-vous pour seulement 5 000 FCFA par an et profitez de toutes les fonctionnalités de la plateforme."}
          </p>
        </div>
      </section>

      {/* Current Status */}
      {subscriptionStatus && subscriptionStatus.has_subscription && (
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className={`border-2 ${
              subscriptionStatus.status === "active" ? "border-green-500 bg-green-500/5" :
              subscriptionStatus.status === "trial" ? "border-primary bg-primary/5" :
              "border-destructive bg-destructive/5"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      subscriptionStatus.status === "active" ? "bg-green-500" :
                      subscriptionStatus.status === "trial" ? "bg-primary" :
                      "bg-destructive"
                    }`}>
                      {subscriptionStatus.status === "active" ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : subscriptionStatus.status === "trial" ? (
                        <Gift className="w-6 h-6 text-white" />
                      ) : (
                        <Calendar className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {subscriptionStatus.status === "active" 
                          ? (isEnglish ? "Active Subscription" : "Abonnement Actif")
                          : subscriptionStatus.status === "trial"
                          ? (isEnglish ? "Free Trial" : "Essai Gratuit")
                          : (isEnglish ? "Expired Subscription" : "Abonnement Expiré")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {subscriptionStatus.days_remaining > 0 
                          ? (isEnglish 
                            ? `${subscriptionStatus.days_remaining} days remaining`
                            : `${subscriptionStatus.days_remaining} jours restants`)
                          : (isEnglish ? "Expired" : "Expiré")}
                      </p>
                    </div>
                  </div>
                  {subscriptionStatus.status !== "active" && (
                    <Button 
                      onClick={() => setPaymentMethod("choose")}
                      className="rounded-full bg-primary hover:bg-primary/90"
                    >
                      {subscriptionStatus.status === "trial" 
                        ? (isEnglish ? "Subscribe Now" : "S'abonner maintenant")
                        : (isEnglish ? "Renew" : "Renouveler")}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Pricing Card */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Price Card */}
            <Card className="bg-card border-primary border-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
                <Star className="w-4 h-4 inline mr-1" />
                {isEnglish ? "Best Value" : "Meilleur Rapport Qualité-Prix"}
              </div>
              <CardHeader className="text-center pt-12">
                <CardTitle className="text-3xl font-['Outfit']">
                  {isEnglish ? "Annual Plan" : "Abonnement Annuel"}
                </CardTitle>
                <CardDescription>
                  {isEnglish ? "Full access to all features" : "Accès complet à toutes les fonctionnalités"}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground font-['Outfit']">5 000</span>
                  <span className="text-xl text-muted-foreground ml-2">FCFA</span>
                  <div className="text-muted-foreground">{isEnglish ? "per year" : "par an"}</div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4 mb-6">
                  <Gift className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="font-medium text-foreground">
                    {isEnglish ? "30 days free trial" : "30 jours d'essai gratuit"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isEnglish ? "No credit card required" : "Aucune carte requise"}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {!token ? (
                  <Button 
                    onClick={() => navigate("/auth?mode=register")}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 py-6 text-lg"
                  >
                    {isEnglish ? "Get Started" : "Commencer"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : !subscriptionStatus?.has_subscription ? (
                  <Button 
                    onClick={startTrial}
                    disabled={processing}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 py-6 text-lg"
                  >
                    {processing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isEnglish ? "Start Free Trial" : "Démarrer l'essai gratuit"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                ) : subscriptionStatus?.status !== "active" ? (
                  <Button 
                    onClick={() => setPaymentMethod("choose")}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 py-6 text-lg"
                  >
                    {isEnglish ? "Subscribe Now" : "S'abonner maintenant"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <div className="text-center text-green-600 font-medium py-4">
                    <Check className="w-6 h-6 inline mr-2" />
                    {isEnglish ? "You're subscribed!" : "Vous êtes abonné!"}
                  </div>
                )}
              </CardFooter>
            </Card>

            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 font-['Outfit']">
                {isEnglish ? "What's included" : "Ce qui est inclus"}
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {paymentMethod && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-card">
            <CardHeader>
              <CardTitle className="font-['Outfit']">
                {paymentMethod === "choose" 
                  ? (isEnglish ? "Choose Payment Method" : "Choisir le mode de paiement")
                  : paymentMethod === "mobile_money"
                  ? (isEnglish ? "Mobile Money Payment" : "Paiement Mobile Money")
                  : (isEnglish ? "Card Payment" : "Paiement par carte")}
              </CardTitle>
              <CardDescription>
                {isEnglish 
                  ? "Complete your subscription payment"
                  : "Finalisez le paiement de votre abonnement"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentMethod === "choose" && (
                <div className="space-y-4">
                  <Button
                    onClick={() => setPaymentMethod("mobile_money")}
                    variant="outline"
                    className="w-full h-auto py-4 justify-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Mobile Money</div>
                      <div className="text-sm text-muted-foreground">
                        Orange Money, MTN MoMo
                      </div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => setPaymentMethod("stripe")}
                    variant="outline"
                    className="w-full h-auto py-4 justify-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{isEnglish ? "Credit Card" : "Carte Bancaire"}</div>
                      <div className="text-sm text-muted-foreground">
                        Visa, Mastercard
                      </div>
                    </div>
                  </Button>
                </div>
              )}

              {paymentMethod === "mobile_money" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isEnglish ? "Provider" : "Opérateur"}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={mobileMoneyProvider === "orange_money" ? "default" : "outline"}
                        onClick={() => setMobileMoneyProvider("orange_money")}
                        className="h-auto py-3"
                      >
                        <div className="text-center">
                          <div className="font-semibold">Orange Money</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={mobileMoneyProvider === "mtn_momo" ? "default" : "outline"}
                        onClick={() => setMobileMoneyProvider("mtn_momo")}
                        className="h-auto py-3"
                      >
                        <div className="text-center">
                          <div className="font-semibold">MTN MoMo</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isEnglish ? "Phone Number" : "Numéro de téléphone"}
                    </label>
                    <Input
                      type="tel"
                      placeholder="+221 77 123 45 67"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">{isEnglish ? "Subscription" : "Abonnement"}</span>
                      <span className="font-medium">5 000 FCFA</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>5 000 FCFA</span>
                    </div>
                  </div>
                  <Button
                    onClick={payWithMobileMoney}
                    disabled={processing}
                    className="w-full rounded-full bg-primary hover:bg-primary/90"
                  >
                    {processing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isEnglish ? "Pay 5,000 FCFA" : "Payer 5 000 FCFA"}
                      </>
                    )}
                  </Button>
                </div>
              )}

              {paymentMethod === "stripe" && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">{isEnglish ? "Subscription" : "Abonnement"}</span>
                      <span className="font-medium">5 000 FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{isEnglish ? "Payment in USD" : "Paiement en USD"}</span>
                      <span>≈ $8.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>$8.00 USD</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {isEnglish 
                      ? "You will be redirected to Stripe's secure payment page"
                      : "Vous serez redirigé vers la page de paiement sécurisée Stripe"}
                  </p>
                  <Button
                    onClick={payWithStripe}
                    disabled={processing}
                    className="w-full rounded-full bg-primary hover:bg-primary/90"
                  >
                    {processing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        {isEnglish ? "Pay with Card" : "Payer par carte"}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setPaymentMethod(null);
                  setMobileMoneyProvider("");
                  setPhoneNumber("");
                }}
                className="w-full"
              >
                {isEnglish ? "Cancel" : "Annuler"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Trust Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-4 font-['Outfit']">
            {isEnglish ? "Secure Payments" : "Paiements Sécurisés"}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isEnglish 
              ? "Your payments are secured by our trusted partners Orange Money, MTN MoMo, and Stripe. Your data is encrypted and protected."
              : "Vos paiements sont sécurisés par nos partenaires de confiance Orange Money, MTN MoMo et Stripe. Vos données sont cryptées et protégées."}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubscriptionPage;
