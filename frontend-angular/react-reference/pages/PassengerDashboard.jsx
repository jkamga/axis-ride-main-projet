import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import Navbar from "@/components/Navbar";
import PaymentModal from "@/components/PaymentModal";
import ReviewModal from "@/components/ReviewModal";
import StarRating from "@/components/StarRating";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  User,
  Car,
  Ticket,
  Loader2,
  ArrowRight,
  Bell,
  Wallet,
  Star
} from "lucide-react";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();

  const [trips, setTrips] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrigin, setSearchOrigin] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [selectedReviewReservation, setSelectedReviewReservation] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tripsRes, reservationsRes, notificationsRes, pendingRes] = await Promise.all([
        axios.get(`${API}/trips`, { headers }),
        axios.get(`${API}/reservations/my`, { headers }),
        axios.get(`${API}/notifications`, { headers }),
        axios.get(`${API}/reviews/pending`, { headers })
      ]);
      setTrips(tripsRes.data);
      setReservations(reservationsRes.data);
      setNotifications(notificationsRes.data);
      setPendingReviews(pendingRes.data);
    } catch (error) {
      console.error(error);
      toast({ title: "Erreur", description: "Impossible de charger les données", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const searchTrips = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchOrigin) params.append("origin", searchOrigin);
      if (searchDestination) params.append("destination", searchDestination);
      
      const response = await axios.get(`${API}/trips?${params}`, { headers });
      setTrips(response.data);
    } catch (error) {
      toast({ title: "Erreur", description: "Erreur lors de la recherche", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (tripId) => {
    try {
      const response = await axios.post(`${API}/trips/${tripId}/reserve`, 
        { trip_id: tripId, seats: 1 },
        { headers }
      );
      toast({ title: "Réservation créée", description: "Procédez au paiement" });
      setSelectedReservation(response.data);
      setShowPayment(true);
      fetchData();
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de la réservation";
      const isSubscriptionError = message.includes("Abonnement") || message.includes("essai") || message.includes("expiré");
      
      if (isSubscriptionError) {
        toast({ 
          title: "Abonnement requis", 
          description: message,
          variant: "destructive"
        });
        // Redirect to subscription page after a short delay
        setTimeout(() => navigate("/subscription"), 2000);
      } else {
        toast({ title: "Erreur", description: message, variant: "destructive" });
      }
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedReservation(null);
    fetchData();
    toast({ title: "Paiement confirmé", description: "Votre réservation est validée!" });
  };

  const handleReviewSuccess = () => {
    setShowReview(false);
    setSelectedReviewReservation(null);
    fetchData();
    toast({ title: "Avis envoyé", description: "Merci pour votre retour!" });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending_payment: { label: "En attente de paiement", class: "status-pending" },
      paid: { label: "Payé", class: "status-completed" },
      validated: { label: "Validé", class: "status-active" },
      cancelled: { label: "Annulé", class: "status-cancelled" },
      refunded: { label: "Remboursé", class: "status-cancelled" }
    };
    const { label, class: className } = statusMap[status] || { label: status, class: "" };
    return <Badge className={`${className} rounded-full px-3`}>{label}</Badge>;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-['Outfit']">
              Bonjour, {user?.full_name?.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground">Trouvez votre prochain trajet</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="rounded-full relative"
              onClick={() => navigate("/groups")}
              data-testid="groups-btn"
            >
              <User className="w-5 h-5 mr-2" />
              Mes Axes
            </Button>
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-secondary text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadNotifications}
              </Badge>
            )}
          </div>
        </div>

        {/* Pending Reviews Banner */}
        {pendingReviews.length > 0 && (
          <Card className="bg-accent/10 border-accent/30 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {pendingReviews.length} trajet(s) à évaluer
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Partagez votre expérience avec la communauté
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setSelectedReviewReservation(pendingReviews[0]);
                    setShowReview(true);
                  }}
                  className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  data-testid="review-now-btn"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Donner mon avis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Bar */}
        <Card className="bg-card border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input 
                  placeholder="Départ (ex: Dakar)"
                  value={searchOrigin}
                  onChange={(e) => setSearchOrigin(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  data-testid="search-origin-input"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <Input 
                  placeholder="Destination (ex: Thiès)"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  data-testid="search-destination-input"
                />
              </div>
              <Button 
                onClick={searchTrips}
                className="rounded-full bg-primary hover:bg-primary/90 h-12 font-semibold btn-hover-lift"
                disabled={loading}
                data-testid="search-trips-btn"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-full">
            <TabsTrigger value="trips" className="rounded-full px-6" data-testid="trips-tab">
              <Car className="w-4 h-4 mr-2" />
              Trajets disponibles
            </TabsTrigger>
            <TabsTrigger value="reservations" className="rounded-full px-6" data-testid="reservations-tab">
              <Ticket className="w-4 h-4 mr-2" />
              Mes réservations
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-full px-6 relative" data-testid="notifications-tab">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {unreadNotifications > 0 && (
                <span className="ml-2 bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Trips Tab */}
          <TabsContent value="trips">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : trips.length === 0 ? (
              <Card className="bg-card/50 border-dashed">
                <CardContent className="py-12 text-center">
                  <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucun trajet disponible</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <Card 
                    key={trip.id} 
                    className="bg-card border-border/50 card-hover cursor-pointer"
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    data-testid={`trip-card-${trip.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{trip.driver_name}</p>
                          <StarRating 
                            rating={trip.driver_rating} 
                            count={trip.driver_reviews_count} 
                            showCount={true}
                            size="xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-foreground font-medium">{trip.origin}</span>
                        </div>
                        <div className="ml-1.5 border-l-2 border-dashed border-border h-4" />
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-secondary" />
                          <span className="text-foreground font-medium">{trip.destination}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(trip.departure_time)}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {trip.seats_available} places
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary font-['Outfit']">
                          {trip.price.toLocaleString()} <span className="text-sm font-normal">FCFA</span>
                        </span>
                        <Button 
                          size="sm"
                          className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReserve(trip.id);
                          }}
                          data-testid={`reserve-btn-${trip.id}`}
                        >
                          Réserver
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            {reservations.length === 0 ? (
              <Card className="bg-card/50 border-dashed">
                <CardContent className="py-12 text-center">
                  <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune réservation</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <Card key={reservation.id} className="bg-card border-border/50" data-testid={`reservation-card-${reservation.id}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">Réservation #{reservation.code}</span>
                            {getStatusBadge(reservation.status)}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {reservation.seats} place(s) • {reservation.amount.toLocaleString()} FCFA
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {formatDate(reservation.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {reservation.status === "pending_payment" && (
                            <Button 
                              onClick={() => {
                                setSelectedReservation(reservation);
                                setShowPayment(true);
                              }}
                              className="rounded-full bg-secondary hover:bg-secondary/90"
                              data-testid={`pay-btn-${reservation.id}`}
                            >
                              <Wallet className="w-4 h-4 mr-2" />
                              Payer maintenant
                            </Button>
                          )}
                          {reservation.status === "paid" && (
                            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-mono text-lg font-bold">
                              Code: {reservation.code}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            {notifications.length === 0 ? (
              <Card className="bg-card/50 border-dashed">
                <CardContent className="py-12 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune notification</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`bg-card border-border/50 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                    data-testid={`notification-${notification.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">{notification.title}</p>
                          <p className="text-muted-foreground text-sm">{notification.message}</p>
                          <p className="text-muted-foreground text-xs mt-1">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Payment Modal */}
      {showPayment && selectedReservation && (
        <PaymentModal 
          reservation={selectedReservation}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Review Modal */}
      {showReview && selectedReviewReservation && (
        <ReviewModal 
          reservation={selectedReviewReservation}
          onClose={() => setShowReview(false)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
};

export default PassengerDashboard;