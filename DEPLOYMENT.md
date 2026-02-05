# Guide de Déploiement AxisRide

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Déploiement Local](#déploiement-local)
3. [Déploiement Docker Swarm](#déploiement-docker-swarm)
4. [Déploiement Kubernetes](#déploiement-kubernetes)
5. [Configuration Production](#configuration-production)
6. [Monitoring et Logs](#monitoring-et-logs)
7. [Scaling](#scaling)
8. [Troubleshooting](#troubleshooting)

## Prérequis

### Développement Local
- Docker 24.0+
- Docker Compose 2.20+
- Java 17+ (optionnel, pour build local)
- Gradle 8.5+ (optionnel, pour build local)
- 8GB RAM minimum
- 20GB d'espace disque

### Production
- Cluster Kubernetes 1.28+ OU Docker Swarm
- Base de données PostgreSQL 15+ externe (recommandé)
- Redis Cluster externe (recommandé)
- Kafka Cluster externe (recommandé)
- Load Balancer (Nginx, HAProxy, ou cloud LB)
- Certificats SSL/TLS
- Monitoring stack (Prometheus, Grafana)

## Déploiement Local

### 1. Clone et Configuration

```bash
# Cloner le repository
git clone https://github.com/axisride/axisride-platform.git
cd axisride-platform

# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations
```

### 2. Démarrage Rapide

```bash
# Utiliser le script de démarrage
./start.sh

# OU utiliser make
make start

# OU utiliser docker-compose directement
docker-compose up -d
```

### 3. Vérification

```bash
# Vérifier les services
docker-compose ps

# Vérifier la santé
make health

# Suivre les logs
make logs
```

## Déploiement Docker Swarm

### 1. Initialiser le Swarm

```bash
# Sur le manager node
docker swarm init --advertise-addr <MANAGER-IP>

# Sur les worker nodes
docker swarm join --token <TOKEN> <MANAGER-IP>:2377
```

### 2. Créer les secrets

```bash
# Créer les secrets
echo "your-jwt-secret" | docker secret create jwt_secret -
echo "postgres" | docker secret create db_password -
```

### 3. Déployer la stack

```bash
# Créer le fichier docker-stack.yml
# Puis déployer
docker stack deploy -c docker-stack.yml axisride
```

### 4. Monitoring

```bash
# Voir les services
docker service ls

# Voir les logs d'un service
docker service logs axisride_auth-service

# Scaler un service
docker service scale axisride_auth-service=3
```

## Déploiement Kubernetes

### 1. Préparer le cluster

```bash
# Créer le namespace
kubectl create namespace axisride

# Créer les secrets
kubectl create secret generic axisride-secrets \
  --from-literal=jwt-secret=your-jwt-secret \
  --from-literal=db-password=your-db-password \
  --namespace=axisride
```

### 2. Déployer l'infrastructure

```bash
# PostgreSQL (ou utiliser un service managé)
kubectl apply -f k8s/infrastructure/postgres.yaml

# Redis
kubectl apply -f k8s/infrastructure/redis.yaml

# Kafka
kubectl apply -f k8s/infrastructure/kafka.yaml

# Keycloak
kubectl apply -f k8s/infrastructure/keycloak.yaml
```

### 3. Déployer les microservices

```bash
# Config Server
kubectl apply -f k8s/services/config-server.yaml

# Discovery Server
kubectl apply -f k8s/services/discovery-server.yaml

# API Gateway
kubectl apply -f k8s/services/api-gateway.yaml

# Business Services
kubectl apply -f k8s/services/auth-service.yaml
kubectl apply -f k8s/services/user-service.yaml
kubectl apply -f k8s/services/trip-service.yaml
# ... autres services
```

### 4. Configurer l'Ingress

```bash
# Installer Nginx Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# Appliquer la configuration Ingress
kubectl apply -f k8s/ingress/axisride-ingress.yaml
```

## Configuration Production

### 1. Base de Données

```yaml
# Utiliser une base de données managée
DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
DB_PORT=5432
DB_USERNAME=axisride_admin
DB_PASSWORD=<strong-password>

# Activer SSL
DB_SSL_MODE=require
```

### 2. Redis

```yaml
# Utiliser Redis Cluster managé
REDIS_HOST=your-redis-cluster.region.cache.amazonaws.com
REDIS_PORT=6379
REDIS_PASSWORD=<redis-password>
REDIS_SSL=true
```

### 3. Kafka

```yaml
# Utiliser Kafka managé (MSK, Confluent Cloud)
SPRING_KAFKA_BOOTSTRAP_SERVERS=broker1:9092,broker2:9092,broker3:9092
SPRING_KAFKA_SECURITY_PROTOCOL=SASL_SSL
SPRING_KAFKA_SASL_MECHANISM=PLAIN
SPRING_KAFKA_SASL_JAAS_CONFIG=...
```

### 4. Sécurité

```yaml
# JWT - Utiliser un secret fort
JWT_SECRET=<générer-avec-openssl-rand-base64-64>

# HTTPS uniquement
FORCE_HTTPS=true
HSTS_ENABLED=true

# Rate limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_REQUESTS_PER_MINUTE=100
```

### 5. Monitoring

```yaml
# Activer les métriques
MANAGEMENT_METRICS_EXPORT_PROMETHEUS_ENABLED=true

# Activer les traces distribuées
SPRING_ZIPKIN_ENABLED=true
SPRING_ZIPKIN_BASE_URL=http://zipkin:9411
```

## Monitoring et Logs

### 1. Prometheus & Grafana

```bash
# Déployer Prometheus
kubectl apply -f k8s/monitoring/prometheus.yaml

# Déployer Grafana
kubectl apply -f k8s/monitoring/grafana.yaml

# Importer les dashboards AxisRide
kubectl apply -f k8s/monitoring/dashboards/
```

### 2. ELK Stack (Logs)

```bash
# Elasticsearch
kubectl apply -f k8s/logging/elasticsearch.yaml

# Logstash
kubectl apply -f k8s/logging/logstash.yaml

# Kibana
kubectl apply -f k8s/logging/kibana.yaml

# Filebeat (sur chaque node)
kubectl apply -f k8s/logging/filebeat.yaml
```

### 3. Alerting

```yaml
# Alertmanager configuration
kubectl apply -f k8s/monitoring/alertmanager.yaml
```

## Scaling

### Scaling Horizontal (Kubernetes)

```bash
# Scaler manuellement
kubectl scale deployment auth-service --replicas=5 -n axisride

# Autoscaling basé sur CPU/Memory
kubectl autoscale deployment auth-service \
  --cpu-percent=70 \
  --min=2 \
  --max=10 \
  -n axisride
```

### Scaling Vertical

```yaml
# Augmenter les ressources
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "2000m"
```

## Troubleshooting

### Services ne démarrent pas

```bash
# Vérifier les logs
kubectl logs -f deployment/auth-service -n axisride

# Vérifier les événements
kubectl get events -n axisride --sort-by='.lastTimestamp'

# Vérifier les ConfigMaps/Secrets
kubectl get configmap -n axisride
kubectl get secrets -n axisride
```

### Problèmes de connectivité

```bash
# Tester la connectivité entre pods
kubectl exec -it <pod-name> -n axisride -- sh
# Puis dans le pod:
curl http://auth-service:8081/actuator/health
```

### Problèmes de performance

```bash
# Vérifier les métriques
kubectl top nodes
kubectl top pods -n axisride

# Analyser les slow queries (PostgreSQL)
kubectl exec -it postgres-0 -n axisride -- psql -U postgres -d axisride_auth
# Puis:
SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;
```

### Base de données pleine

```bash
# Vérifier l'espace disque
kubectl exec -it postgres-0 -n axisride -- df -h

# Nettoyer les anciennes données
kubectl exec -it postgres-0 -n axisride -- psql -U postgres
# VACUUM FULL;
```

## Backup et Restauration

### Backup PostgreSQL

```bash
# Backup automatique avec cronjob
kubectl apply -f k8s/backup/postgres-backup-cronjob.yaml

# Backup manuel
kubectl exec -it postgres-0 -n axisride -- \
  pg_dumpall -U postgres | gzip > backup-$(date +%Y%m%d).sql.gz
```

### Restauration

```bash
# Restaurer depuis un backup
gunzip < backup-20240201.sql.gz | \
  kubectl exec -i postgres-0 -n axisride -- psql -U postgres
```

## Rollback

### Kubernetes

```bash
# Voir l'historique des déploiements
kubectl rollout history deployment/auth-service -n axisride

# Rollback vers la version précédente
kubectl rollout undo deployment/auth-service -n axisride

# Rollback vers une version spécifique
kubectl rollout undo deployment/auth-service --to-revision=2 -n axisride
```

### Docker Swarm

```bash
# Rollback un service
docker service rollback axisride_auth-service
```

## Maintenance

### Mise à jour des services

```bash
# Build nouvelle version
docker build -t axisride/auth-service:v2.0.0 .

# Push vers registry
docker push axisride/auth-service:v2.0.0

# Update le déploiement
kubectl set image deployment/auth-service \
  auth-service=axisride/auth-service:v2.0.0 \
  -n axisride

# Suivre le rollout
kubectl rollout status deployment/auth-service -n axisride
```

### Maintenance des bases de données

```bash
# VACUUM PostgreSQL (récupérer l'espace)
kubectl exec -it postgres-0 -n axisride -- \
  psql -U postgres -d axisride_auth -c "VACUUM ANALYZE;"

# Reindex
kubectl exec -it postgres-0 -n axisride -- \
  psql -U postgres -d axisride_auth -c "REINDEX DATABASE axisride_auth;"
```

---

Pour plus d'informations, consultez la [documentation complète](https://docs.axisride.com) ou contactez l'équipe DevOps.
