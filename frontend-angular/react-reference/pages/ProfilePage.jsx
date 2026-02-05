import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import Navbar from "@/components/Navbar";
import { 
  User,
  Phone,
  Car,
  Shield,
  CheckCircle,
  Loader2,
  Edit
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { label: "Actif", class: "status-active" },
      verified: { label: "Vérifié", class: "status-completed" },
      pending_otp: { label: "En attente", class: "status-pending" },
      suspended: { label: "Suspendu", class: "status-cancelled" }
    };
    const { label, class: className } = statusMap[status] || { label: status, class: "" };
    return <Badge className={`${className} rounded-full px-3`}>{label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold text-foreground mb-8 font-['Outfit']">
          Mon Profil
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground font-['Outfit']">{user?.full_name}</h2>
                <p className="text-muted-foreground mb-3">{user?.phone}</p>
                <div className="flex justify-center gap-2">
                  {getStatusBadge(user?.status)}
                  <Badge variant="outline" className="rounded-full capitalize">
                    {user?.role === "driver" ? "Conducteur" : user?.role === "admin" ? "Admin" : "Passager"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Cards */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="font-['Outfit']">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Nom complet</span>
                    </div>
                    <p className="font-medium">{user?.full_name}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Téléphone</span>
                    </div>
                    <p className="font-medium">{user?.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Profile */}
            {user?.role === "driver" && user?.driver_profile && (
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-['Outfit']">Profil conducteur</CardTitle>
                    {user.driver_profile.verified && (
                      <Badge className="status-completed rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Permis</span>
                      </div>
                      <p className="font-medium">{user.driver_profile.license_ref}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Véhicule</span>
                      </div>
                      <p className="font-medium">
                        {user.driver_profile.vehicle_brand} {user.driver_profile.vehicle_model}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">Couleur</span>
                      <p className="font-medium">{user.driver_profile.vehicle_color}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">Immatriculation</span>
                      <p className="font-medium">{user.driver_profile.vehicle_plate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Become Driver CTA */}
            {user?.role === "passenger" && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Car className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Devenez conducteur</h3>
                        <p className="text-muted-foreground text-sm">Gagnez de l'argent en partageant vos trajets</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate("/driver")}
                      className="rounded-full bg-primary hover:bg-primary/90"
                      data-testid="become-driver-btn"
                    >
                      Commencer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;