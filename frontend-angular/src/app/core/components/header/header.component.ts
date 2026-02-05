import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="brand">
        <a routerLink="/" class="brand-link">AxisRide</a>
      </div>
      <nav class="nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Accueil</a>
        <a routerLink="/pricing" routerLinkActive="active">Tarifs</a>
        <a routerLink="/about" routerLinkActive="active">À propos</a>
        <a routerLink="/contact" routerLinkActive="active">Contact</a>
      </nav>
      <div class="actions">
        <a class="btn" routerLink="/auth">Se connecter</a>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
      background: #ffffff;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .brand-link {
      font-weight: 700;
      font-size: 20px;
      text-decoration: none;
      color: #0f172a;
    }
    .nav {
      display: flex;
      gap: 16px;
    }
    .nav a {
      text-decoration: none;
      color: #334155;
      font-weight: 500;
    }
    .nav a.active {
      color: #2563eb;
    }
    .actions .btn {
      display: inline-block;
      padding: 8px 14px;
      background: #2563eb;
      color: #fff;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class HeaderComponent {}
