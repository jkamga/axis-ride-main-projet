import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'dashboard/passenger',
    loadComponent: () => import('./pages/passenger-dashboard/passenger-dashboard.component').then(m => m.PassengerDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard/driver',
    loadComponent: () => import('./pages/driver-dashboard/driver-dashboard.component').then(m => m.DriverDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'trips/:id',
    loadComponent: () => import('./pages/trip-details/trip-details.component').then(m => m.TripDetailsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'careers',
    loadComponent: () => import('./pages/careers/careers.component').then(m => m.CareersComponent)
  },
  {
    path: 'mobile',
    loadComponent: () => import('./pages/mobile-app/mobile-app.component').then(m => m.MobileAppComponent)
  },
  {
    path: 'groups',
    loadComponent: () => import('./pages/groups/groups.component').then(m => m.GroupsComponent)
  },
  {
    path: 'subscription',
    loadComponent: () => import('./pages/subscription/subscription.component').then(m => m.SubscriptionComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'cookies',
    loadComponent: () => import('./pages/cookies/cookies.component').then(m => m.CookiesComponent)
  }
];
