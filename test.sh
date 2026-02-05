#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🧪 AxisRide API Testing Suite"
echo "=============================="
echo ""

# Base URL
BASE_URL="http://localhost:8080"
AUTH_URL="http://localhost:8081"

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to print test result
print_result() {
    local test_name=$1
    local result=$2
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✓${NC} $test_name"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗${NC} $test_name"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Function to check HTTP status code
check_status() {
    local status=$1
    local expected=$2
    
    if [ "$status" = "$expected" ]; then
        echo "PASS"
    else
        echo "FAIL"
    fi
}

echo "🔍 Checking if services are running..."
echo ""

# Test 1: Discovery Server Health
echo -n "Testing Discovery Server (8761)... "
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8761/actuator/health)
print_result "Discovery Server Health" $(check_status $RESPONSE "200")

# Test 2: API Gateway Health
echo -n "Testing API Gateway (8080)... "
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/actuator/health)
print_result "API Gateway Health" $(check_status $RESPONSE "200")

# Test 3: Auth Service Health
echo -n "Testing Auth Service (8081)... "
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/actuator/health)
print_result "Auth Service Health" $(check_status $RESPONSE "200")

echo ""
echo "📝 Testing User Registration and Authentication..."
echo ""

# Generate random email
RANDOM_EMAIL="test_$(date +%s)@axisride.com"
PASSWORD="Test@1234"

# Test 4: User Registration
echo -n "Testing User Registration... "
REGISTER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$RANDOM_EMAIL\",
        \"password\": \"$PASSWORD\",
        \"firstName\": \"Test\",
        \"lastName\": \"User\",
        \"phoneNumber\": \"+33612345678\",
        \"role\": \"USER\"
    }")

STATUS=$(echo "$REGISTER_RESPONSE" | tail -n1)
BODY=$(echo "$REGISTER_RESPONSE" | sed '$d')

if [ "$STATUS" = "201" ] && echo "$BODY" | grep -q "accessToken"; then
    print_result "User Registration" "PASS"
    ACCESS_TOKEN=$(echo "$BODY" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
else
    print_result "User Registration" "FAIL"
    ACCESS_TOKEN=""
fi

# Test 5: User Login
echo -n "Testing User Login... "
LOGIN_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{
        \"emailOrPhone\": \"$RANDOM_EMAIL\",
        \"password\": \"$PASSWORD\"
    }")

STATUS=$(echo "$LOGIN_RESPONSE" | tail -n1)
BODY=$(echo "$LOGIN_RESPONSE" | sed '$d')

if [ "$STATUS" = "200" ] && echo "$BODY" | grep -q "accessToken"; then
    print_result "User Login" "PASS"
else
    print_result "User Login" "FAIL"
fi

# Test 6: Invalid Login
echo -n "Testing Invalid Login (should fail)... "
INVALID_LOGIN_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{
        \"emailOrPhone\": \"$RANDOM_EMAIL\",
        \"password\": \"WrongPassword123\"
    }")

if [ "$INVALID_LOGIN_RESPONSE" = "401" ] || [ "$INVALID_LOGIN_RESPONSE" = "400" ] || [ "$INVALID_LOGIN_RESPONSE" = "500" ]; then
    print_result "Invalid Login Returns Error" "PASS"
else
    print_result "Invalid Login Returns Error" "FAIL"
fi

# Test 7: Duplicate Email Registration
echo -n "Testing Duplicate Email (should fail)... "
DUPLICATE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$RANDOM_EMAIL\",
        \"password\": \"$PASSWORD\",
        \"firstName\": \"Test\",
        \"lastName\": \"User\",
        \"role\": \"USER\"
    }")

if [ "$DUPLICATE_RESPONSE" = "400" ] || [ "$DUPLICATE_RESPONSE" = "409" ] || [ "$DUPLICATE_RESPONSE" = "500" ]; then
    print_result "Duplicate Email Prevention" "PASS"
else
    print_result "Duplicate Email Prevention" "FAIL"
fi

echo ""
echo "🔐 Testing Driver Registration..."
echo ""

# Test 8: Driver Registration
DRIVER_EMAIL="driver_$(date +%s)@axisride.com"
echo -n "Testing Driver Registration... "
DRIVER_REGISTER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$DRIVER_EMAIL\",
        \"password\": \"$PASSWORD\",
        \"firstName\": \"Driver\",
        \"lastName\": \"Test\",
        \"phoneNumber\": \"+33698765432\",
        \"role\": \"DRIVER\"
    }")

STATUS=$(echo "$DRIVER_REGISTER_RESPONSE" | tail -n1)
BODY=$(echo "$DRIVER_REGISTER_RESPONSE" | sed '$d')

if [ "$STATUS" = "201" ] && echo "$BODY" | grep -q "ROLE_DRIVER"; then
    print_result "Driver Registration with ROLE_DRIVER" "PASS"
else
    print_result "Driver Registration with ROLE_DRIVER" "FAIL"
fi

echo ""
echo "📊 Test Summary"
echo "==============="
echo ""
echo -e "Total Tests:  $TOTAL_TESTS"
echo -e "${GREEN}Passed:       $PASSED_TESTS${NC}"
echo -e "${RED}Failed:       $FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Check the logs above.${NC}"
    exit 1
fi
