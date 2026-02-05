import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import Navbar from "@/components/Navbar";
import PaymentModal from "@/components/PaymentModal";
import StarRating from "@/components/StarRating";
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  Car,
  Wallet,
  Users,
  Loader2,
  Phone,
  Star
} from "lucide-react";

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();

  const [trip, setTrip] = useState(null);
  const [driverReviews, setDriverReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const fetchTrip = async () => {
    try {
      const response = await axios.get(`${API}/trips/${tripId}`, { headers });
      setTrip(response.data);
      
      // Fetch driver reviews
      try {
        const reviewsRes = await axios.get(`${API}/drivers/${response.data.driver_id}/reviews`, { headers });
        setDriverReviews(reviewsRes.data);
      } catch (e) {
        console.log("No reviews yet");
      }
    } catch (error) {
      toast({ title: "Erreur", description: "Trajet non trouvé", variant: "destructive" });
      navigate("/passenger");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    setReserving(true);
    try {
      const response = await axios.post(`${API}/trips/${tripId}/reserve`, 
        { trip_id: tripId, seats: 1 },
        { headers }
      );
      toast({ title: "Réservation créée", description: "Procédez au paiement" });
      setSelectedReservation(response.data);
      setShowPayment(true);
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de la réservation";
      toast({ title: "Erreur", description: message, variant: "destructive" });
    } finally {
      setReserving(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedReservation(null);
    toast({ title: "Paiement confirmé", description: "Votre réservation est validée!" });
    navigate("/passenger");
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!trip) return null;

  const isOwnTrip = trip.driver_id === user?.id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 rounded-full"
          data-testid="back-btn"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Route Card */}
            <Card className="bg-card border-border/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Origin */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Départ</p>
                      <p className="text-2xl font-bold text-foreground font-['Outfit']">{trip.origin}</p>
                    </div>
                  </div>

                  {/* Line */}
                  <div className="ml-6 border-l-2 border-dashed border-border h-8" />

                  {/* Destination */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="text-2xl font-bold text-foreground font-['Outfit']">{trip.destination}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="font-['Outfit']">Détails du trajet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{formatDate(trip.departure_time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Heure</p>
                      <p className="font-medium">{formatTime(trip.departure_time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Places disponibles</p>
                      <p className="font-medium">{trip.seats_available} / {trip.seats}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                    <Wallet className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prix par place</p>
                      <p className="font-medium text-lg">{trip.price.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                </div>

                {trip.description && (
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-foreground">{trip.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Info */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-['Outfit']">Conducteur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{trip.driver_name}</p>
                    <StarRating 
                      rating={trip.driver_rating} 
                      count={trip.driver_reviews_count} 
                      showCount={true}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Reviews Preview */}
                {driverReviews && driverReviews.reviews.length > 0 && (
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-sm font-medium mb-3">Derniers avis</p>
                    <div className="space-y-3">
                      {driverReviews.reviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="bg-muted/30 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= review.rating ? 'fill-accent text-accent' : 'text-muted-foreground/20'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.passenger_name}</span>
                          </div>
                          {review.comment && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price & Reserve */}
            <Card className="bg-card border-border/50 sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground">Prix par place</p>
                  <p className="text-4xl font-bold text-primary font-['Outfit']">
                    {trip.price.toLocaleString()} <span className="text-lg">FCFA</span>
                  </p>
                </div>

                {!isOwnTrip && trip.seats_available > 0 && (
                  <Button 
                    onClick={handleReserve}
                    className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-14 text-lg font-semibold btn-hover-lift"
                    disabled={reserving}
                    data-testid="reserve-trip-btn"
                  >
                    {reserving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Réserver maintenant"
                    )}
                  </Button>
                )}

                {isOwnTrip && (
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <Car className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">C'est votre trajet</p>
                  </div>
                )}

                {trip.seats_available === 0 && !isOwnTrip && (
                  <div className="text-center p-4 bg-destructive/10 rounded-xl">
                    <p className="text-destructive font-medium">Complet</p>
                  </div>
                )}

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Paiement sécurisé par Mobile Money
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPayment && selectedReservation && (
        <PaymentModal 
          reservation={selectedReservation}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default TripDetails;