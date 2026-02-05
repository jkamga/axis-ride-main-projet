import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth, API } from "@/App";
import { 
  X, 
  Star,
  Loader2,
  CheckCircle2
} from "lucide-react";

export const ReviewModal = ({ reservation, onClose, onSuccess }) => {
  const { toast } = useToast();
  const { token } = useAuth();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Erreur", description: "Veuillez donner une note", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/reviews`, {
        reservation_id: reservation.id,
        rating,
        comment: comment || null
      }, { headers });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur lors de l'envoi de l'avis";
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
              Merci pour votre avis!
            </h3>
            <p className="text-muted-foreground">
              Votre évaluation aide la communauté AxisRide
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
            data-testid="close-review-modal"
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-center text-2xl font-['Outfit']">Évaluez votre trajet</CardTitle>
          <CardDescription className="text-center">
            Comment s'est passé votre trajet avec {reservation.driver_name}?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trip Info */}
          <div className="bg-muted/50 rounded-2xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Trajet</p>
            <p className="font-semibold text-foreground">
              {reservation.origin} → {reservation.destination}
            </p>
          </div>

          {/* Star Rating */}
          <div className="space-y-3">
            <p className="text-center text-sm font-medium text-foreground">Donnez une note</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                  data-testid={`star-${star}`}
                >
                  <Star 
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating) 
                        ? 'fill-accent text-accent' 
                        : 'text-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {rating === 0 && "Sélectionnez une note"}
              {rating === 1 && "Très insatisfait"}
              {rating === 2 && "Insatisfait"}
              {rating === 3 && "Correct"}
              {rating === 4 && "Satisfait"}
              {rating === 5 && "Excellent!"}
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Commentaire (optionnel)</label>
            <Textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience..."
              className="rounded-xl resize-none"
              rows={3}
              data-testid="review-comment"
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full rounded-full bg-primary hover:bg-primary/90 h-12 font-semibold btn-hover-lift"
            disabled={loading || rating === 0}
            data-testid="submit-review-btn"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Envoyer mon avis"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewModal;
