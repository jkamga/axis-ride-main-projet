import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import Navbar from "@/components/Navbar";
import { 
  Users,
  Car,
  Wallet,
  AlertTriangle,
  Loader2,
  CheckCircle,
  XCircle,
  Ban,
  RefreshCw,
  Search,
  TrendingUp,
  DollarSign,
  Shield
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [resolution, setResolution] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, paymentsRes, disputesRes, reservationsRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, { headers }),
        axios.get(`${API}/users`, { headers }),
        axios.get(`${API}/admin/payments`, { headers }),
        axios.get(`${API}/disputes`, { headers }),
        axios.get(`${API}/admin/reservations`, { headers })
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setPayments(paymentsRes.data);
      setDisputes(disputesRes.data);
      setReservations(reservationsRes.data);
    } catch (error) {
      console.error(error);
      toast({ title: "Erreur", description: "Impossible de charger les données", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateUser = async (userId) => {
    try {
      await axios.post(`${API}/users/${userId}/validate`, {}, { headers });
      toast({ title: "Succès", description: "Utilisateur validé" });
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de valider", variant: "destructive" });
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      await axios.post(`${API}/users/${userId}/suspend`, {}, { headers });
      toast({ title: "Succès", description: "Utilisateur suspendu" });
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de suspendre", variant: "destructive" });
    }
  };

  const handleReleasePayment = async (paymentId) => {
    try {
      await axios.post(`${API}/payments/${paymentId}/release`, {}, { headers });
      toast({ title: "Succès", description: "Paiement libéré" });
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de libérer", variant: "destructive" });
    }
  };

  const handleRefundPayment = async (paymentId) => {
    try {
      await axios.post(`${API}/payments/${paymentId}/refund`, {}, { headers });
      toast({ title: "Succès", description: "Paiement remboursé" });
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de rembourser", variant: "destructive" });
    }
  };

  const handleResolveDispute = async () => {
    if (!resolution || !selectedDispute) return;
    try {
      await axios.post(`${API}/disputes/${selectedDispute.id}/resolve?resolution=${encodeURIComponent(resolution)}`, {}, { headers });
      toast({ title: "Succès", description: "Litige résolu" });
      setSelectedDispute(null);
      setResolution("");
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de résoudre", variant: "destructive" });
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { label: "Actif", class: "status-active" },
      verified: { label: "Vérifié", class: "status-completed" },
      pending_otp: { label: "En attente", class: "status-pending" },
      suspended: { label: "Suspendu", class: "status-cancelled" },
      completed: { label: "Complété", class: "status-completed" },
      held: { label: "En escrow", class: "status-pending" },
      released: { label: "Libéré", class: "status-active" },
      refunded: { label: "Remboursé", class: "status-cancelled" },
      open: { label: "Ouvert", class: "status-pending" },
      resolved: { label: "Résolu", class: "status-completed" }
    };
    const { label, class: className } = statusMap[status] || { label: status, class: "" };
    return <Badge className={`${className} rounded-full px-3 text-xs`}>{label}</Badge>;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-['Outfit']">
              Administration
            </h1>
            <p className="text-muted-foreground">Tableau de bord administrateur</p>
          </div>
          <Button 
            onClick={fetchData}
            variant="outline"
            className="rounded-full"
            data-testid="refresh-btn"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.users.total}</p>
                    <p className="text-xs text-muted-foreground">Utilisateurs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.users.drivers}</p>
                    <p className="text-xs text-muted-foreground">Conducteurs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.trips.active}</p>
                    <p className="text-xs text-muted-foreground">Trajets actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{(stats.payments_total / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">FCFA Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.disputes_open}</p>
                    <p className="text-xs text-muted-foreground">Litiges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-full flex-wrap">
            <TabsTrigger value="users" className="rounded-full" data-testid="admin-users-tab">
              <Users className="w-4 h-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="payments" className="rounded-full" data-testid="admin-payments-tab">
              <Wallet className="w-4 h-4 mr-2" />
              Paiements
            </TabsTrigger>
            <TabsTrigger value="disputes" className="rounded-full relative" data-testid="admin-disputes-tab">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Litiges
              {stats?.disputes_open > 0 && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                  {stats.disputes_open}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <CardTitle className="font-['Outfit']">Gestion des utilisateurs</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 rounded-full"
                      data-testid="search-users-input"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Rôle</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                            <TableCell className="font-medium">{user.full_name}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize rounded-full">
                                {user.role === "driver" ? "Conducteur" : user.role === "admin" ? "Admin" : "Passager"}
                              </Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>{formatDate(user.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {user.status !== "verified" && user.status !== "suspended" && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleValidateUser(user.id)}
                                    className="rounded-full h-8"
                                    data-testid={`validate-user-${user.id}`}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                )}
                                {user.status !== "suspended" && user.role !== "admin" && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleSuspendUser(user.id)}
                                    className="rounded-full h-8 text-destructive hover:text-destructive"
                                    data-testid={`suspend-user-${user.id}`}
                                  >
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="font-['Outfit']">Gestion des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : payments.length === 0 ? (
                  <div className="text-center py-12">
                    <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucun paiement</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Référence</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Escrow</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((payment) => (
                          <TableRow key={payment.id} data-testid={`payment-row-${payment.id}`}>
                            <TableCell className="font-mono text-sm">{payment.transaction_ref}</TableCell>
                            <TableCell className="font-medium">{payment.amount.toLocaleString()} FCFA</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="rounded-full">
                                {payment.provider === "orange_money" ? "Orange Money" : "MTN MoMo"}
                              </Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell>{getStatusBadge(payment.escrow_status)}</TableCell>
                            <TableCell>{formatDate(payment.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {payment.escrow_status === "held" && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleReleasePayment(payment.id)}
                                      className="rounded-full h-8 bg-primary"
                                      data-testid={`release-payment-${payment.id}`}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Libérer
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleRefundPayment(payment.id)}
                                      className="rounded-full h-8 text-destructive"
                                      data-testid={`refund-payment-${payment.id}`}
                                    >
                                      <XCircle className="w-4 h-4 mr-1" />
                                      Rembourser
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="font-['Outfit']">Gestion des litiges</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : disputes.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucun litige</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {disputes.map((dispute) => (
                      <div 
                        key={dispute.id} 
                        className="border border-border/50 rounded-2xl p-6"
                        data-testid={`dispute-${dispute.id}`}
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Réservation: {dispute.reservation_id.slice(0, 8)}...</span>
                              {getStatusBadge(dispute.status)}
                            </div>
                            <p className="text-muted-foreground">
                              <strong>Raison:</strong> {dispute.reason}
                            </p>
                            <p className="text-muted-foreground text-sm">{dispute.description}</p>
                            {dispute.resolution && (
                              <p className="text-primary text-sm">
                                <strong>Résolution:</strong> {dispute.resolution}
                              </p>
                            )}
                            <p className="text-muted-foreground text-xs">{formatDate(dispute.created_at)}</p>
                          </div>
                          {dispute.status === "open" && (
                            <Button 
                              onClick={() => setSelectedDispute(dispute)}
                              className="rounded-full bg-primary"
                              data-testid={`resolve-dispute-${dispute.id}`}
                            >
                              Résoudre
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Resolve Dispute Dialog */}
      <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-['Outfit']">Résoudre le litige</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground"><strong>Raison:</strong> {selectedDispute?.reason}</p>
              <p className="text-sm text-muted-foreground mt-2">{selectedDispute?.description}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Résolution</label>
              <Textarea 
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="Décrivez la résolution..."
                className="rounded-xl"
                data-testid="resolution-input"
              />
            </div>
            <Button 
              onClick={handleResolveDispute}
              className="w-full rounded-full bg-primary"
              disabled={!resolution}
              data-testid="confirm-resolution-btn"
            >
              Confirmer la résolution
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;