.PHONY: help build start stop restart logs clean test

help: ## Afficher l'aide
	@echo "AxisRide Platform - Commandes disponibles:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Construire tous les services
	@echo "🔨 Building all services..."
	docker-compose build

start: ## Démarrer tous les services
	@echo "🚀 Starting AxisRide Platform..."
	./start.sh

stop: ## Arrêter tous les services
	@echo "🛑 Stopping all services..."
	docker-compose down

restart: stop start ## Redémarrer tous les services

logs: ## Suivre les logs de tous les services
	docker-compose logs -f

logs-service: ## Suivre les logs d'un service spécifique (usage: make logs-service SERVICE=auth-service)
	docker-compose logs -f $(SERVICE)

clean: ## Nettoyer tous les conteneurs, volumes et images
	@echo "🧹 Cleaning up..."
	docker-compose down -v --remove-orphans
	docker system prune -f

ps: ## Afficher le status des services
	docker-compose ps

health: ## Vérifier la santé de tous les services
	@echo "🔍 Checking service health..."
	@curl -s http://localhost:8761/actuator/health | jq . || echo "❌ Discovery Server"
	@curl -s http://localhost:8080/actuator/health | jq . || echo "❌ API Gateway"
	@curl -s http://localhost:8081/actuator/health | jq . || echo "❌ Auth Service"
	@curl -s http://localhost:8083/actuator/health | jq . || echo "❌ Trip Service"

test-register: ## Tester l'enregistrement d'un utilisateur
	@echo "📝 Testing user registration..."
	curl -X POST http://localhost:8080/api/auth/register \
		-H "Content-Type: application/json" \
		-d '{"email":"test@axisride.com","password":"Test@1234","firstName":"John","lastName":"Doe","phoneNumber":"+33612345678","role":"USER"}' | jq .

test-login: ## Tester la connexion d'un utilisateur
	@echo "🔐 Testing user login..."
	curl -X POST http://localhost:8080/api/auth/login \
		-H "Content-Type: application/json" \
		-d '{"emailOrPhone":"test@axisride.com","password":"Test@1234"}' | jq .

dev-build: ## Build en mode développement (sans cache)
	./gradlew clean build --no-daemon

dev-run: ## Exécuter un service en mode développement (usage: make dev-run SERVICE=auth-service)
	./gradlew :$(SERVICE):bootRun

kafka-topics: ## Lister les topics Kafka
	docker exec -it axisride-kafka kafka-topics.sh --bootstrap-server localhost:9092 --list

db-shell: ## Ouvrir un shell PostgreSQL
	docker exec -it axisride-postgres psql -U postgres -d axisride_auth

redis-cli: ## Ouvrir Redis CLI
	docker exec -it axisride-redis redis-cli

eureka: ## Ouvrir Eureka Dashboard dans le navigateur
	@echo "Opening Eureka Dashboard..."
	@open http://localhost:8761 || xdg-open http://localhost:8761 || echo "Please open http://localhost:8761 in your browser"

keycloak: ## Ouvrir Keycloak Admin Console
	@echo "Opening Keycloak Admin Console..."
	@open http://localhost:8180 || xdg-open http://localhost:8180 || echo "Please open http://localhost:8180 in your browser (admin/admin)"

install-deps: ## Installer les dépendances Gradle
	./gradlew dependencies

wrapper: ## Mettre à jour Gradle Wrapper
	./gradlew wrapper --gradle-version=8.5
