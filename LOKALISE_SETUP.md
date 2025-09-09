# Lokalise GitHub Actions Setup

This repository is configured to automatically sync translations with Lokalise using GitHub Actions.

## Workflows

### 1. Push to Lokalise (`push-to-lokalise.yml`)
- **Triggers:** 
  - Manual trigger via GitHub Actions UI
  - Automatic trigger when files in `src/locales/` are changed on main branch
- **Purpose:** Uploads new or updated translation keys from GitHub to Lokalise
- **Base Language:** English (`en`)

### 2. Pull from Lokalise (`pull-from-lokalise.yml`)
- **Triggers:**
  - Manual trigger via GitHub Actions UI  
  - Scheduled weekly on Mondays at 9 AM UTC
- **Purpose:** Downloads translated content from Lokalise and creates a pull request

## Setup Steps Completed

✅ Created GitHub Actions workflows  
⚠️ **TODO: Replace `YOUR_LOKALISE_PROJECT_ID` with your actual Lokalise project ID**  
⚠️ **TODO: Add `LOKALISE_API_TOKEN` to GitHub repository secrets**  
⚠️ **TODO: Configure workflow permissions in GitHub Settings**  

## Manual Usage

### To Push Translations to Lokalise:
1. Go to Actions tab in GitHub
2. Select "Push to Lokalise" workflow
3. Click "Run workflow" 
4. Select branch (usually main)
5. Click "Run workflow"

### To Pull Translations from Lokalise:
1. Go to Actions tab in GitHub  
2. Select "Pull from Lokalise" workflow
3. Click "Run workflow"
4. Select branch (usually main)
5. Click "Run workflow"
6. Review and merge the created pull request

## File Structure

```
src/locales/
├── en.json      # Base language (English)
├── en-US.json   # English US variant
├── es.json      # Spanish
└── fr.json      # French
```

## Important Notes

- Only the base language (English) files are pushed to Lokalise
- All language files are pulled from Lokalise
- Translation keys are automatically tagged with the branch name in Lokalise
- Files use flat naming convention (e.g., `en.json` not `en/file.json`)
