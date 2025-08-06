#!/bin/bash

# External Resource Analysis Runner
# Automatically analyzes the ICS Advisory Dashboard for external dependencies
# and generates an allowlist permissions request

set -e

echo "🔍 ICS Advisory Dashboard - External Resource Analysis"
echo "=================================================="
echo ""

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "📂 Repository Root: $REPO_ROOT"
echo "🐍 Python Version: $(python3 --version)"
echo ""

# Run the analysis
echo "🚀 Running external resource analysis..."
cd "$REPO_ROOT"
python3 "$SCRIPT_DIR/analyze_external_resources.py"

echo ""
echo "✅ Analysis complete! Generated files:"
echo ""
echo "📊 Detailed Analysis:"
echo "   docs/external_resources_analysis.json"
echo ""
echo "📋 Allowlist Request:"
echo "   docs/ALLOWLIST_REQUEST.md"
echo ""
echo "🚀 Next Steps:"
echo "1. Review the generated allowlist request"
echo "2. Submit docs/ALLOWLIST_REQUEST.md to your security/governance team"
echo "3. Implement recommended security measures (CSP, SRI hashes, etc.)"
echo ""
echo "💡 Pro tip: You can also view the files directly:"
echo "   cat docs/ALLOWLIST_REQUEST.md"
echo "   cat docs/external_resources_analysis.json | python3 -m json.tool"