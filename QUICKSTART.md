# 🚀 Quick Start Guide

Get up and running with MovieMatch Sensory Pairing in 5 minutes!

## Installation

### Option 1: Copy Files Directly (Recommended)

1. **Copy core files to your MovieMatch project:**
   ```bash
   cp -r moviematch-sensory-pairing/core/* moviematch/utils/
   cp -r moviematch-sensory-pairing/data/* moviematch/data/
   cp -r moviematch-sensory-pairing/components/* moviematch/components/
   cp -r moviematch-sensory-pairing/styles/* moviematch/styles/
   ```

2. **Install dependencies:**
   ```bash
   cd moviematch
   npm install recharts
   ```

### Option 2: NPM Package (If Published)

```bash
npm install moviematch-sensory-pairing
```

## Basic Usage

### 1. Import the Styles

In your `app/layout.jsx` or `_app.js`:

```jsx
import '@/styles/sensory-pairing.css';
```

### 2. Use in Movie Detail Page

```jsx
import SensoryPairing from '@/components/SensoryPairing';

export default function MovieDetail({ movie }) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={movie.title} />
      
      {/* Add sensory pairing */}
      <SensoryPairing movie={movie} />
    </div>
  );
}
```

That's it! The component will automatically:
- Calculate arousal score
- Show food recommendations
- Show music pairings
- Display research attribution

## Next Steps

1. ✅ Test with a few movies
2. ✅ Add to your dashboard with `PersonalityRadar`
3. ✅ Customize with user preferences
4. 📚 Read full docs: `docs/INTEGRATION_GUIDE.md`
5. 💡 Check examples: `examples/EXAMPLE_INTEGRATIONS.js`

## Need Help?

- **Examples**: See `examples/` folder
- **Full Docs**: See `docs/INTEGRATION_GUIDE.md`
- **Tests**: Run `npm test` or check `tests/test-cases.js`

---

**You're ready to go! 🎬🍜🎵**
