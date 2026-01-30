# 🎬🍽️ MovieMatch Food Pairing Integration

**Transform movie recommendations into complete dining experiences**

A research-backed system that pairs movies with food based on arousal theory and Penn State's sensation-seeking research.

---

## 🔬 Scientific Foundation

This integration is built on peer-reviewed research from Penn State University:

> **Byrnes, N. K., & Hayes, J. E. (2015).** Personality factors predict spicy food liking and intake. *Food Quality and Preference*, 28(1), 213-221.

**Key Finding**: Individuals with high sensation-seeking personalities (who prefer action movies, adventure, and intense experiences) are approximately **6× more likely** to enjoy spicy foods than low sensation-seekers.

- **High-intensity movies** (Action, Thriller) → **Spicy food** (Nashville hot chicken, Thai curry)
- **Low-intensity movies** (Romance, Drama) → **Comfort food** (Mac & cheese, sushi)

📖 [Read the full study](https://pure.psu.edu/en/publications/personality-factors-predict-spicy-food-liking-and-intake)

---

## ✨ What This Does

### For MovieMatch Users
- **🍽️ Food recommendations** based on movie intensity (5-tier spice scale: Comfort → Very Hot)
- **🧠 Personality insights** via radar chart visualization showing your taste profile
- **👥 Group mode** to find perfect food pairings for movie nights with friends
- **🔬 Research-backed** recommendations you can trust

---

## 🚀 Quick Start

### 1. Install in MovieMatch

```bash
cd moviematch
npm install recharts  # For radar charts
```

### 2. Copy Files

```bash
# Core engine & data
cp core/sensory-pairing-engine.js moviematch/utils/
cp data/food-pairing-data.json moviematch/data/

# Components
cp components/SensoryPairing.jsx moviematch/components/
cp components/PersonalityRadar.jsx moviematch/components/

# Styles
cp styles/sensory-pairing.css moviematch/styles/
```

### 3. Use in Your App

```jsx
import SensoryPairing from '@/components/SensoryPairing';

<SensoryPairing movie={movie} />
```

**That's it!** 🎉

📚 Full guide: [`QUICKSTART.md`](QUICKSTART.md)

---

## 💡 How It Works

Every movie gets an **arousal score (0-100)** based on:

1. **Genres** - Action/Thriller/Horror score high
2. **Keywords** - 'fight', 'chase', 'intense' add points
3. **Popularity** - Higher ratings boost score
4. **Runtime** - Fast-paced films get bonus

**Example**:
- *Mad Max: Fury Road* → 92/100 → 🌶️🌶️🌶️🌶️ Very Hot
- *The Notebook* → 8/100 → 😌 Comfort food

### Pairing Logic

```
Arousal 80-100 → Very Hot food (Ghost peppers, Nashville hot chicken)
Arousal 60-79  → Hot food (Thai curry, buffalo wings)
Arousal 40-59  → Medium food (Tacos, jalapeños)
Arousal 20-39  → Mild food (Light spice)
Arousal 0-19   → Comfort food (Mac & cheese, sushi)
```

---

## 🎯 Use Cases

### Movie Detail Page
```jsx
<SensoryPairing movie={movie} userPreferences={prefs} />
```
Shows full food recommendations with research attribution.

### Movie Cards (Compact)
```jsx
<QuickPairingCard movie={movie} compact />
```
Shows just spice emoji indicator (🌶️).

### Dashboard Insights
```jsx
<PersonalityRadar movies={watchHistory} />
```
Visualizes user personality profile.

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
  }
}
```

---

## 🎨 Customization

### User Preferences
```jsx
const preferences = {
  noSpice: true,                    // Disable spicy foods
  cuisinePreferences: ['italian'],  // Filter cuisines
};
```

### Styling
All components use namespaced CSS classes you can override:
```css
.sensory-pairing { /* Main container */ }
.spice-badge { /* Spice level badge */ }
```

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[docs/INTEGRATION_GUIDE.md](docs/INTEGRATION_GUIDE.md)** - Complete setup guide
- **[examples/](examples/)** - Ready-to-use code examples
- **[tests/](tests/)** - Test suite

---

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Tests validate:
- ✅ Arousal score calculations
- ✅ Edge case handling
- ✅ User preference overrides
- ✅ Consistency across runs

---

## 🎯 Roadmap

### v1.0 ✅ (Current)
- Core arousal engine
- Food recommendations (5 levels)
- Personality visualization
- Research attribution

### v1.1 🔜 (Next)
- Recipe link integration
- Shareable pairing cards
- Group optimization improvements
- Music pairing integration

### v2.0 🔮 (Future)
- ML-based refinement
- Food delivery API integration
- Regional cuisine expansion

---

## 📄 License

MIT License - use freely in your projects!

---

## 🙏 Credits

- **Research**: Penn State University (Byrnes & Hayes, 2015)
- **Movie Data**: The Movie Database (TMDB)
- **Built with**: React + Recharts

---

**Transform movie nights into complete dining experiences** 🎬🍽️

Made with ❤️ for movie lovers and food enthusiasts.
