# AxisRide - Plateforme de Covoiturage 🚗

Une plateforme de covoiturage moderne et complète construite avec une architecture microservices.

## 🏗️ Architecture

### Microservices
- **Config Server** (8888) - Gestion centralisée de la configuration
- **Discovery Server** (8761) - Service registry Eureka
- **API Gateway** (8080) - Point d'entrée unique pour tous les services
- **Auth Service** (8081) - Authentification et autorisation
- **User Service** (8082) - Gestion des profils utilisateurs
- **Trip Service** (8083) - Gestion des trajets et réservations
- **Payment Service** (8084) - Traitement des paiements
- **Chat Service** (8085) - Messagerie en temps réel (WebSocket)
- **Geolocation Service** (8086) - Géolocalisation GPS en temps réel
- **Notification Service** (8087) - Notifications push et emails
- **Loyalty Service** (8088) - Programme de fidélité
- **Analytics Service** (8089) - Statistiques et analyses
- **Content Service** (8090) - Gestion du contenu (blog, FAQ, etc.)

### Infrastructure
- **PostgreSQL 15** avec PostGIS - Base de données principale
- **Redis 7** - Cache et sessions
- **Apache Kafka 3.6** - Message broker pour communication asynchrone
- **Keycloak 23** - Identity and Access Management
- **Zookeeper** - Coordination pour Kafka

## 🚀 Stack Technique

- **Backend**: Java 17, Spring Boot 3.2, Spring Cloud 2023
- **Build Tool**: Gradle 8.5
- **Base de données**: PostgreSQL 15 avec PostGIS
- **Cache**: Redis 7
- **Messaging**: Apache Kafka 3.6
- **Security**: OAuth2, JWT, Keycloak
- **Containerization**: Docker, Docker Compose

## 📋 Prérequis

- Docker 24.0+
- Docker Compose 2.20+
- Java 17+ (pour développement local)
- Gradle 8.5+ (pour développement local)
- 8GB RAM minimum
- 20GB d'espace disque

## 🔧 Installation et Déploiement

### 1. Cloner le repository

```bash
git clone https://github.com/axisride/axisride-platform.git
cd axisride-platform
```

### 2. Configuration des variables d'environnement

Créer un fichier `.env` à la racine :

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Kafka
SPRING_KAFKA_BOOTSTRAP_SERVERS=kafka:9092

# Config Repository (optionnel)
CONFIG_GIT_URI=https://github.com/axisride/config-repo
```

### 3. Construire et démarrer tous les services

```bash
# Construire les images Docker
docker-compose build

# Démarrer tous les services
docker-compose up -d

# Suivre les logs
docker-compose logs -f
```

### 4. Vérifier le démarrage

Attendre que tous les services soient en état "healthy" (environ 2-3 minutes) :

```bash
docker-compose ps
```

### 5. Accéder aux services

- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761
- **Keycloak Admin**: http://localhost:8180 (admin/admin)
- **Individual Services**: Ports 8081-8090

## 🧪 Tests

### Test de santé des services

```bash
# API Gateway
curl http://localhost:8080/actuator/health

# Auth Service
curl http://localhost:8081/auth/health

# Discovery Server
curl http://localhost:8761/actuator/health
```

### Test d'enregistrement d'un utilisateur

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@axisride.com",
    "password": "Test@1234",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+33612345678",
    "role": "USER"
  }'
```

### Test de connexion

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrPhone": "test@axisride.com",
    "password": "Test@1234"
  }'
```

## 📦 Build Local (sans Docker)

### Build complet

```bash
./gradlew clean build
```

### Build d'un service spécifique

```bash
./gradlew :auth-service:clean :auth-service:bootJar
```

### Exécuter un service localement

```bash
java -jar auth-service/build/libs/auth-service-1.0.0.jar
```

## 🗃️ Structure du Projet

```
axisride-platform/
├── config-server/          # Configuration centralisée
├── discovery-server/       # Service registry
├── api-gateway/           # API Gateway
├── auth-service/          # Authentification
├── user-service/          # Gestion utilisateurs
├── trip-service/          # Gestion des trajets
├── payment-service/       # Paiements
├── chat-service/          # Chat temps réel
├── geolocation-service/   # Géolocalisation
├── notification-service/  # Notifications
├── loyalty-service/       # Programme fidélité
├── analytics-service/     # Analytics
├── content-service/       # Gestion contenu
├── scripts/              # Scripts utilitaires
│   └── init-databases.sh
├── build.gradle          # Configuration Gradle racine
├── settings.gradle       # Configuration modules
├── docker-compose.yml    # Orchestration Docker
├── Dockerfile           # Dockerfile pour tous les services
└── README.md
```

## 🔐 Sécurité

### JWT Token
- Access Token: 1 heure de validité
- Refresh Token: 24 heures de validité
- Algorithme: HS512

### OAuth2 / OIDC
- Keycloak comme Identity Provider
- Support des flux: Authorization Code, Client Credentials

## 📊 Monitoring

Tous les services exposent des endpoints Actuator :

- **/actuator/health** - Santé du service
- **/actuator/info** - Informations du service
- **/actuator/metrics** - Métriques
- **/actuator/prometheus** - Métriques Prometheus

## 🛠️ Développement

### Ajouter un nouveau microservice

1. Créer le répertoire du service :
```bash
mkdir -p new-service/src/main/{java/com/axisride,resources}
```

2. Ajouter dans `settings.gradle` :
```gradle
include 'new-service'
```

3. Créer `new-service/build.gradle` avec les dépendances nécessaires

4. Créer l'application Spring Boot et les configurations

5. Ajouter le service dans `docker-compose.yml`

### Kafka Topics

Topics principaux :
- `user.created` - Événement création utilisateur
- `trip.created` - Événement création trajet
- `booking.confirmed` - Événement réservation confirmée
- `payment.completed` - Événement paiement effectué
- `loyalty.points-earned` - Événement points de fidélité gagnés

## 🐛 Dépannage

### Les services ne démarrent pas

1. Vérifier les logs :
```bash
docker-compose logs <service-name>
```

2. Vérifier que tous les services d'infrastructure sont healthy :
```bash
docker-compose ps postgres redis kafka zookeeper
```

3. Redémarrer un service spécifique :
```bash
docker-compose restart <service-name>
```

### Problèmes de connexion à la base de données

```bash
# Recréer la base de données
docker-compose down -v
docker-compose up -d postgres
docker-compose up -d
```

### Erreurs de mémoire

Augmenter la mémoire allouée à Docker :
- Docker Desktop: Settings > Resources > Memory (minimum 8GB)

## 📝 API Documentation

La documentation complète de l'API est disponible via Swagger UI sur chaque service :
- http://localhost:8081/swagger-ui.html (Auth Service)
- http://localhost:8083/swagger-ui.html (Trip Service)
- etc.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Architecture**: Spring Cloud, Microservices
- **Backend**: Java 17, Spring Boot 3.2
- **DevOps**: Docker, Kubernetes
- **Database**: PostgreSQL, Redis
- **Messaging**: Apache Kafka

## 📞 Support

Pour toute question ou problème :
- Email: support@axisride.com
- Issues: https://github.com/axisride/axisride-platform/issues

---

**AxisRide** - Covoiturage intelligent et éco-responsable 🌍
