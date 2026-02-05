import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { 
  Plus,
  Users,
  MapPin,
  Loader2,
  UserPlus,
  Car
} from "lucide-react";

const GroupsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupForm, setGroupForm] = useState({
    name: "",
    origin: "",
    destination: "",
    description: ""
  });

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API}/groups`, { headers });
      setGroups(response.data);
    } catch (error) {
      console.error(error);
      toast({ title: "Erreur", description: "Impossible de charger les groupes", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/groups`, groupForm, { headers });
      toast({ title: "Groupe créé", description: "Votre axe a été créé avec succès" });
      setShowCreateGroup(false);
      setGroupForm({ name: "", origin: "", destination: "", description: "" });
      fetchGroups();
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de la création";
      const isSubscriptionError = message.includes("Abonnement") || message.includes("essai") || message.includes("expiré");
      
      if (isSubscriptionError) {
        toast({ 
          title: "Abonnement requis", 
          description: message,
          variant: "destructive"
        });
        setShowCreateGroup(false);
        setTimeout(() => navigate("/subscription"), 2000);
      } else {
        toast({ title: "Erreur", description: message, variant: "destructive" });
      }
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      await axios.post(`${API}/groups/${groupId}/members`, {}, { headers });
      toast({ title: "Succès", description: "Vous avez rejoint le groupe" });
      fetchGroups();
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur";
      const isSubscriptionError = message.includes("Abonnement") || message.includes("essai") || message.includes("expiré");
      
      if (isSubscriptionError) {
        toast({ 
          title: "Abonnement requis", 
          description: message,
          variant: "destructive"
        });
        setTimeout(() => navigate("/subscription"), 2000);
      } else {
        toast({ title: "Erreur", description: message, variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-['Outfit']">
              Mes Axes
            </h1>
            <p className="text-muted-foreground">Rejoignez des communautés de covoiturage</p>
          </div>
          <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
            <DialogTrigger asChild>
              <Button 
                className="rounded-full bg-primary hover:bg-primary/90 px-6 btn-hover-lift"
                data-testid="create-group-btn"
              >
                <Plus className="w-5 h-5 mr-2" />
                Créer un axe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-['Outfit']">Nouvel axe de covoiturage</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateGroup} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Nom de l'axe</Label>
                  <Input 
                    value={groupForm.name}
                    onChange={(e) => setGroupForm({...groupForm, name: e.target.value})}
                    placeholder="Ex: Dakar - Thiès Express"
                    required
                    className="h-11 rounded-xl"
                    data-testid="group-name-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Origine</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                      <Input 
                        value={groupForm.origin}
                        onChange={(e) => setGroupForm({...groupForm, origin: e.target.value})}
                        placeholder="Dakar"
                        required
                        className="pl-9 h-11 rounded-xl"
                        data-testid="group-origin-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                      <Input 
                        value={groupForm.destination}
                        onChange={(e) => setGroupForm({...groupForm, destination: e.target.value})}
                        placeholder="Thiès"
                        required
                        className="pl-9 h-11 rounded-xl"
                        data-testid="group-destination-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description (optionnel)</Label>
                  <Textarea 
                    value={groupForm.description}
                    onChange={(e) => setGroupForm({...groupForm, description: e.target.value})}
                    placeholder="Décrivez votre axe de covoiturage..."
                    className="rounded-xl"
                    data-testid="group-description-input"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full rounded-full bg-primary hover:bg-primary/90 h-12 font-semibold"
                  data-testid="submit-group-btn"
                >
                  Créer l'axe
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Groups Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : groups.length === 0 ? (
          <Card className="bg-card/50 border-dashed">
            <CardContent className="py-16 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Aucun axe disponible</h3>
              <p className="text-muted-foreground mb-6">Soyez le premier à créer un axe de covoiturage</p>
              <Button 
                onClick={() => setShowCreateGroup(true)}
                className="rounded-full bg-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Créer mon premier axe
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card 
                key={group.id} 
                className="bg-card border-border/50 card-hover"
                data-testid={`group-card-${group.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className="status-active rounded-full">
                      {group.members_count} membres
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 font-['Outfit']">
                    {group.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{group.origin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-muted-foreground">{group.destination}</span>
                    </div>
                  </div>

                  {group.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {group.description}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/passenger?group=${group.id}`)}
                      className="flex-1 rounded-full"
                      data-testid={`view-trips-${group.id}`}
                    >
                      <Car className="w-4 h-4 mr-2" />
                      Trajets
                    </Button>
                    <Button 
                      onClick={() => handleJoinGroup(group.id)}
                      className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                      data-testid={`join-group-${group.id}`}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Rejoindre
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GroupsPage;