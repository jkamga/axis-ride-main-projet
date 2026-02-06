import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TripService } from '../../core/services/trip.service';

interface DriverStats {
  totalTrips: number;
  totalEarnings: number;
  rating: number;
  totalPassengers: number;
}

interface DriverTrip {
  id: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  bookedSeats: number;
  availableSeats: number;
  status: 'active' | 'completed' | 'cancelled';
  earnings: number;
}

interface Earning {
  month: string;
  amount: number;
  trips: number;
}

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent implements OnInit {
  isLoading = true;
  userName = '';

  stats: DriverStats = {
    totalTrips: 0,
    totalEarnings: 0,
    rating: 0,
    totalPassengers: 0
  };

  activeTrips: DriverTrip[] = [];
  completedTrips: DriverTrip[] = [];
  monthlyEarnings: Earning[] = [];

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDashboardData();
  }

  loadUserData(): void {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        this.userName = userData.fullName || 'Driver';
      } catch {
        this.userName = 'Driver';
      }
    }
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Mock data - replace with actual service calls
    setTimeout(() => {
      this.stats = {
        totalTrips: 87,
        totalEarnings: 175000,
        rating: 4.8,
        totalPassengers: 234
      };

      this.activeTrips = [
        {
          id: '1',
          departure: 'Dakar',
          destination: 'Thiès',
          date: '2025-02-10',
          time: '08:00',
          price: 2500,
          bookedSeats: 2,
          availableSeats: 2,
          status: 'active',
          earnings: 5000
        },
        {
          id: '2',
          departure: 'Dakar',
          destination: 'Saint-Louis',
          date: '2025-02-15',
          time: '14:00',
          price: 5000,
          bookedSeats: 1,
          availableSeats: 3,
          status: 'active',
          earnings: 5000
        }
      ];

      this.completedTrips = [
        {
          id: '3',
          departure: 'Dakar',
          destination: 'Thiès',
          date: '2025-02-05',
          time: '09:00',
          price: 2500,
          bookedSeats: 3,
          availableSeats: 1,
          status: 'completed',
          earnings: 7500
        },
        {
          id: '4',
          departure: 'Thiès',
          destination: 'Dakar',
          date: '2025-02-03',
          time: '17:00',
          price: 2500,
          bookedSeats: 4,
          availableSeats: 0,
          status: 'completed',
          earnings: 10000
        }
      ];

      this.monthlyEarnings = [
        { month: 'Jan', amount: 45000, trips: 15 },
        { month: 'Feb', amount: 60000, trips: 20 },
        { month: 'Mar', amount: 70000, trips: 24 }
      ];

      this.isLoading = false;
    }, 800);
  }

  viewTrip(tripId: string): void {
    this.router.navigate(['/trips', tripId]);
  }

  createTrip(): void {
    // Navigate to trip creation page
    this.router.navigate(['/trips/create']);
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-secondary/10 text-secondary';
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }

  getProgressPercentage(trip: DriverTrip): number {
    const totalSeats = trip.bookedSeats + trip.availableSeats;
    return (trip.bookedSeats / totalSeats) * 100;
  }
}
