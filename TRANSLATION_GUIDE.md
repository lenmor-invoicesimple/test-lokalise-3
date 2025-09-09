# Quick Manual Translation Guide

Since the API auto-translation endpoints aren't working, here's the fastest way to get your keys translated:

## Option 1: Manual UI Translation (Recommended - Takes 2 minutes)

1. **Go to your Lokalise project**: https://app.lokalise.com/
2. **Open the Editor tab**
3. **Select all untranslated keys**:
   - Click the checkbox at the top to select all keys
   - Or use Ctrl/Cmd + A
4. **Bulk auto-translate**:
   - Click the "Actions" button (three dots)
   - Select "Auto-translate"
   - Choose your target languages: Spanish (es), French (fr)
   - Select translation provider: Google Translate (or DeepL if you have it)
   - Click "Translate"
5. **Wait for completion** (usually 30 seconds - 2 minutes)

## Option 2: Enable Automation for Future Keys

1. **Go to Settings → Automations**
2. **Create new automation rule**:
   - **Trigger**: "When key is created" OR "When key is updated"
   - **Condition**: "Key is in base language" (English)
   - **Action**: "Auto-translate to target languages"
   - **Languages**: Spanish, French (add more as needed)
   - **Provider**: Google Translate
   - **Minimal change required**: 0%
3. **Save the rule**

## Option 3: Run GitHub Pull Action After Manual Translation

Once you've manually translated in the UI:

1. Go to your GitHub repository
2. Click Actions → "Pull from Lokalise"
3. Click "Run workflow"
4. Select your branch (some-updates)
5. Click "Run workflow"

This will create a pull request with all your translated files.

## Your Current Keys That Need Translation:

Based on the debug output, you have 12 keys that need translation:
- welcome_header
- greeting  
- welcome
- test_key
- test.key.1
- new.key
- new.key.2
- new.key.3
- new.key.4
- (and 3 more)

**Recommendation**: Use Option 1 (Manual UI) first to get your immediate translations, then set up Option 2 (Automation) for future keys.
