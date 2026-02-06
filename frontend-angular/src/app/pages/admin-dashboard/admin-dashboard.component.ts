import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTrips: number;
  activeTrips: number;
  totalRevenue: number;
  pendingVerifications: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'passenger' | 'driver' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  verified: boolean;
  joinedDate: string;
  totalTrips: number;
  rating?: number;
}

interface Trip {
  id: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  driver: string;
  status: 'active' | 'completed' | 'cancelled';
  bookedSeats: number;
  totalSeats: number;
  price: number;
}

interface Report {
  id: string;
  type: 'user' | 'trip';
  reportedBy: string;
  reportedItem: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  isLoading = true;
  currentTab: 'overview' | 'users' | 'trips' | 'reports' = 'overview';

  stats: DashboardStats = {
    totalUsers: 0,
    activeUsers: 0,
    totalTrips: 0,
    activeTrips: 0,
    totalRevenue: 0,
    pendingVerifications: 0
  };

  users: User[] = [];
  trips: Trip[] = [];
  reports: Report[] = [];

  selectedUser: User | null = null;
  selectedTrip: Trip | null = null;
  selectedReport: Report | null = null;

  showUserModal = false;
  showTripModal = false;
  showReportModal = false;

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: [''],
      filterStatus: ['all'],
      filterRole: ['all']
    });
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Mock data - replace with actual API calls
    setTimeout(() => {
      this.stats = {
        totalUsers: 2547,
        activeUsers: 1832,
        totalTrips: 8642,
        activeTrips: 342,
        totalRevenue: 12485000,
        pendingVerifications: 23
      };

      this.users = [
        {
          id: '1',
          name: 'Amadou Diallo',
          email: 'amadou@example.com',
          role: 'driver',
          status: 'active',
          verified: true,
          joinedDate: '2023-05-15',
          totalTrips: 342,
          rating: 4.8
        },
        {
          id: '2',
          name: 'Fatou Sall',
          email: 'fatou@example.com',
          role: 'passenger',
          status: 'active',
          verified: true,
          joinedDate: '2024-01-10',
          totalTrips: 47,
          rating: 4.9
        },
        {
          id: '3',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'driver',
          status: 'pending',
          verified: false,
          joinedDate: '2025-02-01',
          totalTrips: 0
        },
        {
          id: '4',
          name: 'Marie Dupont',
          email: 'marie@example.com',
          role: 'passenger',
          status: 'suspended',
          verified: true,
          joinedDate: '2024-06-20',
          totalTrips: 12
        }
      ];

      this.trips = [
        {
          id: '1',
          departure: 'Dakar',
          destination: 'Thiès',
          date: '2025-02-10',
          time: '08:00',
          driver: 'Amadou Diallo',
          status: 'active',
          bookedSeats: 2,
          totalSeats: 4,
          price: 2500
        },
        {
          id: '2',
          departure: 'Abidjan',
          destination: 'Yamoussoukro',
          date: '2025-02-11',
          time: '14:00',
          driver: 'Kouame N\'guessan',
          status: 'active',
          bookedSeats: 3,
          totalSeats: 4,
          price: 5000
        },
        {
          id: '3',
          departure: 'Dakar',
          destination: 'Saint-Louis',
          date: '2025-02-05',
          time: '09:00',
          driver: 'Amadou Diallo',
          status: 'completed',
          bookedSeats: 4,
          totalSeats: 4,
          price: 5000
        }
      ];

      this.reports = [
        {
          id: '1',
          type: 'user',
          reportedBy: 'Fatou Sall',
          reportedItem: 'John Doe',
          reason: 'Inappropriate behavior during trip',
          status: 'pending',
          date: '2025-02-06'
        },
        {
          id: '2',
          type: 'trip',
          reportedBy: 'Ousmane Ba',
          reportedItem: 'Trip #456',
          reason: 'Driver did not show up',
          status: 'resolved',
          date: '2025-02-05'
        }
      ];

      this.isLoading = false;
    }, 800);
  }

  setTab(tab: 'overview' | 'users' | 'trips' | 'reports'): void {
    this.currentTab = tab;
  }

  viewUser(user: User): void {
    this.selectedUser = user;
    this.showUserModal = true;
  }

  viewTrip(trip: Trip): void {
    this.selectedTrip = trip;
    this.showTripModal = true;
  }

  viewReport(report: Report): void {
    this.selectedReport = report;
    this.showReportModal = true;
  }

  closeModals(): void {
    this.showUserModal = false;
    this.showTripModal = false;
    this.showReportModal = false;
    this.selectedUser = null;
    this.selectedTrip = null;
    this.selectedReport = null;
  }

  updateUserStatus(userId: string, status: 'active' | 'suspended'): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = status;
      this.closeModals();
    }
  }

  verifyUser(userId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.verified = true;
      user.status = 'active';
      this.stats.pendingVerifications--;
      this.closeModals();
    }
  }

  cancelTrip(tripId: string): void {
    const trip = this.trips.find(t => t.id === tripId);
    if (trip) {
      trip.status = 'cancelled';
      this.closeModals();
    }
  }

  resolveReport(reportId: string, resolution: 'resolved' | 'dismissed'): void {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = resolution;
      this.closeModals();
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'driver':
        return 'bg-blue-100 text-blue-800';
      case 'passenger':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  get filteredUsers(): User[] {
    const query = this.searchForm.value.query.toLowerCase();
    const status = this.searchForm.value.filterStatus;
    const role = this.searchForm.value.filterRole;

    return this.users.filter(user => {
      const matchesQuery = !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || user.status === status;
      const matchesRole = role === 'all' || user.role === role;
      return matchesQuery && matchesStatus && matchesRole;
    });
  }

  get filteredTrips(): Trip[] {
    const query = this.searchForm.value.query.toLowerCase();
    const status = this.searchForm.value.filterStatus;

    return this.trips.filter(trip => {
      const matchesQuery = !query ||
        trip.departure.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.driver.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || trip.status === status;
      return matchesQuery && matchesStatus;
    });
  }

  get filteredReports(): Report[] {
    const status = this.searchForm.value.filterStatus;
    return this.reports.filter(report =>
      status === 'all' || report.status === status
    );
  }

  get pendingReportsCount(): number {
    return this.reports.filter(r => r.status === 'pending').length;
  }
}
