#!/bin/bash

# Script to convert logistics demo to concrete batch plant demo
# Replaces company name, terminology, colors, and industry-specific language

cd "$(dirname "$0")"

# Make backup
cp index.html index.html.backup

# Company/Branding
sed -i '' 's/Valley Rock & Gravel/Sierra Ready-Mix Concrete/g' index.html
sed -i '' 's/Valley Rock/Sierra Ready-Mix/g' index.html

# Primary Colors - Change from Emerald to Concrete Gray/Orange
sed -i '' 's/--primary: #10b981/--primary: #fb923c/g' index.html  # Orange primary
sed -i '' 's/--primary-dark: #059669/--primary-dark: #ea580c/g' index.html
sed -i '' 's/--primary-light: #34d399/--primary-light: #fdba74/g' index.html
sed -i '' 's/--primary-glow: rgba(16, 185, 129, 0.2)/--primary-glow: rgba(251, 146, 60, 0.2)/g' index.html

# Replace all gradient references
sed -i '' 's/rgba(16, 185, 129/rgba(251, 146, 60/g' index.html
sed -i '' 's/#10b981/#fb923c/g' index.html
sed -i '' 's/#059669/#ea580c/g' index.html
sed -i '' 's/#34d399/#fdba74/g' index.html

# Terminology replacements
sed -i '' 's/Loads/Pours/g' index.html
sed -i '' 's/loads/pours/g' index.html
sed -i '' 's/Load/Pour/g' index.html
sed -i '' 's/load/pour/g' index.html

sed -i '' 's/Delivery/Pour/g' index.html
sed -i '' 's/delivery/pour/g' index.html
sed -i '' 's/Deliveries/Pours/g' index.html
sed -i '' 's/deliveries/pours/g' index.html

# Keep "Delivered" as "Delivered" (makes sense for concrete)
# But change "Active Deliveries" to "Active Pours"
sed -i '' 's/Active Pours/Active Pours/g' index.html

# Dispatcher → Batch Plant Operator
sed -i '' 's/Dispatcher/Batch Plant Operator/g' index.html
sed -i '' 's/dispatcher/batch plant operator/g' index.html

# Trucks (keep as trucks, but might reference "mixer trucks")
# Materials → Mix Designs
sed -i '' 's/Materials/Mix Designs/g' index.html
sed -i '' 's/materials/mix designs/g' index.html

# Add concrete-specific terms in relevant places
echo "Manual replacements will be needed for:"
echo "- Customer names (construction companies)"
echo "- Load details (add PSI, slump, mix design)"
echo "- Dashboard metrics (yards instead of tons)"
echo "- Job site addresses"
echo ""
echo "Backup saved to index.html.backup"
echo "Conversion complete!"
