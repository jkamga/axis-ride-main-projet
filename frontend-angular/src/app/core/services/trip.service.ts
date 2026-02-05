import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Trip {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar?: string;
  driverRating: number;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  vehicle?: {
    make: string;
    model: string;
    color: string;
    plate: string;
  };
  preferences?: {
    smoking: boolean;
    music: boolean;
    pets: boolean;
    luggage: boolean;
  };
}

export interface SearchParams {
  from?: string;
  to?: string;
  date?: string;
  seats?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private http: HttpClient) {}

  searchTrips(params: SearchParams): Observable<Trip[]> {
    let httpParams = new HttpParams();
    if (params.from) httpParams = httpParams.set('from', params.from);
    if (params.to) httpParams = httpParams.set('to', params.to);
    if (params.date) httpParams = httpParams.set('date', params.date);
    if (params.seats) httpParams = httpParams.set('seats', params.seats.toString());

    return this.http.get<Trip[]>(`${environment.apiUrl}/trips/search`, { params: httpParams });
  }

  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${environment.apiUrl}/trips/${id}`);
  }

  createTrip(trip: Partial<Trip>): Observable<Trip> {
    return this.http.post<Trip>(`${environment.apiUrl}/trips`, trip);
  }

  updateTrip(id: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${environment.apiUrl}/trips/${id}`, trip);
  }

  cancelTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/trips/${id}`);
  }

  getMyTrips(role: 'driver' | 'passenger'): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.apiUrl}/trips/my-trips?role=${role}`);
  }
}
