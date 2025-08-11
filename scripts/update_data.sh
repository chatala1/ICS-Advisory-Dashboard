#!/bin/bash

# ICS Advisory Data Update Script
# This script fetches the latest ICS Advisory data from the source repository

echo "🔄 Updating ICS Advisory data..."

# Create ICS-CERT_ADV directory if it doesn't exist
mkdir -p ICS-CERT_ADV

# Download the latest master CSV file
echo "📥 Downloading latest CISA ICS Advisory Master CSV..."
curl -L -o ICS-CERT_ADV/CISA_ICS_ADV_Master.csv \
  "https://raw.githubusercontent.com/chatala1/ICS-Advisory-Project/main/ICS-CERT_ADV/CISA_ICS_ADV_Master.csv"

if [ $? -eq 0 ]; then
    echo "✅ Successfully downloaded CISA_ICS_ADV_Master.csv"
    
    # Get file size and record count for verification
    file_size=$(du -h ICS-CERT_ADV/CISA_ICS_ADV_Master.csv | cut -f1)
    record_count=$(tail -n +2 ICS-CERT_ADV/CISA_ICS_ADV_Master.csv | wc -l)
    
    echo "📊 Data file size: $file_size"
    echo "📈 Total advisory records: $record_count"
    
    # Update timestamp
    echo "🕐 Last updated: $(date)" > ICS-CERT_ADV/last_update.txt
    
    echo "🎉 Data update completed successfully!"
else
    echo "❌ Failed to download data file"
    exit 1
fi

# Optional: Download additional year-specific files for backup
echo "📚 Downloading latest yearly files..."

# Get current year
current_year=$(date +%Y)

# Download current year file if available
echo "📅 Trying to download ${current_year} data..."
curl -L -o "ICS-CERT_ADV/CISA_ICS_ADV_${current_year}_$(date +%m_%d).csv" \
  "https://raw.githubusercontent.com/chatala1/ICS-Advisory-Project/main/ICS-CERT_ADV/CISA_ICS_ADV_${current_year}_$(date +%m_%d).csv" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Downloaded ${current_year} specific data file"
else
    echo "ℹ️  No specific ${current_year} file found (this is normal)"
fi

echo "🏁 Update process complete!"