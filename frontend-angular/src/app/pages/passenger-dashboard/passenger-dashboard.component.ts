import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TripService } from '../../core/services/trip.service';

interface DashboardStats {
  totalTrips: number;
  upcomingTrips: number;
  savedMoney: number;
  carbonSaved: number;
}

interface Trip {
  id: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  driver: {
    name: string;
    rating: number;
    avatar?: string;
  };
}

@Component({
  selector: 'app-passenger-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './passenger-dashboard.component.html',
  styleUrls: ['./passenger-dashboard.component.scss']
})
export class PassengerDashboardComponent implements OnInit {
  isLoading = true;
  userName = '';

  stats: DashboardStats = {
    totalTrips: 0,
    upcomingTrips: 0,
    savedMoney: 0,
    carbonSaved: 0
  };

  upcomingTrips: Trip[] = [];
  recentTrips: Trip[] = [];

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDashboardData();
  }

  loadUserData(): void {
    // Get user from localStorage or service
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        this.userName = userData.fullName || 'Passenger';
      } catch {
        this.userName = 'Passenger';
      }
    }
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Mock data - replace with actual service calls
    setTimeout(() => {
      this.stats = {
        totalTrips: 24,
        upcomingTrips: 2,
        savedMoney: 45000,
        carbonSaved: 182
      };

      this.upcomingTrips = [
        {
          id: '1',
          departure: 'Dakar',
          destination: 'Thiès',
          date: '2025-02-10',
          time: '08:00',
          price: 2500,
          status: 'upcoming',
          driver: {
            name: 'Amadou Diallo',
            rating: 4.8,
            avatar: 'https://i.pravatar.cc/150?img=1'
          }
        },
        {
          id: '2',
          departure: 'Dakar',
          destination: 'Saint-Louis',
          date: '2025-02-15',
          time: '14:00',
          price: 5000,
          status: 'upcoming',
          driver: {
            name: 'Fatou Sarr',
            rating: 4.9,
            avatar: 'https://i.pravatar.cc/150?img=2'
          }
        }
      ];

      this.recentTrips = [
        {
          id: '3',
          departure: 'Dakar',
          destination: 'Thiès',
          date: '2025-02-01',
          time: '09:00',
          price: 2500,
          status: 'completed',
          driver: {
            name: 'Moussa Koné',
            rating: 4.7,
            avatar: 'https://i.pravatar.cc/150?img=3'
          }
        },
        {
          id: '4',
          departure: 'Thiès',
          destination: 'Dakar',
          date: '2025-01-28',
          time: '17:00',
          price: 2500,
          status: 'completed',
          driver: {
            name: 'Aïcha Traoré',
            rating: 5.0,
            avatar: 'https://i.pravatar.cc/150?img=4'
          }
        }
      ];

      this.isLoading = false;
    }, 800);
  }

  viewTrip(tripId: string): void {
    this.router.navigate(['/trips', tripId]);
  }

  searchTrips(): void {
    this.router.navigate(['/trips']);
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'bg-secondary/10 text-secondary';
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }
}
