import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home">
      <h1>🚗 Bienvenue sur AxisRide</h1>
      <p>La plateforme de covoiturage moderne et éco-responsable</p>
      <div class="cta">
        <a routerLink="/register" class="btn btn-primary">Commencer</a>
        <a routerLink="/trips" class="btn btn-secondary">Rechercher un trajet</a>
      </div>
    </div>
  `,
  styles: ['.home { text-align: center; padding: 60px 20px; } .cta { margin-top: 30px; display: flex; gap: 20px; justify-content: center; }']
})
export class HomeComponent {}
