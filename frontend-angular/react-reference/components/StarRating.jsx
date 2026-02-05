import { Star } from "lucide-react";

export const StarRating = ({ rating, showCount = false, count = 0, size = "sm" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const iconSize = sizeClasses[size] || sizeClasses.sm;

  if (rating === null || rating === undefined) {
    return (
      <span className="text-xs text-muted-foreground">Nouveau</span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating) 
                ? 'fill-accent text-accent' 
                : 'text-muted-foreground/20'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-foreground ml-1">{rating.toFixed(1)}</span>
      {showCount && count > 0 && (
        <span className="text-xs text-muted-foreground">({count} avis)</span>
      )}
    </div>
  );
};

export default StarRating;
