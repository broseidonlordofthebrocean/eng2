# Engineering Reference - Separated Files

## 📦 File Structure

```
/
├── index.html           ← Main HTML (87 lines)
├── style.css            ← All styles (859 lines)
├── script.js            ← All JavaScript (1,201 lines)
└── engineering-reference.html  ← Original single-file version
```

---

## 🚀 Quick Start

### Option 1: Use Single File (Original)
```bash
open engineering-reference.html
```

### Option 2: Use Separated Files
```bash
# Must serve via HTTP (not file://)
python -m http.server 8000
# Open: http://localhost:8000/index.html
```

---

## 📝 When to Use Each

### Single File (`engineering-reference.html`)
✅ **Use for:**
- Quick testing locally
- Sharing with others (email, USB)
- Simple deployment
- No build process needed

❌ **Not ideal for:**
- Version control (huge diffs)
- Team collaboration
- Code organization

### Separated Files (`index.html` + `style.css` + `script.js`)
✅ **Use for:**
- Team development
- Git version control
- Code organization
- Easier editing
- Build pipelines

❌ **Not ideal for:**
- Quick sharing (3 files vs 1)
- Opening directly (needs server)

---

## 🔧 Editing Guide

### To Add Equations

**In Single File:**
1. Open `engineering-reference.html`
2. Find line ~950 (search `equationTemplates`)
3. Add your equation
4. Find line ~1420 (`solveEquation`)
5. Add solver logic
6. Save and refresh

**In Separated Files:**
1. Open `script.js`
2. Find line ~3 (`equationTemplates`)
3. Add your equation
4. Find line ~470 (`solveEquation`)
5. Add solver logic
6. Save and refresh

### To Change Styles

**In Single File:**
1. Open `engineering-reference.html`
2. Find line ~20 (inside `<style>`)
3. Edit CSS variables or styles
4. Save and refresh

**In Separated Files:**
1. Open `style.css`
2. Edit CSS variables (line 1) or any styles
3. Save and refresh

---

## 🎨 CSS Organization

The `style.css` file is organized into sections:

```css
/* Lines 1-30: CSS Variables (colors, spacing) */
/* Lines 31-100: Reset & Body */
/* Lines 101-200: Header */
/* Lines 201-400: Layout & Grid */
/* Lines 401-600: Sidebar */
/* Lines 601-800: Cards & Variables */
/* Lines 801-859: Tooltips & Misc */
```

---

## 💻 JavaScript Organization

The `script.js` file is organized into sections:

```javascript
// Lines 1-50: State & Config
// Lines 51-200: Mock Data Generator
// Lines 201-300: API Functions
// Lines 301-600: Rendering Functions
// Lines 601-900: Equation Solver
// Lines 901-1000: Search & Filter
// Lines 1001-1100: Event Handlers
// Lines 1101-1201: Initialization
```

---

## 🔄 Converting Between Formats

### From Separated → Single File
```bash
# Already done - use engineering-reference.html
```

### From Single → Separated
```bash
# Already done - use index.html + style.css + script.js
```

### Sync Changes
If you edit one format, you'll need to manually sync to the other.

**Recommendation:** Pick one format and stick with it.

---

## 🌐 Deployment

### Separated Files

**Netlify / Vercel:**
```bash
# Upload all 3 files
# Set index.html as entry point
# Deploy
```

**GitHub Pages:**
```bash
git add index.html style.css script.js
git commit -m "Deploy separated files"
git push origin main
# Enable Pages in repo settings
```

**Static Host:**
```bash
# Upload all 3 files to same directory
# Ensure they're in the same folder
# Visit index.html
```

### Single File

**Any Host:**
```bash
# Upload engineering-reference.html
# Done - works anywhere
```

---

## 📊 File Sizes

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 3KB | Structure only |
| `style.css` | 26KB | All styles |
| `script.js` | 40KB | All logic |
| **Total** | **69KB** | Same as single file |
| `engineering-reference.html` | 69KB | Everything in one |

---

## 🎯 Recommendations

### For Solo Developers
→ Use **single file** for simplicity

### For Teams (2+ people)
→ Use **separated files** for Git workflow

### For Production
→ Either works, but separated allows:
- Minification
- Caching (CSS/JS separate)
- Build optimization

### For Sharing
→ Use **single file** (easier to send)

---

## 🔧 Development Workflow

### With Separated Files

```bash
# 1. Start server
python -m http.server 8000

# 2. Edit files
code style.css    # Change styles
code script.js    # Add equations
code index.html   # Modify structure

# 3. Refresh browser
# Changes apply immediately

# 4. Commit
git add .
git commit -m "Added Coulomb's Law"
git push
```

### With Single File

```bash
# 1. Edit file
code engineering-reference.html

# 2. Refresh browser
# Changes apply immediately

# 3. Commit (optional)
git add engineering-reference.html
git commit -m "Added Coulomb's Law"
git push
```

---

## 🐛 Troubleshooting

### "Styles not loading"
**Problem:** CSS file not found  
**Fix:** Ensure `style.css` is in same folder as `index.html`

### "JavaScript not running"
**Problem:** JS file not found  
**Fix:** Ensure `script.js` is in same folder as `index.html`

### "CORS error"
**Problem:** Opening `index.html` directly (file://)  
**Fix:** Serve via HTTP: `python -m http.server 8000`

### "Changes not showing"
**Problem:** Browser cache  
**Fix:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## ✅ Both Versions Included

You have **both formats** ready to use:

| Format | File | Use When |
|--------|------|----------|
| **Single** | `engineering-reference.html` | Quick testing, sharing |
| **Separated** | `index.html` + CSS + JS | Development, teams |

Pick the one that fits your workflow. Both are identical in functionality.

---

**Pro tip:** Start with single file. Switch to separated files when you add teammates or need version control.
