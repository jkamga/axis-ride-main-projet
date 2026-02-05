import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  phone: string;
  fullName: string;
  email?: string;
  role: 'passenger' | 'driver' | 'admin';
  avatar?: string;
  verified: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUser();
  }

  private loadUser(): void {
    const token = this.getToken();
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        this.currentUserSubject.next(JSON.parse(userStr));
      } catch (e) {
        this.logout();
      }
    }
  }

  register(phone: string, fullName: string, role: string): Observable<{ demo_otp: string }> {
    return this.http.post<{ demo_otp: string }>(`${environment.apiUrl}/auth/register`, {
      phone,
      full_name: fullName,
      role
    });
  }

  login(phone: string): Observable<{ demo_otp: string }> {
    return this.http.post<{ demo_otp: string }>(`${environment.apiUrl}/auth/login`, { phone });
  }

  verifyOtp(phone: string, otp: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/verify-otp`, {
      phone,
      otp
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
