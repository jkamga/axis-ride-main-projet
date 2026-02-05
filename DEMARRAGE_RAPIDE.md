# 🚀 Démarrage Rapide - AxisRide (VERSION CORRIGÉE)

## ⚡ Méthode Recommandée (SIMPLE ET RAPIDE)

### Prérequis
- ✅ Docker Desktop installé et lancé
- ✅ Java 17+ installé (`java -version`)
- ✅ Node.js 18+ installé (`node -version`)

### 1. Lancer l'infrastructure (2 minutes)

```bash
# Démarrer PostgreSQL, Redis, Kafka, Keycloak
./start-simple.sh

# OU manuellement:
docker-compose -f docker-compose-simple.yml up -d
```

Attendez que tous les services soient prêts (environ 30 secondes).

### 2. Construire les microservices (5-10 minutes)

```bash
# Build tous les services
./gradlew clean build

# OU build un par un si vous rencontrez des erreurs
./gradlew :discovery-server:build
./gradlew :config-server:build
./gradlew :api-gateway:build
./gradlew :auth-service:build
./gradlew :trip-service:build
```

### 3. Lancer les microservices (1 minute)

**Important**: Respectez l'ordre de démarrage !

```bash
# 1. Discovery Server (Service Registry)
java -jar discovery-server/build/libs/*.jar &

# ⏳ ATTENDRE 20 SECONDES pour que Eureka démarre complètement

# 2. Config Server
java -jar config-server/build/libs/*.jar &

# ⏳ ATTENDRE 10 SECONDES

# 3. API Gateway
java -jar api-gateway/build/libs/*.jar &

# 4. Business Services (en parallèle)
java -jar auth-service/build/libs/*.jar &
java -jar user-service/build/libs/*.jar &
java -jar trip-service/build/libs/*.jar &
java -jar payment-service/build/libs/*.jar &

# Et les autres si nécessaire...
```

### 4. Lancer le Frontend Angular (2 minutes)

```bash
cd frontend-angular

# Installation des dépendances (première fois seulement)
npm install

# Démarrage du serveur de développement
npm start
```

Le frontend sera accessible sur **http://localhost:4200**

### 5. Tester l'application ✅

Ouvrez votre navigateur: **http://localhost:4200**

1. **Créer un compte**
   - Email: `test@axisride.com`
   - Mot de passe: `Test@1234` (minimum 8 caractères)
   - Rôle: Passager ou Conducteur

2. **Se connecter**
   - Utilisez vos identifiants

3. **Explorer**
   - Dashboard
   - Rechercher des trajets
   - Créer un trajet (si conducteur)
   - Profil utilisateur

## 📊 URLs Importantes

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend Angular** | http://localhost:4200 | - |
| **API Gateway** | http://localhost:8080 | - |
| **Eureka Dashboard** | http://localhost:8761 | - |
| **Keycloak Admin** | http://localhost:8180 | admin / admin |
| **PostgreSQL** | localhost:5432 | postgres / postgres |
| **Redis** | localhost:6379 | - |
| **Kafka** | localhost:9092 | - |

## 🧪 Tests API (Optionnels)

### Avec cURL

```bash
# Enregistrement
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER"
  }'

# Connexion
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrPhone": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Avec le Script de Test

```bash
./test.sh
```

## 🛑 Arrêter l'Application

```bash
# 1. Arrêter les services Spring Boot
# Appuyez sur Ctrl+C dans chaque terminal
# OU
pkill -f "java -jar"

# 2. Arrêter le frontend
# Ctrl+C dans le terminal npm

# 3. Arrêter l'infrastructure Docker
docker-compose -f docker-compose-simple.yml down
```

## 🐛 Problèmes Courants

### "gradlew: not found"

```bash
# Donner les permissions d'exécution
chmod +x gradlew
./gradlew build
```

### "Java command not found"

Installez Java 17:
- **Windows**: https://adoptium.net/
- **Mac**: `brew install openjdk@17`
- **Linux**: `sudo apt install openjdk-17-jdk`

### "Port already in use"

```bash
# Trouver le processus utilisant le port
lsof -i :8080  # ou autre port
# Tuer le processus
kill -9 <PID>
```

### Services ne se connectent pas à Eureka

```bash
# 1. Vérifier qu'Eureka est bien lancé
curl http://localhost:8761/actuator/health

# 2. Attendre 30 secondes supplémentaires
# 3. Redémarrer les services qui ne se sont pas enregistrés
```

### Frontend ne se connecte pas au backend

```bash
# 1. Vérifier que l'API Gateway fonctionne
curl http://localhost:8080/actuator/health

# 2. Vérifier la configuration dans frontend-angular/src/environments/environment.ts
# Doit contenir: apiUrl: 'http://localhost:8080/api'

# 3. Redémarrer le frontend
cd frontend-angular
npm start
```

## ⚙️ Configuration Avancée

### Variables d'Environnement

Créez un fichier `.env` à la racine:

```bash
# JWT
JWT_SECRET=votre-secret-super-securise

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres

# Kafka
SPRING_KAFKA_BOOTSTRAP_SERVERS=localhost:9092
```

### Configuration Frontend

Éditez `frontend-angular/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  oauth: {
    issuer: 'http://localhost:8180/realms/axisride',
    clientId: 'axisride-app',
    scope: 'openid profile email',
    redirectUri: window.location.origin + '/callback'
  }
};
```

## 📝 Développement

### Hot Reload Frontend

Le frontend Angular se recharge automatiquement lors des modifications.

### Hot Reload Backend

Pour le développement backend avec hot reload:

```bash
# Au lieu de java -jar, utilisez:
./gradlew :auth-service:bootRun
```

### Logs

```bash
# Logs infrastructure
docker-compose -f docker-compose-simple.yml logs -f

# Logs services Spring Boot
# Les logs s'affichent dans le terminal où vous avez lancé java -jar
```

## 🎯 Prochaines Étapes

1. ✅ **Explorer le code**
   - Backend: `*/src/main/java/com/axisride/`
   - Frontend: `frontend-angular/src/app/`

2. ✅ **Lire la documentation**
   - `README.md` - Documentation complète
   - `CORRECTIONS.md` - Explications des corrections
   - `DEPLOYMENT.md` - Déploiement production

3. ✅ **Personnaliser**
   - Modifier les services selon vos besoins
   - Ajouter de nouvelles fonctionnalités
   - Adapter l'UI

## 💡 Astuces

### Build plus rapide

```bash
# Build en parallèle
./gradlew build --parallel

# Build sans tests
./gradlew build -x test
```

### Nettoyer et rebuild

```bash
./gradlew clean build
```

### Lancer plusieurs services avec un script

Créez `start-all-services.sh`:

```bash
#!/bin/bash
java -jar discovery-server/build/libs/*.jar &
sleep 20
java -jar config-server/build/libs/*.jar &
java -jar api-gateway/build/libs/*.jar &
sleep 10
java -jar auth-service/build/libs/*.jar &
java -jar trip-service/build/libs/*.jar &
echo "Services démarrés!"
```

## 📞 Support

- 📖 Documentation: Voir les fichiers .md
- 🐛 Problèmes: Consultez `CORRECTIONS.md`
- 💬 Questions: Créez une issue GitHub

---

**Bonne installation ! 🎉**

L'application devrait être opérationnelle en moins de 15 minutes.
