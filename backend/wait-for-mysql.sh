set -e

host="$1"
shift
cmd="$@"

echo "Waiting for MySQL at $host..."
# используем mysql вместо mysqladmin
until mysql -h"$host" -uroot -ppassword -e "SELECT 1" >/dev/null 2>&1; do
  echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "MySQL is up - executing command"
exec $cmd
