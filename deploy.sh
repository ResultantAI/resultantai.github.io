#!/bin/bash
# ============================================
# ResultantAI Website Deployment Script
# GitHub Pages: resultantai.github.io
# With PR workflow for branch protection
# ============================================

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  ResultantAI Website Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Configuration
DOWNLOADS_DIR="$HOME/Downloads"

# Check if we're in the repo
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    echo "Please run this script from /Users/cj/resultantai.github.io"
    exit 1
fi

# Make sure we're on main and up to date
echo -e "${YELLOW}Step 1: Updating main branch...${NC}"
git checkout main
git pull origin main
echo -e "${GREEN}  ✓ Main branch updated${NC}"
echo ""

# Step 2: Create directory structure
echo -e "${YELLOW}Step 2: Ensuring directory structure...${NC}"
mkdir -p reddit
mkdir -p gateway
mkdir -p images
echo -e "${GREEN}  ✓ Directories ready${NC}"
echo ""

# Step 3: Check for new files to copy
echo -e "${YELLOW}Step 3: Checking for new pages in Downloads...${NC}"

NEW_FILES=()

# Main site pages
if [ -f "$DOWNLOADS_DIR/about.html" ]; then
    echo "  Found: about.html"
    NEW_FILES+=("about.html")
fi

if [ -f "$DOWNLOADS_DIR/contact-us.html" ]; then
    echo "  Found: contact-us.html"
    NEW_FILES+=("contact-us.html")
fi

if [ -f "$DOWNLOADS_DIR/paper-to-digital.html" ]; then
    echo "  Found: paper-to-digital.html"
    NEW_FILES+=("paper-to-digital.html")
fi

# Gateway landing page
if [ -f "$DOWNLOADS_DIR/gateway-landing-v8-final.html" ]; then
    echo "  Found: gateway-landing-v8-final.html"
    NEW_FILES+=("gateway/index.html")
fi

# Reddit campaign pages
if [ -f "$DOWNLOADS_DIR/reddit/bill-shock.html" ]; then
    echo "  Found: reddit/bill-shock.html"
    NEW_FILES+=("reddit/bill-shock.html")
fi

if [ -f "$DOWNLOADS_DIR/reddit/one-key.html" ]; then
    echo "  Found: reddit/one-key.html"
    NEW_FILES+=("reddit/one-key.html")
fi

