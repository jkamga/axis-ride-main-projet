import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface TripDetails {
  id: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  driver: {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    avatar?: string;
    verified: boolean;
    totalTrips: number;
    joinedDate: string;
    bio?: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    plate: string;
  };
  preferences: {
    smoking: boolean;
    music: boolean;
    pets: boolean;
    luggage: boolean;
  };
  waypoints: string[];
  pickupPoints: Array<{
    location: string;
    time: string;
  }>;
  dropoffPoints: Array<{
    location: string;
    time: string;
  }>;
}

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  isLoading = true;
  isBooking = false;
  showBookingModal = false;
  showConfirmation = false;

  tripId: string = '';
  trip: TripDetails | null = null;
  reviews: Review[] = [];

  bookingForm: FormGroup;
  selectedSeats = 1;
  totalPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      seats: [1, [Validators.required, Validators.min(1)]],
      pickupPoint: ['', Validators.required],
      dropoffPoint: ['', Validators.required],
      phone: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['id'];
    this.loadTripDetails();
  }

  loadTripDetails(): void {
    this.isLoading = true;

    // Mock data - replace with actual API call
    setTimeout(() => {
      this.trip = {
        id: this.tripId,
        departure: 'Dakar',
        destination: 'Thiès',
        date: '2025-02-10',
        time: '08:00',
        duration: '1h 30min',
        price: 2500,
        availableSeats: 3,
        totalSeats: 4,
        driver: {
          id: '1',
          name: 'Amadou Diallo',
          rating: 4.8,
          reviews: 127,
          verified: true,
          totalTrips: 342,
          joinedDate: '2023-05-15',
          bio: 'Experienced driver with over 300 successful trips. I value punctuality and passenger comfort.'
        },
        vehicle: {
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          color: 'Gris',
          plate: 'DK-1234-AB'
        },
        preferences: {
          smoking: false,
          music: true,
          pets: false,
          luggage: true
        },
        waypoints: ['Dakar', 'Rufisque', 'Bargny', 'Thiès'],
        pickupPoints: [
          { location: 'Place de l\'Indépendance', time: '08:00' },
          { location: 'Gare routière Pompiers', time: '08:15' },
          { location: 'Rufisque Centre', time: '08:30' }
        ],
        dropoffPoints: [
          { location: 'Gare routière Thiès', time: '09:30' },
          { location: 'Université de Thiès', time: '09:45' },
          { location: 'Centre-ville Thiès', time: '10:00' }
        ]
      };

      this.reviews = [
        {
          id: '1',
          userName: 'Fatou Sall',
          rating: 5,
          comment: 'Excellent conducteur, très ponctuel et professionnel. Voiture propre et confortable.',
          date: '2025-02-01'
        },
        {
          id: '2',
          userName: 'Ousmane Ba',
          rating: 4,
          comment: 'Bon trajet, conversation agréable. Juste un peu de retard au départ.',
          date: '2025-01-25'
        },
        {
          id: '3',
          userName: 'Marie Dupont',
          rating: 5,
          comment: 'Perfect trip! Very safe driver and great music selection.',
          date: '2025-01-20'
        }
      ];

      this.calculateTotalPrice();
      this.isLoading = false;
    }, 800);
  }

  calculateTotalPrice(): void {
    if (this.trip) {
      this.totalPrice = this.trip.price * this.selectedSeats;
    }
  }

  updateSeats(seats: number): void {
    if (this.trip && seats >= 1 && seats <= this.trip.availableSeats) {
      this.selectedSeats = seats;
      this.bookingForm.patchValue({ seats });
      this.calculateTotalPrice();
    }
  }

  openBookingModal(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/auth']);
      return;
    }

    const userData = JSON.parse(user);
    this.bookingForm.patchValue({
      phone: userData.phone || '',
      seats: this.selectedSeats
    });

    this.showBookingModal = true;
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    this.bookingForm.reset({
      seats: 1,
      phone: '',
      notes: ''
    });
  }

  submitBooking(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    this.isBooking = true;

    // Mock booking - replace with actual API call
    setTimeout(() => {
      this.isBooking = false;
      this.showBookingModal = false;
      this.showConfirmation = true;

      // Auto hide confirmation after 5 seconds
      setTimeout(() => {
        this.showConfirmation = false;
        this.router.navigate(['/dashboard/passenger']);
      }, 5000);
    }, 2000);
  }

  contactDriver(): void {
    // Open messaging system or phone dialer
    console.log('Contact driver');
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  getRatingColor(rating: number): string {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  }
}
