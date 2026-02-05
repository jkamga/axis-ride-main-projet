# 🚀 Démarrage AxisRide SANS BUILD

## ❌ Problème: Gradle Wrapper ne fonctionne pas

Si vous rencontrez l'erreur:
```
./gradlew: line 4: gradle/wrapper/gradle-wrapper.jar: No such file or directory
```

C'est parce que le fichier JAR du wrapper Gradle n'est pas inclus (trop gros pour l'archive).

## ✅ Solutions (par ordre de préférence)

---

## Solution 1: Installer Gradle (PLUS SIMPLE) ⭐

### Windows

```bash
# Avec Chocolatey (recommandé)
choco install gradle

# OU télécharger manuellement
# https://gradle.org/releases/
# Extraire et ajouter bin/ au PATH
```

### Mac

```bash
brew install gradle
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install gradle

# Fedora/RHEL
sudo dnf install gradle
```

### Puis utiliser Gradle système

```bash
# Au lieu de ./gradlew, utiliser gradle directement
gradle clean build

# OU utiliser le script fourni
./build-all.sh
```

---

## Solution 2: Utiliser Maven (ALTERNATIVE)

Si Maven est déjà installé:

```bash
# Vérifier Maven
mvn --version

# Utiliser le script qui génère les pom.xml
./build-all.sh
```

Le script créera automatiquement les fichiers `pom.xml` et compilera avec Maven.

---

## Solution 3: Utiliser Docker pour Build (SANS INSTALLER)

### Créer un Dockerfile de build

```dockerfile
FROM gradle:8.5-jdk17-alpine AS builder
WORKDIR /app
COPY . .
RUN gradle clean build --no-daemon

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/*/build/libs/*.jar ./
CMD ["sh"]
```

### Build avec Docker

```bash
# Build l'image
docker build -t axisride-builder .

# Extraire les JARs compilés
docker run --rm -v $(pwd)/jars:/out axisride-builder sh -c "cp *.jar /out/"

# Les JARs sont maintenant dans ./jars/
```

---

## Solution 4: Mode "Développement Sans Build" ⭐

Lancer uniquement l'infrastructure et développer sans compiler:

### Étape 1: Infrastructure

```bash
./start-simple.sh

# OU
docker-compose -f docker-compose-simple.yml up -d
```

### Étape 2: Vérifier que ça fonctionne

```bash
# PostgreSQL
docker exec -it axisride-postgres psql -U postgres -c "SELECT version();"

# Redis
docker exec -it axisride-redis redis-cli ping

# Kafka
docker exec -it axisride-kafka kafka-topics.sh --bootstrap-server localhost:9092 --list

# Keycloak
curl http://localhost:8180
```

### Étape 3: Développer le Frontend Uniquement

```bash
cd frontend-angular

# Installer les dépendances
npm install

# Lancer le frontend
npm start
```

Le frontend sera accessible sur **http://localhost:4200**

Pour les appels API, vous pouvez:
- Utiliser un mock backend
- Configurer des services externes
- Implémenter progressivement les microservices

---

## Solution 5: Images Docker Pré-buildées (FUTUR)

Dans une prochaine version, nous fournirons des images Docker pré-compilées:

```yaml
# docker-compose-prebuild.yml
services:
  auth-service:
    image: axisride/auth-service:latest  # Image pré-buildée
    ports: ["8081:8081"]
```

Pour l'instant, cette option n'est pas encore disponible.

---

## 🎯 Méthode Recommandée (Plus Rapide)

### Si vous voulez TOUT faire fonctionner rapidement:

1. **Installer Gradle** (5 minutes)
   ```bash
   # Windows
   choco install gradle
   
   # Mac
   brew install gradle
   
   # Linux
   sudo apt install gradle
   ```

2. **Build les services** (5-10 minutes)
   ```bash
   gradle clean build
   # OU
   ./build-all.sh
   ```

3. **Lancer** (voir DEMARRAGE_RAPIDE.md)

### Si vous voulez juste tester le frontend:

1. **Infrastructure** (2 minutes)
   ```bash
   ./start-simple.sh
   ```

2. **Frontend** (2 minutes)
   ```bash
   cd frontend-angular
   npm install
   npm start
   ```

3. **Développer** avec les services mockés

---

## 🔧 Troubleshooting

### "gradle: command not found"

Gradle n'est pas dans le PATH. Solutions:

**Windows:**
```bash
# Ajouter au PATH
setx PATH "%PATH%;C:\Gradle\gradle-8.5\bin"
```

**Linux/Mac:**
```bash
# Ajouter à ~/.bashrc ou ~/.zshrc
export PATH=$PATH:/opt/gradle/gradle-8.5/bin
```

### "mvn: command not found"

Maven n'est pas installé:

```bash
# Windows
choco install maven

# Mac
brew install maven

# Linux
sudo apt install maven
```

### "Java command not found"

Java 17 doit être installé:

```bash
# Vérifier Java
java -version

# Si absent, installer Java 17
# Windows: https://adoptium.net/
# Mac: brew install openjdk@17
# Linux: sudo apt install openjdk-17-jdk
```

### Problème de permissions (Linux/Mac)

```bash
chmod +x build-all.sh
chmod +x start-simple.sh
```

---

## 📊 Comparaison des Solutions

| Solution | Temps | Difficulté | Prérequis |
|----------|-------|------------|-----------|
| **Installer Gradle** | 15 min | ⭐ Facile | Internet |
| **Utiliser Maven** | 20 min | ⭐⭐ Moyen | Maven installé |
| **Docker Build** | 30 min | ⭐⭐⭐ Avancé | Docker |
| **Frontend seul** | 5 min | ⭐ Facile | Node.js |

---

## 💡 Conseil

Pour un environnement de développement professionnel, nous recommandons **fortement** d'installer Gradle ou Maven. C'est un investissement de 5 minutes qui vous fera gagner des heures par la suite.

### Installation Rapide Gradle

```bash
# Windows (PowerShell admin)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
choco install gradle

# Mac
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install gradle

# Linux Ubuntu/Debian
sudo apt update
sudo apt install gradle -y
```

Après installation, redémarrez votre terminal et lancez:

```bash
gradle --version
./build-all.sh
```

---

## 📞 Support

Si aucune de ces solutions ne fonctionne, créez une issue avec:
- Votre système d'exploitation
- La version de Java (`java -version`)
- Le message d'erreur complet
- Ce que vous avez déjà essayé

---

**En attendant, vous pouvez toujours développer et tester le frontend Angular qui est 100% fonctionnel ! 🎉**
