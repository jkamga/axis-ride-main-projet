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
│   ├── features/            # Features de l'application
│   │   ├── home/           # Page d'accueil
│   │   ├── dashboard/      # Dashboard utilisateur
│   │   ├── trips/          # Gestion des trajets
│   │   └── profile/        # Profil utilisateur
│   ├── shared/             # Composants partagés
│   ├── app.component.ts    # Composant racine
│   ├── app.config.ts       # Configuration app
│   └── app.routes.ts       # Routes
└── environments/           # Configuration environnement
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
- **RxJS** - Programmation réactive
- **Standalone Components** - Approche moderne Angular

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

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Refresh token
- `GET /api/trips` - Liste des trajets
- `POST /api/trips` - Créer un trajet
- `GET /api/profile` - Profil utilisateur

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
