# AxisRide Frontend - Angular 17 + TypeScript + OIDC

Frontend moderne pour la plateforme AxisRide avec authentification OIDC/Keycloak.

## 🚀 Démarrage Rapide

### Installation

```bash
cd frontend-angular
npm install
```

### Développement

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200`

## 📦 Architecture

```
src/
├── app/
│   ├── auth/                 # Composants d'authentification
│   │   ├── login/           # Page de connexion
│   │   └── register/        # Page d'inscription
│   ├── core/                # Services et guards
│   │   ├── services/
│   │   │   └── auth.service.ts  # Service auth avec OIDC
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   └── components/
│   │       ├── header/
│   │       └── footer/
│   ├── pages/               # Pages de l'application
│   │   ├── landing/        # Page d'accueil
│   │   ├── dashboard/      # Dashboard utilisateur
│   │   ├── trips/          # Recherche de trajets
│   │   ├── trip-details/   # Détails d'un trajet
│   │   ├── profile/        # Profil utilisateur
│   │   ├── pricing/        # Plans et tarification
│   │   ├── subscription/   # Gestion abonnement
│   │   ├── groups/         # Groupes communautaires
│   │   ├── admin-dashboard/# Dashboard administrateur
│   │   ├── about/          # À propos
│   │   ├── contact/        # Contact
│   │   ├── careers/        # Carrières
│   │   └── legal/          # Pages légales
│   ├── shared/             # Composants partagés
│   ├── app.component.ts    # Composant racine
│   ├── app.config.ts       # Configuration app
│   └── app.routes.ts       # Routes
└── environments/           # Configuration environnement
    └── assets/
        └── i18n/           # Fichiers de traduction (en, fr)
```

## 🔐 Authentification

L'application supporte deux modes d'authentification :

### 1. JWT Classique
- Login avec email/téléphone + mot de passe
- Tokens JWT stockés en localStorage
- Refresh token automatique

### 2. OIDC avec Keycloak
- Authentification via Keycloak
- Support OAuth2/OIDC
- Single Sign-On (SSO)

## 🛠️ Technologies

- **Angular 17** - Framework
- **TypeScript 5.2** - Langage
- **angular-oauth2-oidc** - Intégration OIDC
- **@ngx-translate/core** - Internationalisation (i18n)
- **RxJS** - Programmation réactive
- **Standalone Components** - Approche moderne Angular
- **Tailwind CSS** - Styling utilitaire

## 📝 Configuration

### Environnement de Développement

Éditer `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  keycloakUrl: 'http://localhost:8180',
  keycloakRealm: 'axisride',
  keycloakClientId: 'axisride-frontend'
};
```

### Configuration Keycloak

1. Accéder à Keycloak: `http://localhost:8180`
2. Se connecter (admin/admin)
3. Créer un realm "axisride"
4. Créer un client "axisride-frontend"
5. Configurer les URLs de redirection

## 🔧 Commandes Disponibles

```bash
# Démarrage dev
npm start

# Build production
npm run build

# Tests
npm test

# Linter
npm run lint
```

## 🌐 API Endpoints Utilisés

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Refresh token

### Trajets
- `GET /api/trips` - Liste des trajets
- `POST /api/trips` - Créer un trajet
- `GET /api/trips/:id` - Détails d'un trajet
- `POST /api/trips/:id/book` - Réserver un trajet

### Profil
- `GET /api/profile` - Profil utilisateur
- `PUT /api/profile` - Mettre à jour le profil

### Abonnements
- `GET /api/subscriptions` - Détails de l'abonnement
- `POST /api/subscriptions` - Créer un abonnement
- `PUT /api/subscriptions` - Modifier un abonnement
- `DELETE /api/subscriptions` - Annuler un abonnement
- `GET /api/subscriptions/invoices` - Historique de facturation

### Groupes
- `GET /api/groups` - Liste des groupes
- `POST /api/groups` - Créer un groupe
- `GET /api/groups/:id` - Détails d'un groupe
- `POST /api/groups/:id/join` - Rejoindre un groupe
- `POST /api/groups/:id/leave` - Quitter un groupe

## 🔒 Guards

- **authGuard** - Protège les routes nécessitant une authentification

## 📱 Composants Principaux

### LoginComponent
- Formulaire de connexion
- Support JWT et OIDC
- Validation des champs
- Gestion des erreurs

### RegisterComponent  
- Formulaire d'inscription
- Choix USER/DRIVER
- Validation complète

### DashboardComponent
- Vue d'ensemble utilisateur
- Statistiques personnelles
- Actions rapides

### TripsComponent
- Liste des trajets
- Recherche et filtres
- Création de trajet

### PricingComponent
- Plans d'abonnement (Gratuit, Basic, Premium, Enterprise)
- Basculement mensuel/annuel
- Tableau de comparaison des fonctionnalités
- FAQ intégrée

### SubscriptionComponent
- Gestion d'abonnement actif
- Historique de facturation
- Gestion des moyens de paiement
- Renouvellement automatique

### GroupsComponent
- Découverte de groupes communautaires
- Création de groupes (publics/privés)
- Recherche et filtres par catégorie
- Gestion des adhésions

## 🎨 Styling

L'application utilise du CSS pur avec:
- Design responsive
- Couleurs cohérentes
- Animations fluides
- Accessibilité

## 📦 Build Production

```bash
npm run build
```

Les fichiers sont générés dans `dist/axisride-frontend/`

## 🚀 Déploiement

### Avec Docker

```bash
docker build -t axisride-frontend .
docker run -p 80:80 axisride-frontend
```

### Sur Nginx

```bash
npm run build
cp -r dist/axisride-frontend/* /var/www/html/
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir LICENSE pour plus de détails
