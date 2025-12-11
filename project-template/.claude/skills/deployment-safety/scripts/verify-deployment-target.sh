#!/bin/bash
# Verification script to identify correct deployment target
# Usage: ./verify-deployment-target.sh [optional-directory]

cd "${1:-.}"

echo "=== Active Cloud Functions ==="
gcloud functions list --format="table(name,updateTime,status)" 2>/dev/null || echo "No functions found or gcloud not configured"

echo ""
echo "=== Cloud Run Services ==="
gcloud run services list --platform=managed --format="table(name,region,url)" 2>/dev/null || echo "No Cloud Run services found"

echo ""
echo "=== Cloud Scheduler Jobs ==="
gcloud scheduler jobs list --location=europe-west1 --format="table(name,httpTarget.uri)" 2>/dev/null || echo "No scheduler jobs found"

echo ""
echo "=== Deploy Script Target ==="
if [ -f "./deploy.sh" ]; then
    echo "Found deploy.sh in current directory:"
    grep -E "gcloud (functions|run) deploy" deploy.sh || echo "No gcloud deploy command found in deploy.sh"
else
    echo "⚠️  No deploy.sh found in current directory: $(pwd)"
    echo "Searching parent directories..."

    # Search up to 3 levels up
    for dir in ../ ../../ ../../../; do
        if [ -f "${dir}deploy.sh" ]; then
            echo "Found deploy.sh in ${dir}:"
            grep -E "gcloud (functions|run) deploy" "${dir}deploy.sh"
            break
        fi
    done
fi

echo ""
echo "=== Current Directory ==="
echo "$(pwd)"
