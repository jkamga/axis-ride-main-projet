# 📑 AxisRide Platform - Index des Fichiers

## 📊 Statistiques du Projet

- **Fichiers totaux**: 66+
- **Lignes de code**: ~2,555 lignes (Java + YAML + Gradle)
- **Microservices**: 13 services
- **Documentation**: 6 fichiers MD
- **Scripts**: 4 scripts bash

## 🗂️ Structure Complète

### 📄 Fichiers Racine

```
├── README.md                    # Documentation principale
├── QUICKSTART.md               # Guide démarrage rapide
├── DEPLOYMENT.md               # Guide déploiement
├── PROJECT_SUMMARY.md          # Résumé du projet
├── INDEX.md                    # Ce fichier
├── LICENSE                     # Licence MIT
├── .gitignore                 # Configuration Git
├── .env.example               # Template env variables
├── build.gradle               # Configuration Gradle racine
├── settings.gradle            # Configuration modules
├── gradle.properties          # Propriétés Gradle
├── docker-compose.yml         # Orchestration Docker
├── Dockerfile                 # Dockerfile multi-stage
├── Makefile                   # Commandes utiles
├── start.sh                   # Script démarrage auto
├── test.sh                    # Suite de tests
└── INDEX.md                   # Index complet
```

### 📁 Services

#### Config Server (8888)
```
config-server/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/configserver/
    │   └── ConfigServerApplication.java
    └── resources/
        └── application.yml
```

#### Discovery Server (8761)
```
discovery-server/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/discovery/
    │   └── DiscoveryServerApplication.java
    └── resources/
        └── application.yml
```

#### API Gateway (8080)
```
api-gateway/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/gateway/
    │   ├── ApiGatewayApplication.java
    │   └── config/
    │       └── GatewayConfig.java
    └── resources/
        └── application.yml
```

#### Auth Service (8081)
```
auth-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/auth/
    │   ├── AuthServiceApplication.java
    │   ├── entity/
    │   │   ├── User.java
    │   │   └── Role.java
    │   ├── repository/
    │   │   ├── UserRepository.java
    │   │   └── RoleRepository.java
    │   ├── service/
    │   │   ├── AuthService.java
    │   │   └── JwtService.java
    │   ├── controller/
    │   │   └── AuthController.java
    │   ├── dto/
    │   │   ├── RegisterRequest.java
    │   │   ├── LoginRequest.java
    │   │   └── AuthResponse.java
    │   └── config/
    │       ├── SecurityConfig.java
    │       └── KafkaProducerConfig.java
    └── resources/
        └── application.yml
```

#### User Service (8082)
```
user-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/user/
    │   └── UserServiceApplication.java
    └── resources/
        └── application.yml
```

#### Trip Service (8083)
```
trip-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/trip/
    │   ├── TripServiceApplication.java
    │   ├── entity/
    │   │   ├── Trip.java
    │   │   └── Booking.java
    │   └── repository/
    │       ├── TripRepository.java
    │       └── BookingRepository.java
    └── resources/
        └── application.yml
```

#### Payment Service (8084)
```
payment-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/payment/
    │   └── PaymentServiceApplication.java
    └── resources/
        └── application.yml
```

#### Chat Service (8085)
```
chat-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/chat/
    │   └── ChatServiceApplication.java
    └── resources/
        └── application.yml
```

#### Geolocation Service (8086)
```
geolocation-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/geolocation/
    │   └── GeolocationServiceApplication.java
    └── resources/
        └── application.yml
```

#### Notification Service (8087)
```
notification-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/notification/
    │   └── NotificationServiceApplication.java
    └── resources/
        └── application.yml
```

#### Loyalty Service (8088)
```
loyalty-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/loyalty/
    │   └── LoyaltyServiceApplication.java
    └── resources/
        └── application.yml
```

#### Analytics Service (8089)
```
analytics-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/analytics/
    │   └── AnalyticsServiceApplication.java
    └── resources/
        └── application.yml
```

#### Content Service (8090)
```
content-service/
├── build.gradle
├── Dockerfile
└── src/main/
    ├── java/com/axisride/content/
    │   └── ContentServiceApplication.java
    └── resources/
        └── application.yml
```

### 📂 Scripts

```
scripts/
└── init-databases.sh          # Initialisation PostgreSQL
```

## 📚 Documentation

### Guides Utilisateur
1. **README.md** - Documentation complète avec architecture
2. **QUICKSTART.md** - Démarrage rapide en 5 minutes
3. **PROJECT_SUMMARY.md** - Vue d'ensemble et résumé

### Guides Technique
4. **DEPLOYMENT.md** - Guide de déploiement (Docker, K8s)
5. **INDEX.md** - Ce fichier, index complet

### Licence
6. **LICENSE** - Licence MIT

## 🔧 Configuration

### Build & Dependencies
- `build.gradle` - Configuration Gradle racine
- `settings.gradle` - Configuration des modules
- `gradle.properties` - Propriétés Gradle
- `*/build.gradle` - Configuration spécifique à chaque service

### Infrastructure
- `docker-compose.yml` - 16 services Docker
- `Dockerfile` - Multi-stage build optimisé
- `.env.example` - Template variables d'environnement
- `.gitignore` - Fichiers à ignorer

### Automation
- `Makefile` - 20+ commandes pratiques
- `start.sh` - Démarrage automatisé avec health checks
- `test.sh` - Suite de tests API automatisés
- `scripts/init-databases.sh` - Init PostgreSQL

## 🎯 Points d'Entrée

### Pour Commencer
1. Lire **QUICKSTART.md** (5 min)
2. Exécuter `./start.sh`
3. Tester avec `./test.sh`

### Pour Développer
1. Lire **README.md**
2. Consulter les fichiers dans `*/src/main/java`
3. Utiliser `make dev-run SERVICE=auth-service`

### Pour Déployer
1. Lire **DEPLOYMENT.md**
2. Configurer `.env`
3. Exécuter `docker-compose up -d`

## 📊 Analyse du Code

### Langages
- **Java**: 1,800+ lignes
- **YAML**: 600+ lignes
- **Gradle**: 150+ lignes
- **Bash**: 200+ lignes
- **Markdown**: 3,000+ lignes

### Packages Principaux
```
com.axisride.auth
├── entity         # Entités JPA
├── repository     # Repositories Spring Data
├── service        # Business logic
├── controller     # REST controllers
├── dto            # Data Transfer Objects
└── config         # Configuration classes
```

### Patterns Utilisés
- Repository Pattern
- Service Layer Pattern
- DTO Pattern
- Factory Pattern
- Builder Pattern (Lombok)
- Observer Pattern (Kafka events)

## 🔗 Dépendances Principales

### Spring Framework
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-security
- spring-cloud-starter-netflix-eureka
- spring-cloud-starter-gateway
- spring-kafka

### Database
- postgresql (JDBC driver)
- spring-data-redis
- hibernate-spatial (PostGIS)

### Security
- spring-security-oauth2
- jjwt (JWT)
- keycloak-spring-boot-starter

### Tools
- lombok
- mapstruct
- micrometer-prometheus

## 🚀 Commandes Rapides

```bash
# Démarrage
./start.sh
make start

# Tests
./test.sh
make test-register

# Logs
make logs
make logs-service SERVICE=auth-service

# Status
make ps
make health

# Arrêt
make stop
docker-compose down
```

## 📞 Support

- Documentation: Voir les fichiers .md
- Issues: GitHub Issues
- Email: support@axisride.com

---

**Index généré pour AxisRide Platform v1.0.0**
