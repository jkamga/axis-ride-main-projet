# 🚀 Guide de Démarrage Rapide - VERSION CORRIGÉE

## ⚠️ Corrections Apportées

### Problème 1: Gradle Wrapper Manquant ✅ CORRIGÉ
**Solution**: Utiliser `docker-compose-dev.yml` pour l'infrastructure seule

### Problème 2: Frontend Angular Manquant ✅ AJOUTÉ
**Solution**: Frontend complet Angular 17 + TypeScript + OIDC dans `frontend-angular/`

## 🎯 Démarrage en 3 Étapes

### Étape 1: Infrastructure (3 minutes)

```bash
cd axisride-platform

# Démarrer UNIQUEMENT l'infrastructure
docker-compose -f docker-compose-dev.yml up -d

# Vérifier que tout fonctionne
docker-compose -f docker-compose-dev.yml ps
```

**Services démarrés:**
- ✅ PostgreSQL avec PostGIS (port 5432)
- ✅ Redis (port 6379)
- ✅ Kafka + Zookeeper (ports 9092, 2181)
- ✅ Keycloak (port 8180)

### Étape 2: Frontend Angular (2 minutes)

```bash
# Aller dans le frontend
cd frontend-angular

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

**Frontend accessible sur**: `http://localhost:4200`

### Étape 3: Backend (Optionnel - pour développement)

#### Option A: Utiliser des images pré-construites
```bash
# TODO: Build avec Gradle local si vous avez Java 17
```

#### Option B: Développement sans Docker
```bash
# Si vous avez Java 17 et Gradle installés localement
cd auth-service
gradle bootRun
```

## 🌐 URLs d'Accès

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend Angular** | http://localhost:4200 | N/A |
| **PostgreSQL** | localhost:5432 | postgres/postgres |
| **Redis** | localhost:6379 | N/A |
| **Kafka** | localhost:9092 | N/A |
| **Keycloak Admin** | http://localhost:8180 | admin/admin |

## 🧪 Test du Frontend

### 1. Accéder au Frontend
```
http://localhost:4200
```

### 2. Page de Connexion
- Mode JWT: Email + mot de passe
- Mode OIDC: Bouton "Se connecter avec Keycloak"

### 3. Inscription
```
http://localhost:4200/register
```

## 📦 Structure du Projet Corrigé

```
axisride-platform/
├── docker-compose-dev.yml       # Infrastructure seule (UTILISER CELUI-CI)
├── docker-compose.yml          # Services complets (nécessite build)
├── frontend-angular/           # ✅ NOUVEAU - Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── core/          # Services, Guards
│   │   │   ├── features/      # Dashboard, Trips, Profile
│   │   │   └── ...
│   │   └── environments/      # Config API/Keycloak
│   ├── package.json
│   ├── angular.json
│   └── README.md              # Doc frontend
├── auth-service/              # Backend microservices
├── user-service/
├── trip-service/
└── ...
```

## 🔧 Configuration Keycloak (Optionnel)

Pour utiliser l'authentification OIDC:

### 1. Accéder à Keycloak
```
http://localhost:8180
Login: admin / admin
```

### 2. Créer un Realm
- Nom: `axisride`

### 3. Créer un Client
- Client ID: `axisride-frontend`
- Valid Redirect URIs: `http://localhost:4200/*`
- Web Origins: `http://localhost:4200`

### 4. Créer des Utilisateurs
- Username: `test@axisride.com`
- Email: `test@axisride.com`
- Credentials: Définir un mot de passe

## 🐛 Résolution des Problèmes

### Problème: Docker ne démarre pas
```bash
# Vérifier que Docker est lancé
docker info

# Redémarrer Docker Desktop (Windows/Mac)
```

### Problème: Port déjà utilisé
```bash
# Vérifier les ports utilisés (Windows)
netstat -ano | findstr :5432
netstat -ano | findstr :6379

# Arrêter les services qui utilisent ces ports
```

### Problème: npm install échoue
```bash
# Nettoyer le cache npm
npm cache clean --force

# Réessayer
npm install
```

### Problème: Frontend ne se connecte pas au backend
```bash
# Vérifier que l'infrastructure est lancée
docker-compose -f docker-compose-dev.yml ps

# Vérifier les URLs dans environment.ts
# Elles doivent pointer vers http://localhost:8080 (ou votre backend)
```

## 💡 Mode Développement

### Frontend Seul (Recommandé pour commencer)

```bash
# Infrastructure
docker-compose -f docker-compose-dev.yml up -d

# Frontend
cd frontend-angular
npm start
```

### Frontend + Backend Local

Si vous avez Java 17 installé:

```bash
# Terminal 1: Infrastructure
docker-compose -f docker-compose-dev.yml up -d

# Terminal 2: Backend (Auth Service par exemple)
cd auth-service
gradle bootRun

# Terminal 3: Frontend
cd frontend-angular
npm start
```

## 📝 Next Steps

1. ✅ **Infrastructure lancée** → docker-compose-dev.yml
2. ✅ **Frontend lancé** → npm start
3. 🔨 **Backend** → À construire avec Gradle (optionnel)
4. 🎨 **Keycloak configuré** → Pour OIDC (optionnel)

## 🎉 C'est Prêt !

Vous avez maintenant:
- ✅ Infrastructure complète (PostgreSQL, Redis, Kafka, Keycloak)
- ✅ Frontend Angular fonctionnel avec OIDC
- ✅ Code source des 13 microservices
- ✅ Documentation complète

## 📚 Documentation Complète

- **Frontend**: `frontend-angular/README.md`
- **Backend**: `README.md`
- **Déploiement**: `DEPLOYMENT.md`
- **Résumé**: `PROJECT_SUMMARY.md`

---

**Besoin d'aide ?** Consultez les fichiers de documentation ou contactez support@axisride.com
