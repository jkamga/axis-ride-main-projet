import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TripService } from '../../core/services/trip.service';

interface Trip {
  id: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  driver: {
    name: string;
    rating: number;
    reviews: number;
    avatar?: string;
  };
  duration: string;
  preferences: {
    smoking: boolean;
    music: boolean;
    pets: boolean;
  };
}

@Component({
  selector: 'app-trip-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export class TripSearchComponent implements OnInit {
  isLoading = false;
  showFilters = false;
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];

  searchForm = this.fb.group({
    departure: ['', Validators.required],
    destination: ['', Validators.required],
    date: ['', Validators.required],
    passengers: [1, [Validators.required, Validators.min(1)]]
  });

  filterForm = this.fb.group({
    maxPrice: [100],
    departureTime: ['any'],
    sortBy: ['price']
  });

  // Popular routes for quick search
  popularRoutes = [
    { from: 'Dakar', to: 'Thiès' },
    { from: 'Abidjan', to: 'Yamoussoukro' },
    { from: 'Douala', to: 'Yaoundé' },
    { from: 'Lagos', to: 'Ibadan' }
  ];

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load trips from service
    this.loadTrips();
  }

  loadTrips(): void {
    this.isLoading = true;

    // Mock data for now - replace with actual service call
    setTimeout(() => {
      this.trips = [
        {
          id: '1',
          departure: 'Dakar',
          destination: 'Thiès',
          date: '2025-02-10',
          time: '08:00',
          price: 2500,
          availableSeats: 3,
          driver: {
            name: 'Amadou Diallo',
            rating: 4.8,
            reviews: 45,
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          duration: '1h 30min',
          preferences: {
            smoking: false,
            music: true,
            pets: false
          }
        },
        {
          id: '2',
          departure: 'Dakar',
          destination: 'Thiès',
          date: '2025-02-10',
          time: '14:00',
          price: 3000,
          availableSeats: 2,
          driver: {
            name: 'Fatou Sarr',
            rating: 4.9,
            reviews: 67,
            avatar: 'https://i.pravatar.cc/150?img=2'
          },
          duration: '1h 20min',
          preferences: {
            smoking: false,
            music: true,
            pets: true
          }
        },
        {
          id: '3',
          departure: 'Abidjan',
          destination: 'Yamoussoukro',
          date: '2025-02-11',
          time: '09:00',
          price: 5000,
          availableSeats: 4,
          driver: {
            name: 'Moussa Koné',
            rating: 4.7,
            reviews: 32,
            avatar: 'https://i.pravatar.cc/150?img=3'
          },
          duration: '2h 45min',
          preferences: {
            smoking: false,
            music: true,
            pets: false
          }
        }
      ];

      this.filteredTrips = [...this.trips];
      this.isLoading = false;
    }, 800);
  }

  searchTrips(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { departure, destination, date, passengers } = this.searchForm.value;

    // Filter trips based on search criteria
    setTimeout(() => {
      this.filteredTrips = this.trips.filter(trip => {
        const matchDeparture = !departure || trip.departure.toLowerCase().includes(departure.toLowerCase());
        const matchDestination = !destination || trip.destination.toLowerCase().includes(destination.toLowerCase());
        const matchDate = !date || trip.date === date;
        const matchSeats = trip.availableSeats >= (passengers || 1);

        return matchDeparture && matchDestination && matchDate && matchSeats;
      });

      this.applyFilters();
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    const { maxPrice, departureTime, sortBy } = this.filterForm.value;

    // Apply price filter
    if (maxPrice) {
      this.filteredTrips = this.filteredTrips.filter(trip => trip.price <= maxPrice);
    }

    // Apply time filter
    if (departureTime && departureTime !== 'any') {
      this.filteredTrips = this.filteredTrips.filter(trip => {
        const hour = parseInt(trip.time.split(':')[0]);

        switch (departureTime) {
          case 'morning':
            return hour >= 6 && hour < 12;
          case 'afternoon':
            return hour >= 12 && hour < 18;
          case 'evening':
            return hour >= 18 || hour < 6;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    if (sortBy) {
      this.filteredTrips.sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return a.price - b.price;
          case 'time':
            return a.time.localeCompare(b.time);
          case 'rating':
            return b.driver.rating - a.driver.rating;
          default:
            return 0;
        }
      });
    }
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  selectRoute(route: { from: string; to: string }): void {
    this.searchForm.patchValue({
      departure: route.from,
      destination: route.to
    });
    this.searchTrips();
  }

  viewTripDetails(tripId: string): void {
    this.router.navigate(['/trips', tripId]);
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}
