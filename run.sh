#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  Bangali Sweets — Backend Run Script
#  Usage:  ./run.sh           (build if needed, then start)
#          ./run.sh --build   (force clean rebuild)
#          ./run.sh --help
# ─────────────────────────────────────────────────────────────
set -e

# ── colours ──────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

ok()   { echo -e "${GREEN}  ✔  $*${NC}"; }
info() { echo -e "${CYAN}  ●  $*${NC}"; }
warn() { echo -e "${YELLOW}  ⚠  $*${NC}"; }
die()  { echo -e "${RED}  ✘  $*${NC}"; exit 1; }

JAR="target/bangali-sweets-1.0.0.jar"
FORCE_BUILD=false

# ── parse args ────────────────────────────────────────────────
for arg in "$@"; do
  case $arg in
    --build|-b)  FORCE_BUILD=true ;;
    --help|-h)
      echo ""
      echo -e "${BOLD}Bangali Sweets — Backend${NC}"
      echo ""
      echo "  ./run.sh           Build if needed, then start"
      echo "  ./run.sh --build   Force clean rebuild before starting"
      echo "  ./run.sh --help    Show this message"
      echo ""
      echo "  API base:  http://localhost:8080/api"
      echo "  Admin:     POST /api/auth/admin/login  { username: admin, password: Bangali@2024 }"
      echo ""
      exit 0 ;;
    *) die "Unknown argument: $arg  (try --help)" ;;
  esac
done

# ── banner ────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}  🍬  Bangali Sweets · Spring Boot Backend${NC}"
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# ── cd to script dir so relative paths work ───────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ── find a Java 17+ binary ────────────────────────────────────
# The PATH java may be Java 8 (e.g. managed by jenv).
# Search common locations for a modern JVM on macOS / Linux.
find_java17() {
  local candidates=(
    # Maven's own JAVA_HOME (the JVM that compiled the JAR)
    "${JAVA_HOME}/bin/java"
    # Homebrew OpenJDK (latest & versioned)
    "/opt/homebrew/opt/openjdk/bin/java"
    "/opt/homebrew/opt/openjdk@21/bin/java"
    "/opt/homebrew/opt/openjdk@17/bin/java"
    "/usr/local/opt/openjdk/bin/java"
    "/usr/local/opt/openjdk@21/bin/java"
    "/usr/local/opt/openjdk@17/bin/java"
    # macOS system JVMs
    "/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home/bin/java"
    "/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/bin/java"
    # Generic fallback: scan all installed JVMs on macOS
  )

  # Also scan /Library/Java/JavaVirtualMachines/* (macOS)
  if [ -d /Library/Java/JavaVirtualMachines ]; then
    while IFS= read -r jvm; do
      candidates+=("$jvm/Contents/Home/bin/java")
    done < <(find /Library/Java/JavaVirtualMachines -maxdepth 1 -type d | sort -rV)
  fi

  for candidate in "${candidates[@]}"; do
    [ -x "$candidate" ] || continue
    local ver
    ver=$("$candidate" -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d. -f1)
    [ -z "$ver" ] && ver=$("$candidate" -version 2>&1 | grep -oE 'version "[0-9]+' | grep -oE '[0-9]+$')
    if [ -n "$ver" ] && [ "$ver" -ge 17 ] 2>/dev/null; then
      echo "$candidate"
      return 0
    fi
  done
  return 1
}

# Check PATH java version first
JAVA_BIN="java"
JAVA_VER=""
if command -v java &>/dev/null; then
  JAVA_VER=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d. -f1)
  # Handle "1.8" style version strings → 8
  [[ "$JAVA_VER" == "1" ]] && JAVA_VER=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d. -f2)
fi

if [ -n "$JAVA_VER" ] && [ "$JAVA_VER" -ge 17 ] 2>/dev/null; then
  ok "Java ${JAVA_VER} on PATH — $(java -version 2>&1 | head -1)"
else
  if [ -n "$JAVA_VER" ]; then
    warn "Java on PATH is version ${JAVA_VER} (need 17+). Searching for a newer JVM…"
  else
    warn "java not found on PATH. Searching for a JVM…"
  fi

  JAVA_BIN=$(find_java17) || \
    die "No Java 17+ found. Install it with one of:
       macOS (Homebrew):  brew install openjdk@21
       Adoptium:          https://adoptium.net
     Then re-run this script."

  ok "Found Java 17+ at: ${JAVA_BIN}"
  ok "Version: $(${JAVA_BIN} -version 2>&1 | head -1)"
fi

# ── check Maven ───────────────────────────────────────────────
if ! command -v mvn &>/dev/null; then
  die "Maven (mvn) not found. Install Maven 3.8+ and add it to PATH."
fi
info "Maven version: $(mvn -version 2>&1 | head -1 | cut -d' ' -f1-3)"

# ── check MySQL ───────────────────────────────────────────────
info "Checking MySQL…"
if ! mysqladmin ping -h 127.0.0.1 --silent 2>/dev/null; then
  echo ""
  die "MySQL is not running or not reachable on 127.0.0.1:3306.

     Start it with one of:
       macOS (Homebrew):  brew services start mysql
       Linux (systemd):   sudo systemctl start mysql
       Docker:            docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:8"
fi
ok "MySQL is running"

# Pull DB creds from application.properties
DB_URL=$(grep 'spring.datasource.url' src/main/resources/application.properties | cut -d= -f2-)
DB_USER=$(grep 'spring.datasource.username' src/main/resources/application.properties | cut -d= -f2-)
DB_PASS=$(grep 'spring.datasource.password' src/main/resources/application.properties | cut -d= -f2-)
DB_NAME=$(echo "$DB_URL" | grep -oE '[^/]+\?' | tr -d '?')

info "Database: ${DB_NAME}  user=${DB_USER}"

# Test DB connection
if ! mysql -h 127.0.0.1 -u"$DB_USER" -p"$DB_PASS" -e "SELECT 1;" &>/dev/null 2>&1; then
  warn "Cannot connect to MySQL with user=${DB_USER}. Check credentials in application.properties."
  warn "Attempting to continue — Spring Boot will report the error on startup."
fi

# ── build ─────────────────────────────────────────────────────
NEEDS_BUILD=false

if $FORCE_BUILD; then
  info "Forced rebuild requested…"
  NEEDS_BUILD=true
elif [ ! -f "$JAR" ]; then
  info "JAR not found — building…"
  NEEDS_BUILD=true
else
  # Rebuild if any source or resource file is newer than the JAR
  NEWER=$(find src -newer "$JAR" \( -name "*.java" -o -name "*.properties" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" \) 2>/dev/null | head -1)
  if [ -n "$NEWER" ]; then
    info "Source/config changed (e.g. $NEWER) — rebuilding…"
    NEEDS_BUILD=true
  else
    ok "JAR is up to date — skipping build"
  fi
fi

if $NEEDS_BUILD; then
  echo ""
  info "Running: mvn clean package -DskipTests"
  echo ""
  if ! mvn clean package -DskipTests; then
    echo ""
    die "Build failed. Fix the errors above and try again."
  fi
  echo ""
  ok "Build succeeded → $JAR"
fi

# ── launch ────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  ${GREEN}API${NC}      http://localhost:8080/api"
echo -e "  ${GREEN}Admin${NC}    username: admin   password: Bangali@2024"
echo -e "  ${GREEN}Stop${NC}     Ctrl + C"
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

exec "$JAVA_BIN" -jar "$JAR"
