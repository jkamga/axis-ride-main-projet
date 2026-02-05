# 🚀 Quick Start Guide - AxisRide

Ce guide vous permettra de démarrer AxisRide en moins de 5 minutes.

## ⚡ Démarrage Ultra-Rapide

```bash
# 1. Cloner le projet
git clone https://github.com/axisride/axisride-platform.git
cd axisride-platform

# 2. Copier la configuration (optionnel)
cp .env.example .env

# 3. Démarrer tous les services
./start.sh
```

C'est tout ! 🎉

## 🧪 Tester l'API

### 1. Créer un compte utilisateur

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+33612345678",
    "role": "USER"
  }'
```

**Réponse attendue :**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "user": {
    "id": "uuid",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["ROLE_USER"]
  }
}
```

### 2. Se connecter

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrPhone": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

### 3. Créer un trajet (conducteur)

D'abord, créez un compte conducteur :

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "driver@example.com",
    "password": "SecurePass123!",
    "firstName": "Alice",
    "lastName": "Driver",
    "phoneNumber": "+33698765432",
    "role": "DRIVER"
  }'
```

Puis créez un trajet (récupérez d'abord le token de connexion) :

```bash
TOKEN="votre_access_token_ici"

curl -X POST http://localhost:8080/api/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "departureAddress": "10 Rue de Rivoli, Paris",
    "departureCity": "Paris",
    "arrivalAddress": "5 Avenue des Champs-Élysées, Paris",
    "arrivalCity": "Paris",
    "departureTime": "2024-12-25T14:00:00",
    "availableSeats": 3,
    "pricePerSeat": 15.00,
    "description": "Trajet confortable, musique autorisée",
    "vehicleType": "Berline",
    "vehicleModel": "Peugeot 308",
    "luggageAllowed": true,
    "petsAllowed": false
  }'
```

## 📊 Accès aux Interfaces Web

| Service | URL | Credentials |
|---------|-----|-------------|
| **API Gateway** | http://localhost:8080 | - |
| **Eureka Dashboard** | http://localhost:8761 | - |
| **Keycloak Admin** | http://localhost:8180 | admin / admin |

## 🛠️ Commandes Utiles

### Avec Make (recommandé)

```bash
# Voir toutes les commandes
make help

# Démarrer
make start

# Arrêter
make stop

# Voir les logs
make logs

# Voir le status
make ps

# Tester l'enregistrement
make test-register

# Tester la connexion
make test-login
```

### Avec Docker Compose

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Voir les logs
docker-compose logs -f

# Voir le status
docker-compose ps

# Redémarrer un service
docker-compose restart auth-service
```

## 📁 Structure du Projet

```
axisride-platform/
├── api-gateway/          # Port 8080 - Point d'entrée unique
├── auth-service/         # Port 8081 - Authentification
├── user-service/         # Port 8082 - Profils utilisateurs
├── trip-service/         # Port 8083 - Gestion des trajets
├── payment-service/      # Port 8084 - Paiements
├── chat-service/         # Port 8085 - Chat temps réel
├── geolocation-service/  # Port 8086 - GPS tracking
├── notification-service/ # Port 8087 - Notifications
├── loyalty-service/      # Port 8088 - Fidélité
├── analytics-service/    # Port 8089 - Analytics
└── content-service/      # Port 8090 - Contenu CMS
```

## 🔍 Vérifier que tout fonctionne

```bash
# Vérifier tous les services
curl http://localhost:8761/eureka/apps | grep -o "<app>[^<]*</app>"

# Santé de l'API Gateway
curl http://localhost:8080/actuator/health

# Santé du Auth Service
curl http://localhost:8081/actuator/health
```

## 🐛 Problèmes Courants

### Les services ne démarrent pas

```bash
# Vérifier que Docker est lancé
docker info

# Vérifier les logs
docker-compose logs

# Redémarrer complètement
docker-compose down -v
docker-compose up -d
```

### Erreur de connexion à la base de données

```bash
# Attendre que PostgreSQL soit prêt (2-3 minutes au premier démarrage)
docker-compose logs postgres

# Redémarrer les services applicatifs
docker-compose restart auth-service user-service trip-service
```

### Erreur "Cannot connect to Eureka"

```bash
# Attendre que Discovery Server soit ready
curl http://localhost:8761/actuator/health

# Si nécessaire, redémarrer les services dans l'ordre
docker-compose restart discovery-server
sleep 30
docker-compose restart api-gateway auth-service
```

## 📚 Prochaines Étapes

1. **Lire la documentation complète** : [README.md](README.md)
2. **Guide de déploiement** : [DEPLOYMENT.md](DEPLOYMENT.md)
3. **Contribuer au projet** : Voir CONTRIBUTING.md
4. **Explorer les API** : http://localhost:8081/swagger-ui.html

## 💡 Astuces

### Développement Local

```bash
# Build sans Docker (plus rapide)
./gradlew clean build

# Lancer un service en local
./gradlew :auth-service:bootRun
```

### Debugging

```bash
# Logs d'un service spécifique
docker-compose logs -f auth-service

# Shell dans un conteneur
docker exec -it axisride-auth-service sh

# Voir les variables d'environnement
docker exec axisride-auth-service env
```

### Performance

```bash
# Voir l'utilisation des ressources
docker stats

# Augmenter la mémoire d'un service
# Dans docker-compose.yml, ajouter :
services:
  auth-service:
    deploy:
      resources:
        limits:
          memory: 1G
```

## 🆘 Besoin d'Aide ?

- 📧 Email : support@axisride.com
- 💬 Discord : https://discord.gg/axisride
- 🐛 Issues : https://github.com/axisride/axisride-platform/issues
- 📖 Docs : https://docs.axisride.com

---

**Bon développement ! 🚗💨**
