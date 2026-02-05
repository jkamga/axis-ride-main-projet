#!/bin/bash

echo "🔨 AxisRide - Build Script"
echo "=========================="
echo ""

# Vérifier si Gradle est installé
if command -v gradle &> /dev/null; then
    echo "✅ Gradle trouvé: $(gradle --version | head -1)"
    echo ""
    echo "📦 Building avec Gradle système..."
    gradle clean build --no-daemon
    exit 0
fi

# Vérifier si Maven est installé
if command -v mvn &> /dev/null; then
    echo "✅ Maven trouvé: $(mvn --version | head -1)"
    echo ""
    echo "⚠️  Gradle n'est pas installé, tentative avec Maven..."
    echo ""
    
    # Créer des pom.xml simples pour chaque service
    echo "📝 Génération des fichiers pom.xml..."
    
    for service in discovery-server config-server api-gateway auth-service user-service trip-service payment-service chat-service geolocation-service notification-service loyalty-service analytics-service content-service; do
        cat > ${service}/pom.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.1</version>
        <relativePath/>
    </parent>

    <groupId>com.axisride</groupId>
    <artifactId>${service}</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2023.0.0</spring-cloud.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>\${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
EOF
    done
    
    echo ""
    echo "📦 Building avec Maven..."
    for service in discovery-server config-server api-gateway auth-service trip-service; do
        echo "   Building ${service}..."
        (cd ${service} && mvn clean package -DskipTests) || echo "⚠️  ${service} failed"
    done
    
    exit 0
fi

# Ni Gradle ni Maven disponibles
echo "❌ Erreur: Ni Gradle ni Maven ne sont installés"
echo ""
echo "📥 Solutions:"
echo ""
echo "Option 1: Installer Gradle (RECOMMANDÉ)"
echo "  Windows (avec Chocolatey): choco install gradle"
echo "  Mac: brew install gradle"
echo "  Linux: sudo apt install gradle"
echo ""
echo "Option 2: Installer Maven"
echo "  Windows (avec Chocolatey): choco install maven"
echo "  Mac: brew install maven"
echo "  Linux: sudo apt install maven"
echo ""
echo "Option 3: Télécharger Gradle manuellement"
echo "  1. Télécharger: https://gradle.org/releases/"
echo "  2. Extraire et ajouter bin/ au PATH"
echo ""
echo "Option 4: Utiliser les JARs pré-compilés (si disponibles)"
echo "  Les JARs sont dans */build/libs/ ou */target/"
echo ""

exit 1