if [ ${#NEW_FILES[@]} -eq 0 ]; then
    echo ""
    echo -e "${YELLOW}No new files found in Downloads.${NC}"
    echo "Make sure files are in $DOWNLOADS_DIR"
    exit 0
fi

echo -e "${GREEN}  ✓ Found ${#NEW_FILES[@]} file(s) to deploy${NC}"
echo ""

# Step 4: Ask for confirmation
echo -e "${YELLOW}Step 4: Ready to deploy these files?${NC}"
for file in "${NEW_FILES[@]}"; do
    echo "  • $file"
done
echo ""
read -p "Continue? (y/n): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Deployment cancelled."
    exit 0
fi

# Step 5: Create feature branch
BRANCH_NAME="deploy-$(date +%Y%m%d-%H%M%S)"
echo ""
echo -e "${YELLOW}Step 5: Creating feature branch: ${BRANCH_NAME}${NC}"
git checkout -b "$BRANCH_NAME"
echo -e "${GREEN}  ✓ Branch created${NC}"
echo ""

# Step 6: Copy files
echo -e "${YELLOW}Step 6: Copying files...${NC}"

if [ -f "$DOWNLOADS_DIR/about.html" ]; then
    cp "$DOWNLOADS_DIR/about.html" ./about.html
    echo "  ✓ about.html"
fi

if [ -f "$DOWNLOADS_DIR/contact-us.html" ]; then
    cp "$DOWNLOADS_DIR/contact-us.html" ./contact-us.html
    echo "  ✓ contact-us.html"
fi

if [ -f "$DOWNLOADS_DIR/paper-to-digital.html" ]; then
    cp "$DOWNLOADS_DIR/paper-to-digital.html" ./paper-to-digital.html
    echo "  ✓ paper-to-digital.html"
fi

if [ -f "$DOWNLOADS_DIR/gateway-landing-v8-final.html" ]; then
    cp "$DOWNLOADS_DIR/gateway-landing-v8-final.html" ./gateway/index.html
    echo "  ✓ gateway/index.html (v8 final)"
fi

if [ -f "$DOWNLOADS_DIR/reddit/bill-shock.html" ]; then
    cp "$DOWNLOADS_DIR/reddit/bill-shock.html" ./reddit/bill-shock.html
    echo "  ✓ reddit/bill-shock.html"
fi

if [ -f "$DOWNLOADS_DIR/reddit/one-key.html" ]; then
    cp "$DOWNLOADS_DIR/reddit/one-key.html" ./reddit/one-key.html
    echo "  ✓ reddit/one-key.html"
fi

if [ -d "$DOWNLOADS_DIR/stripe-images" ]; then
    cp "$DOWNLOADS_DIR/stripe-images/"*.png ./images/ 2>/dev/null || true
    echo "  ✓ Stripe product images (if any)"
fi

echo -e "${GREEN}  ✓ All files copied${NC}"
echo ""

# Step 7: Git commit
echo -e "${YELLOW}Step 7: Creating commit...${NC}"
git add -A

# Show what changed
echo ""
echo "Files changed:"
git status --short
echo ""

read -p "Enter commit message (or press Enter for default): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Deploy new pages and updates

New pages added:
- about.html (if exists)
- contact-us.html (if exists)
- paper-to-digital.html (if exists)
- reddit landing pages (if exist)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

git commit -m "$COMMIT_MSG"
echo -e "${GREEN}  ✓ Commit created${NC}"
echo ""

# Step 8: Push and create PR
echo -e "${YELLOW}Step 8: Pushing branch and creating PR...${NC}"
git push origin "$BRANCH_NAME"
echo ""

# Create PR using gh CLI
gh pr create --title "Deploy new pages and updates" --body "## Deployment

New files deployed:
$(for file in "${NEW_FILES[@]}"; do echo "- \`$file\`"; done)

## Live URLs (after merge):
- https://resultantai.com/about (if added)
- https://resultantai.com/contact-us (if added)
- https://resultantai.com/paper-to-digital (if added)
- https://resultantai.com/gateway
- https://resultantai.com/reddit/bill-shock (if added)
- https://resultantai.com/reddit/one-key (if added)

🤖 Generated with [Claude Code](https://claude.com/claude-code)"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✓ Pull request created!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Review the PR on GitHub"
echo "  2. Merge the PR to deploy to production"
echo "  3. Pages will be live ~1-2 minutes after merge"
echo ""
echo "To auto-merge now, run:"
echo "  gh pr merge --squash --delete-branch"
echo ""

# Ask if they want to auto-merge
read -p "Auto-merge PR now? (y/n): " auto_merge

if [ "$auto_merge" = "y" ] || [ "$auto_merge" = "Y" ]; then
    gh pr merge --squash --delete-branch
    git checkout main
    git pull origin main

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✓ Deployed to production!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Live URLs:"
    echo "  • https://resultantai.com"
    echo "  • https://resultantai.com/about"
    echo "  • https://resultantai.com/contact-us"
    echo "  • https://resultantai.com/paper-to-digital"
    echo "  • https://resultantai.com/gateway"
    echo "  • https://resultantai.com/reddit/bill-shock"
    echo "  • https://resultantai.com/reddit/one-key"
    echo ""
    echo "Note: GitHub Pages may take 1-2 minutes to update."
else
    echo ""
    echo "PR created but not merged. Review on GitHub and merge when ready."
fi
