# 🎬🍜🎵 MovieMatch Sensory Pairing Integration

**Transform your movie app into a complete sensory experience platform**

[![Research-Backed](https://img.shields.io/badge/Research-Penn%20State-blue)](https://pure.psu.edu/en/publications/personality-factors-predict-spicy-food-liking-and-intake)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A research-backed system that pairs movies with food and music based on arousal theory and Penn State's sensation-seeking research. Users who enjoy *Mad Max: Fury Road* get paired with Nashville hot chicken 🔥 and EDM playlists ⚡, while *The Notebook* fans get comfort food 😌 and classical music 🎹.

---

## ✨ What This Does

🍽️ **Food Recommendations** - 5-tier spice system (Comfort → Very Hot)  
🎵 **Music Pairings** - Spotify-integrated playlists  
🧠 **Personality Insights** - Radar chart visualization  
👥 **Group Mode** - Optimize for multiple viewers  
🔬 **Research-Backed** - Based on peer-reviewed Penn State study

---

## 🔬 Scientific Foundation

> **Byrnes, N. K., & Hayes, J. E. (2015).** Personality factors predict spicy food liking and intake. *Food Quality and Preference*, 28(1), 213-221.

**Key Finding**: High sensation-seekers (who love action movies) are ~6× more likely to enjoy spicy food.

📖 [Read the study](https://pure.psu.edu/en/publications/personality-factors-predict-spicy-food-liking-and-intake)

---

## 🚀 Quick Start

### 1. Install
```bash
cd moviematch
npm install recharts
```

### 2. Copy Files
```bash
cp -r sensory-pairing/core/* utils/
cp -r sensory-pairing/components/* components/
cp -r sensory-pairing/data/* data/
cp -r sensory-pairing/styles/* styles/
```

### 3. Use in Your App
```jsx
import SensoryPairing from '@/components/SensoryPairing';

<SensoryPairing movie={movie} />
```

**That's it!** 🎉

📚 Full guide: [`QUICKSTART.md`](QUICKSTART.md)

---

## 📦 Package Structure

```
moviematch-sensory-pairing/
├── core/
│   └── sensory-pairing-engine.js    # Arousal calculation logic
├── components/
│   ├── SensoryPairing.jsx           # Main pairing UI
│   └── PersonalityRadar.jsx         # Radar chart
├── data/
│   ├── food-pairing-data.json       # 100+ food items
│   └── music-pairing-data.json      # Music tiers + Spotify
├── styles/
│   └── sensory-pairing.css          # Complete styling
├── docs/
│   ├── README.md                    # Full documentation
│   └── INTEGRATION_GUIDE.md         # Step-by-step setup
├── examples/
│   └── EXAMPLE_INTEGRATIONS.js      # 12 code examples
└── tests/
    └── test-cases.js                # Validation suite
```

---

## 💡 How It Works

### Arousal Score Algorithm

Every movie gets a score (0-100) based on:

1. **Genres** (30 pts max) - Action/Horror/Thriller score high
2. **Keywords** (40 pts max) - 'fight', 'chase', 'intense' add points
3. **Popularity** (10 pts max) - Higher ratings boost score
4. **Runtime** (10 pts max) - Fast-paced films get bonus

**Example**:
- *Mad Max: Fury Road* → 92/100 → 🌶️🌶️🌶️🌶️ Very Hot + ⚡ EDM
- *The Notebook* → 8/100 → 😌 Comfort food + 🎹 Classical

### Pairing Logic

```
Arousal 80-100 → Very Hot food + EDM/Metal
Arousal 60-79  → Hot food + Hip-Hop/Rock
Arousal 40-59  → Medium food + Pop/Indie
Arousal 20-39  → Mild food + Jazz/Lo-fi
Arousal 0-19   → Comfort food + Classical/Ambient
```

---

## 🎯 Use Cases

### Movie Detail Page
```jsx
<SensoryPairing movie={movie} userPreferences={prefs} />
```
Shows full food + music recommendations with research attribution.

### Movie Cards (Compact)
```jsx
<QuickPairingCard movie={movie} compact />
```
Shows just emoji indicators (🌶️⚡).

### Dashboard Insights
```jsx
<PersonalityRadar movies={watchHistory} />
```
Visualizes user personality profile.

### Togetherness Mode
```jsx
<TogethernessPairings person1Movies={...} person2Movies={...} />
```
Finds optimal pairings for group viewing.

---

## 📊 Example Output

**Input**: *John Wick*
```javascript
{
  "arousalScore": 82,
  "food": {
    "spiceLevel": 4,
    "spiceName": "Very Hot",
    "recommendations": [
      "Nashville hot chicken",
      "Ghost pepper wings",
      "Buldak fire noodles"
    ]
  },
  "music": {
    "tier": 4,
    "genres": ["EDM", "Metal", "Industrial"],
    "playlists": ["Beast Mode", "Metal Essentials"]
  }
}
```

---

## 🔗 Integration Points

### MovieMatch Features
- ✅ Movie detail pages
- ✅ Recommendation engine
- ✅ Togetherness mode
- ✅ User dashboard
- ✅ Movie cards/lists

### Visualisify Integration
- ✅ Import MovieMatch profiles
- ✅ Combined Spotify + Movie insights
- ✅ Cross-platform personality sync

---

## 🎨 Customization

### User Preferences
```jsx
const preferences = {
  noSpice: true,                    // Disable spicy foods
  cuisinePreferences: ['italian'],  // Filter cuisines
  musicGenres: ['jazz']             // Music preferences
};
```

### Styling
All components use namespaced CSS classes you can override:
```css
.sensory-pairing { /* Main container */ }
.spice-badge { /* Spice level badge */ }
.personality-radar-container { /* Radar chart */ }
```

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[docs/INTEGRATION_GUIDE.md](docs/INTEGRATION_GUIDE.md)** - Complete setup guide
- **[docs/README.md](docs/README.md)** - Full documentation
- **[examples/EXAMPLE_INTEGRATIONS.js](examples/EXAMPLE_INTEGRATIONS.js)** - 12 code examples
- **[tests/test-cases.js](tests/test-cases.js)** - Test suite

---

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Or manually:
```bash
node tests/test-cases.js
```

Tests validate:
- ✅ Arousal score calculations
- ✅ Edge case handling
- ✅ User preference overrides
- ✅ Personality profile generation
- ✅ Consistency across runs

---

## 🤝 Contributing

Improvements welcome!

**Priority areas**:
- Regional cuisine mappings
- Music genre expansion
- Mobile UX enhancements
- Performance optimizations

---

## 📄 License

MIT License - use freely in your projects!

---

## 🎯 Roadmap

### v1.0 ✅ (Current)
- Core arousal engine
- Food recommendations (5 levels)
- Music pairings (5 tiers)
- Personality visualization
- Research attribution

### v1.1 🔜 (Next)
- Recipe link integration
- Spotify playlist auto-creation
- Shareable pairing cards
- Group optimization improvements

### v2.0 🔮 (Future)
- ML-based refinement
- Food delivery API integration
- Time-of-day recommendations
- Regional cuisine expansion

---

## 🙏 Credits

- **Research**: Penn State University (Byrnes & Hayes, 2015)
- **Movie Data**: The Movie Database (TMDB)
- **Music**: Spotify Audio Features API
- **Built with**: React + Recharts

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/EnergizedAstronaut/moviematch/issues)
- **Questions**: [Discussions](https://github.com/EnergizedAstronaut/moviematch/discussions)

---

**Transform movie nights into complete sensory experiences** 🎬🍜🎵

Made with ❤️ for movie lovers, food enthusiasts, and music fans.
