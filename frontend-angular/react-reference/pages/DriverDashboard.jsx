import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import Navbar from "@/components/Navbar";
import StarRating from "@/components/StarRating";
import { 
  Plus,
  Car,
  MapPin,
  Calendar,
  Clock,
  User,
  Wallet,
  Ticket,
  Loader2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token, updateUser } = useAuth();

  const [trips, setTrips] = useState([]);
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const [showDriverSetup, setShowDriverSetup] = useState(false);
  const [validationCode, setValidationCode] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);

  // New trip form
  const [tripForm, setTripForm] = useState({
    origin: "",
    destination: "",
    departure_time: "",
    price: "",
    seats: 4,
    description: ""
  });

  // Driver profile form
  const [driverForm, setDriverForm] = useState({
    license_ref: "",
    vehicle_brand: "",
    vehicle_model: "",
    vehicle_color: "",
    vehicle_plate: "",
    seats_available: 4
  });

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    checkDriverProfile();
  }, []);

  const checkDriverProfile = async () => {
    try {
      const response = await axios.get(`${API}/users/me`, { headers });
      updateUser(response.data);
      
      if (response.data.role !== "driver" || !response.data.driver_profile) {
        setShowDriverSetup(true);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tripsRes, statsRes] = await Promise.all([
        axios.get(`${API}/trips/my`, { headers }),
        axios.get(`${API}/driver/stats`, { headers })
      ]);
      setTrips(tripsRes.data);
      setStats(statsRes.data);

      // Fetch reservations for driver's trips
      const tripIds = tripsRes.data.map(t => t.id);
      if (tripIds.length > 0) {
        // We'll need to get reservations for each trip
        // For now, we'll show trip info directly
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Erreur", description: "Impossible de charger les données", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSetupDriver = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/users/driver-profile`, driverForm, { headers });
      toast({ title: "Profil créé", description: "Votre profil conducteur a été créé" });
      setShowDriverSetup(false);
      checkDriverProfile();
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de la création du profil";
      toast({ title: "Erreur", description: message, variant: "destructive" });
    }
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/trips`, {
        ...tripForm,
        price: parseFloat(tripForm.price),
        seats: parseInt(tripForm.seats)
      }, { headers });
      toast({ title: "Trajet créé", description: "Votre trajet a été publié" });
      setShowCreateTrip(false);
      setTripForm({ origin: "", destination: "", departure_time: "", price: "", seats: 4, description: "" });
      fetchData();
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de la création";
      const isSubscriptionError = message.includes("Abonnement") || message.includes("essai") || message.includes("expiré");
      
      if (isSubscriptionError) {
        toast({ 
          title: "Abonnement requis", 
          description: message,
          variant: "destructive"
        });
        setShowCreateTrip(false);
        // Redirect to subscription page after a short delay
        setTimeout(() => navigate("/subscription"), 2000);
      } else {
        toast({ title: "Erreur", description: message, variant: "destructive" });
      }
    }
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

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { label: "Actif", class: "status-active" },
      completed: { label: "Terminé", class: "status-completed" },
      cancelled: { label: "Annulé", class: "status-cancelled" }
    };
    const { label, class: className } = statusMap[status] || { label: status, class: "" };
    return <Badge className={`${className} rounded-full px-3`}>{label}</Badge>;
  };

  // Driver Setup Dialog
  if (showDriverSetup) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-8 pt-24">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-2xl font-['Outfit']">
                Configurez votre profil conducteur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetupDriver} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Référence du permis</Label>
                    <Input 
                      value={driverForm.license_ref}
                      onChange={(e) => setDriverForm({...driverForm, license_ref: e.target.value})}
                      placeholder="AB-123456"
                      required
                      className="h-12 rounded-xl"
                      data-testid="license-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Marque du véhicule</Label>
                    <Input 
                      value={driverForm.vehicle_brand}
                      onChange={(e) => setDriverForm({...driverForm, vehicle_brand: e.target.value})}
                      placeholder="Toyota"
                      required
                      className="h-12 rounded-xl"
                      data-testid="brand-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Modèle</Label>
                    <Input 
                      value={driverForm.vehicle_model}
                      onChange={(e) => setDriverForm({...driverForm, vehicle_model: e.target.value})}
                      placeholder="Corolla"
                      required
                      className="h-12 rounded-xl"
                      data-testid="model-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Couleur</Label>
                    <Input 
                      value={driverForm.vehicle_color}
                      onChange={(e) => setDriverForm({...driverForm, vehicle_color: e.target.value})}
                      placeholder="Noir"
                      required
                      className="h-12 rounded-xl"
                      data-testid="color-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Immatriculation</Label>
                    <Input 
                      value={driverForm.vehicle_plate}
                      onChange={(e) => setDriverForm({...driverForm, vehicle_plate: e.target.value})}
                      placeholder="DK-1234-AB"
                      required
                      className="h-12 rounded-xl"
                      data-testid="plate-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Places disponibles</Label>
                    <Input 
                      type="number"
                      min="1"
                      max="8"
                      value={driverForm.seats_available}
                      onChange={(e) => setDriverForm({...driverForm, seats_available: parseInt(e.target.value)})}
                      className="h-12 rounded-xl"
                      data-testid="seats-input"
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="w-full rounded-full bg-primary hover:bg-primary/90 h-12 font-semibold"
                  data-testid="setup-driver-btn"
                >
                  Créer mon profil conducteur
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-['Outfit']">
              Espace Conducteur
            </h1>
            <p className="text-muted-foreground">Gérez vos trajets et vos revenus</p>
          </div>
          <Dialog open={showCreateTrip} onOpenChange={setShowCreateTrip}>
            <DialogTrigger asChild>
              <Button 
                className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 btn-hover-lift"
                data-testid="create-trip-btn"
              >
                <Plus className="w-5 h-5 mr-2" />
                Publier un trajet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-['Outfit']">Nouveau trajet</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTrip} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Départ</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                      <Input 
                        value={tripForm.origin}
                        onChange={(e) => setTripForm({...tripForm, origin: e.target.value})}
                        placeholder="Dakar"
                        required
                        className="pl-9 h-11 rounded-xl"
                        data-testid="trip-origin-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                      <Input 
                        value={tripForm.destination}
                        onChange={(e) => setTripForm({...tripForm, destination: e.target.value})}
                        placeholder="Thiès"
                        required
                        className="pl-9 h-11 rounded-xl"
                        data-testid="trip-destination-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date et heure</Label>
                    <Input 
                      type="datetime-local"
                      value={tripForm.departure_time}
                      onChange={(e) => setTripForm({...tripForm, departure_time: e.target.value})}
                      required
                      className="h-11 rounded-xl"
                      data-testid="trip-datetime-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix (FCFA)</Label>
                    <Input 
                      type="number"
                      value={tripForm.price}
                      onChange={(e) => setTripForm({...tripForm, price: e.target.value})}
                      placeholder="2500"
                      required
                      className="h-11 rounded-xl"
                      data-testid="trip-price-input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nombre de places</Label>
                  <Input 
                    type="number"
                    min="1"
                    max="8"
                    value={tripForm.seats}
                    onChange={(e) => setTripForm({...tripForm, seats: parseInt(e.target.value)})}
                    className="h-11 rounded-xl"
                    data-testid="trip-seats-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (optionnel)</Label>
                  <Textarea 
                    value={tripForm.description}
                    onChange={(e) => setTripForm({...tripForm, description: e.target.value})}
                    placeholder="Informations supplémentaires..."
                    className="rounded-xl"
                    data-testid="trip-description-input"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full rounded-full bg-primary hover:bg-primary/90 h-12 font-semibold"
                  data-testid="submit-trip-btn"
                >
                  Publier le trajet
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-card border-border/50 card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground font-['Outfit']">{stats.total_trips}</p>
                    <p className="text-sm text-muted-foreground">Trajets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50 card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground font-['Outfit']">{stats.total_reservations}</p>
                    <p className="text-sm text-muted-foreground">Réservations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50 card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground font-['Outfit']">
                      {stats.average_rating > 0 ? stats.average_rating : '-'}
                    </p>
                    <p className="text-sm text-muted-foreground">Note ({stats.total_reviews})</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50 card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground font-['Outfit']">{stats.total_earnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Gains (FCFA)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50 card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground font-['Outfit']">{stats.pending_earnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">En escrow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trips List */}
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="font-['Outfit']">Mes trajets</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : trips.length === 0 ? (
              <div className="text-center py-12">
                <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun trajet publié</p>
                <Button 
                  onClick={() => setShowCreateTrip(true)}
                  className="mt-4 rounded-full bg-primary"
                >
                  Publier mon premier trajet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {trips.map((trip) => (
                  <div 
                    key={trip.id} 
                    className="border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors"
                    data-testid={`driver-trip-${trip.id}`}
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="font-medium text-foreground">{trip.origin}</span>
                          <span className="text-muted-foreground">→</span>
                          <div className="w-3 h-3 rounded-full bg-secondary" />
                          <span className="font-medium text-foreground">{trip.destination}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(trip.departure_time)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {trip.seats_available}/{trip.seats} places
                          </div>
                          <div className="flex items-center gap-1">
                            <Wallet className="w-4 h-4" />
                            {trip.price.toLocaleString()} FCFA
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(trip.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DriverDashboard;