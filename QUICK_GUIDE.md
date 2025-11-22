# Quick Reference Card

## 📁 You Now Have Both Formats

```
Original (Single File):
└── engineering-reference.html  (69KB) ← Everything in one

New (Separated):
├── index.html    (3KB)  ← Structure
├── style.css     (18KB) ← Styles
└── script.js     (48KB) ← Logic
```

---

## 🎯 Which Should I Use?

### Use Single File If:
- ✅ Just testing locally
- ✅ Sharing with others
- ✅ Don't need version control
- ✅ Want simplicity

**Open:** `engineering-reference.html` → Works immediately

---

### Use Separated Files If:
- ✅ Working in a team
- ✅ Using Git/version control
- ✅ Want organized code
- ✅ Building a pipeline

**Run:** `python -m http.server 8000` → Open `localhost:8000/index.html`

---

## ✏️ Adding Equations

### Single File
1. Open `engineering-reference.html`
2. Line ~950: Add equation to `equationTemplates`
3. Line ~1420: Add solver to `solveEquation()`
4. Save → Refresh

### Separated Files
1. Open `script.js`
2. Line ~3: Add equation to `equationTemplates`
3. Line ~470: Add solver to `solveEquation()`
4. Save → Refresh

**Same code, different locations!**

---

## 🎨 Changing Colors

### Single File
Edit `engineering-reference.html` line 20:
```css
:root {
  --accent: #2563eb;  /* Change this */
}
```

### Separated Files
Edit `style.css` line 1:
```css
:root {
  --accent: #2563eb;  /* Change this */
}
```

---

## 🚀 Deploy to Web

### Single File
```bash
# Upload to Netlify/Vercel/GitHub Pages
engineering-reference.html
# Done!
```

### Separated Files
```bash
# Upload to Netlify/Vercel/GitHub Pages
index.html
style.css
script.js
# All 3 must be in same folder
```

---

## 🔄 Can I Switch?

**Yes!** Both versions are identical in features.

**From Single → Separated:** Already done (you have both)

**From Separated → Single:** Use `engineering-reference.html`

---

## 💡 Pro Tips

1. **Starting out?** Use single file
2. **Got teammates?** Switch to separated
3. **Need Git history?** Separated is better
4. **Quick edits?** Single file is faster
5. **Both work?** Yes - pick your favorite

---

## 📊 Quick Comparison

| Feature | Single | Separated |
|---------|--------|-----------|
| Easy to share | ✅ | ❌ |
| Git friendly | ❌ | ✅ |
| Quick edits | ✅ | ⚠️ |
| Team work | ❌ | ✅ |
| Deployment | ✅ Both work | ✅ |
| Features | ✅ Identical | ✅ |

---

## ⚡ Most Common Choice

**Solo developer:** Single file  
**Small team (2-5):** Separated files  
**Large team (5+):** Separated + build system

---

**Pick one. Ignore the other. Both are ready to use.**
