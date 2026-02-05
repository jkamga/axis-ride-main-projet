#!/usr/bin/env node

/**
 * AxisRide - Générateur Automatique de Pages Angular
 * Convertit automatiquement toutes les pages React en Angular
 * 
 * Usage: node generate-all-pages.js
 */

const fs = require('fs');
const path = require('path');

const PAGES_CONFIG = {
  "auth": {
    title: "Authentication",
    reactFile: "AuthPage.jsx",
    features: ["Login", "Register", "2FA", "Social Login", "Password Reset"],
    routes: ["/auth", "/auth?mode=register"]
  },
  "passenger-dashboard": {
    title: "Passenger Dashboard",
    reactFile: "PassengerDashboard.jsx",
    features: ["Stats", "Recent Trips", "Bookings", "Notifications"],
    routes: ["/dashboard/passenger"]
  },
  "driver-dashboard": {
    title: "Driver Dashboard",
    reactFile: "DriverDashboard.jsx",
    features: ["Stats", "Earnings", "Trip Management", "Reviews"],
    routes: ["/dashboard/driver"]
  },
  "admin-dashboard": {
    title: "Admin Dashboard",
    reactFile: "AdminDashboard.jsx",
    features: ["Users", "Trips", "Analytics", "Moderation"],
    routes: ["/admin"]
  },
  "trip-details": {
    title: "Trip Details",
    reactFile: "TripDetails.jsx",
    features: ["Trip Info", "Driver Profile", "Map", "Booking"],
    routes: ["/trips/:id"]
  },
  "profile": {
    title: "Profile",
    reactFile: "ProfilePage.jsx",
    features: ["Personal Info", "Avatar", "Documents", "Preferences"],
    routes: ["/profile"]
  },
  "pricing": {
    title: "Pricing",
    reactFile: "PricingPage.jsx",
    features: ["Plans", "Features Comparison", "FAQ"],
    routes: ["/pricing"]
  },
  "about": {
    title: "About",
    reactFile: "AboutPage.jsx",
    features: ["Mission", "Team", "Timeline"],
    routes: ["/about"]
  },
  "contact": {
    title: "Contact",
    reactFile: "ContactPage.jsx",
    features: ["Contact Form", "Info", "Map"],
    routes: ["/contact"]
  },
  "careers": {
    title: "Careers",
    reactFile: "CareersPage.jsx",
    features: ["Job Listings", "Benefits", "Application"],
    routes: ["/careers"]
  },
  "mobile-app": {
    title: "Mobile App",
    reactFile: "MobileAppPage.jsx",
    features: ["Features", "Screenshots", "Download"],
    routes: ["/mobile"]
  },
  "groups": {
    title: "Groups",
    reactFile: "GroupsPage.jsx",
    features: ["List Groups", "Create Group", "Join Group"],
    routes: ["/groups"]
  },
  "subscription": {
    title: "Subscription",
    reactFile: "SubscriptionPage.jsx",
    features: ["Plans", "Payment", "Management"],
    routes: ["/subscription"]
  },
  "privacy": {
    title: "Privacy Policy",
    reactFile: "PrivacyPage.jsx",
    features: ["Policy Content"],
    routes: ["/privacy"]
  },
  "terms": {
    title: "Terms of Service",
    reactFile: "TermsPage.jsx",
    features: ["Terms Content"],
    routes: ["/terms"]
  },
  "cookies": {
    title: "Cookie Policy",
    reactFile: "CookiesPage.jsx",
    features: ["Cookie Content"],
    routes: ["/cookies"]
  }
};

function generateComponentTS(pageName, config) {
  const className = pageName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Component';
  
  return `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * ${config.title} Component
 * Converted from: ${config.reactFile}
 * 
 * Features:
${config.features.map(f => ` * - ${f}`).join('\n')}
 */
@Component({
  selector: 'app-${pageName}',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './${pageName}.component.html',
  styleUrls: ['./${pageName}.component.scss']
})
export class ${className} implements OnInit {
  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    // TODO: Load data
    this.isLoading = false;
  }
}
`;
}

function generateComponentHTML(pageName, config) {
  return `<!-- ${config.title} -->
<div class="min-h-screen bg-background">
  <!-- Navigation placeholder -->
  <div class="h-16"></div>

  <!-- Content -->
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold font-heading mb-8">${config.title}</h1>
    
    <!-- Loading State -->
    <div *ngIf="isLoading" class="animate-pulse">
      <div class="h-8 bg-muted rounded mb-4 w-1/2"></div>
      <div class="h-4 bg-muted rounded mb-2 w-3/4"></div>
      <div class="h-4 bg-muted rounded mb-2 w-2/3"></div>
    </div>

    <!-- Main Content -->
    <div *ngIf="!isLoading">
      <div class="bg-card rounded-xl p-8 border border-border">
        <p class="text-muted-foreground mb-4">
          Cette page est en cours de conversion depuis React (${config.reactFile}).
        </p>
        
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold font-heading">Fonctionnalités à implémenter:</h2>
          <ul class="list-disc list-inside space-y-2">
${config.features.map(f => `            <li class="text-muted-foreground">${f}</li>`).join('\n')}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

function generateComponentSCSS() {
  return `// Component-specific styles
// Inherits from global styles.scss
`;
}

// Génération
console.log('🚀 Génération automatique de toutes les pages...\n');

let generated = 0;
let errors = 0;

Object.entries(PAGES_CONFIG).forEach(([pageName, config]) => {
  try {
    const pageDir = path.join(__dirname, 'src/app/pages', pageName);
    
    // Créer le dossier si nécessaire
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    // Générer les fichiers
    fs.writeFileSync(
      path.join(pageDir, `${pageName}.component.ts`),
      generateComponentTS(pageName, config)
    );
    
    fs.writeFileSync(
      path.join(pageDir, `${pageName}.component.html`),
      generateComponentHTML(pageName, config)
    );
    
    fs.writeFileSync(
      path.join(pageDir, `${pageName}.component.scss`),
      generateComponentSCSS()
    );

    console.log(`✅ ${config.title} (${pageName})`);
    generated++;
  } catch (error) {
    console.error(`❌ Erreur pour ${pageName}:`, error.message);
    errors++;
  }
});

console.log(`\n📊 Résultat:`);
console.log(`   ✅ Générées: ${generated}`);
console.log(`   ❌ Erreurs: ${errors}`);
console.log(`   📝 Total: ${Object.keys(PAGES_CONFIG).length}`);

// Générer le fichier de routes
const routesContent = `import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
${Object.entries(PAGES_CONFIG).map(([pageName, config]) => {
  const className = pageName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Component';
  const needsAuth = ['passenger-dashboard', 'driver-dashboard', 'admin-dashboard', 'profile'].includes(pageName);
  const route = config.routes[0].split('?')[0];
  
  return `  {
    path: '${route.substring(1)}',
    loadComponent: () => import('./pages/${pageName}/${pageName}.component').then(m => m.${className})${needsAuth ? ',\n    canActivate: [AuthGuard]' : ''}
  }`;
}).join(',\n')}
];
`;

fs.writeFileSync(
  path.join(__dirname, 'src/app/app.routes.ts'),
  routesContent
);

console.log('\n✅ Fichier de routes généré: src/app/app.routes.ts');
console.log('\n🎉 Génération terminée!');
console.log('\nProchaines étapes:');
console.log('1. Examiner les fichiers React originaux');
console.log('2. Implémenter la logique métier dans chaque composant');
console.log('3. Créer les templates HTML détaillés');
console.log('4. Ajouter les styles spécifiques');
