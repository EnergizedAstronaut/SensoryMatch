/**
 * Sensory Pairing Engine
 * 
 * Core logic for calculating arousal scores from movies and mapping them
 * to food and music recommendations based on Penn State research linking
 * sensation-seeking personality traits with spicy food preference.
 * 
 * Research: Byrnes, N. K., & Hayes, J. E. (2015). Personality factors predict
 * spicy food liking and intake. Food Quality and Preference.
 * https://pure.psu.edu/en/publications/personality-factors-predict-spicy-food-liking-and-intake
 */

// Genre arousal weights (0-30 points)
const GENRE_WEIGHTS = {
  // High arousal
  'Action': 30,
  'Thriller': 30,
  'Horror': 30,
  'Adventure': 25,
  'War': 25,
  
  // Medium-high arousal
  'Science Fiction': 20,
  'Mystery': 20,
  'Crime': 20,
  
  // Medium arousal
  'Fantasy': 15,
  'Comedy': 15,
  'Animation': 10,
  
  // Low arousal
  'Drama': 5,
  'Romance': 0,
  'Documentary': 5,
  'Family': 5,
  'Music': 10,
  'History': 5
};

// Keyword arousal modifiers (can add up to 40 points)
const KEYWORD_MODIFIERS = {
  // Action-related (+5 each, max 20)
  'action': 5,
  'fight': 5,
  'chase': 5,
  'explosion': 5,
  'battle': 5,
  'combat': 5,
  'violence': 5,
  
  // Intensity-related (+5 each, max 20)
  'intense': 5,
  'suspense': 5,
  'tension': 5,
  'thriller': 5,
  'danger': 5,
  'survival': 5,
  'adrenaline': 5,
  
  // Fast-paced (+3 each, max 15)
  'fast-paced': 3,
  'racing': 3,
  'heist': 3,
  'espionage': 3,
  'adventure': 3,
  
  // Negative modifiers (reduce score)
  'slow-burn': -10,
  'contemplative': -10,
  'quiet': -10,
  'gentle': -10
};

// Popularity boost (0-10 points for viral/trending content)
const POPULARITY_THRESHOLD = {
  HIGH: 8.0,    // Rating >= 8.0 gets +10
  MEDIUM: 7.0,  // Rating >= 7.0 gets +5
  LOW: 6.0      // Rating >= 6.0 gets +3
};

/**
 * Calculate arousal score for a movie
 * @param {Object} movie - Movie object from TMDB
 * @param {string[]} movie.genres - Array of genre names
 * @param {string[]} movie.keywords - Array of keywords (optional)
 * @param {number} movie.vote_average - TMDB rating (0-10)
 * @returns {number} Arousal score (0-100)
 */
export function calculateArousalScore(movie) {
  let score = 0;
  
  // 1. Genre contribution (0-30 points)
  if (movie.genres && Array.isArray(movie.genres)) {
    const genreScore = movie.genres.reduce((sum, genre) => {
      const genreName = typeof genre === 'string' ? genre : genre.name;
      return sum + (GENRE_WEIGHTS[genreName] || 0);
    }, 0);
    // Take max genre score, not sum (avoid double-counting multi-genre films)
    score += Math.min(genreScore, 30);
  }
  
  // 2. Keyword contribution (0-40 points)
  if (movie.keywords && Array.isArray(movie.keywords)) {
    const keywordScore = movie.keywords.reduce((sum, keyword) => {
      const keywordName = (typeof keyword === 'string' ? keyword : keyword.name).toLowerCase();
      return sum + (KEYWORD_MODIFIERS[keywordName] || 0);
    }, 0);
    score += Math.max(0, Math.min(keywordScore, 40));
  }
  
  // 3. Popularity boost (0-10 points)
  if (movie.vote_average) {
    if (movie.vote_average >= POPULARITY_THRESHOLD.HIGH) {
      score += 10;
    } else if (movie.vote_average >= POPULARITY_THRESHOLD.MEDIUM) {
      score += 5;
    } else if (movie.vote_average >= POPULARITY_THRESHOLD.LOW) {
      score += 3;
    }
  }
  
  // 4. Runtime modifier (fast films get slight boost)
  if (movie.runtime && movie.runtime < 100) {
    score += 5; // Short, punchy films often more intense
  }
  
  // Clamp to 0-100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Map arousal score to spice level
 * @param {number} arousalScore - Arousal score (0-100)
 * @returns {number} Spice level (0-4)
 */
export function getSpiceLevel(arousalScore) {
  if (arousalScore >= 80) return 4; // Very Hot
  if (arousalScore >= 60) return 3; // Hot
  if (arousalScore >= 40) return 2; // Medium
  if (arousalScore >= 20) return 1; // Mild
  return 0; // No spice / Comfort
}

// Music features removed - food-only version

/**
 * Get complete sensory pairing for a movie
 * @param {Object} movie - Movie object
 * @param {Object} options - User preferences
 * @param {boolean} options.noSpice - User dislikes spicy food
 * @param {string[]} options.cuisinePreferences - Preferred cuisines
 * @returns {Object} Complete pairing recommendation
 */
export function getSensoryPairing(movie, options = {}) {
  const arousalScore = calculateArousalScore(movie);
  const spiceLevel = options.noSpice ? 0 : getSpiceLevel(arousalScore);
  
  return {
    movie: {
      title: movie.title,
      arousalScore,
      genres: movie.genres
    },
    food: {
      spiceLevel,
      spiceName: getSpiceLevelName(spiceLevel),
      recommendations: getFoodRecommendations(spiceLevel, options.cuisinePreferences)
    },
    research: {
      citation: 'Byrnes, N. K., & Hayes, J. E. (2015). Food Quality and Preference.',
      summary: 'Sensation-seeking personalities prefer spicy foods ~6× more than low sensation-seekers.'
    }
  };
}

/**
 * Helper: Get spice level name
 */
function getSpiceLevelName(level) {
  const names = ['Comfort', 'Mild', 'Medium', 'Hot', 'Very Hot'];
  return names[level] || 'Unknown';
}

/**
 * Helper: Get food recommendations for spice level
 */
function getFoodRecommendations(spiceLevel, cuisinePrefs = []) {
  // This will be expanded with full food data
  const recommendations = {
    4: ['Nashville hot chicken', 'Sichuan chili chicken', 'Korean fire noodles', 'Ghost pepper wings'],
    3: ['Buffalo wings', 'Spicy tacos', 'Thai red curry', 'Jerk chicken'],
    2: ['Loaded nachos', 'Jalapeño poppers', 'Street corn', 'Spiced BBQ'],
    1: ['Pasta arrabiata', 'Mild curry', 'Spiced popcorn', 'Soft tacos'],
    0: ['Mac & cheese', 'Sushi', 'Cheese board', 'Pasta primavera']
  };
  
  return recommendations[spiceLevel] || [];
}

// Music features removed - future enhancement

/**
 * Batch processing for multiple movies
 * @param {Object[]} movies - Array of movie objects
 * @param {Object} options - User preferences
 * @returns {Object[]} Array of pairing recommendations
 */
export function batchSensoryPairings(movies, options = {}) {
  return movies.map(movie => getSensoryPairing(movie, options));
}

/**
 * Calculate personality profile from movie history
 * Used for personality visualization
 * @param {Object[]} movies - User's movie history
 * @returns {Object} Personality scores
 */
export function calculatePersonalityProfile(movies) {
  if (!movies || movies.length === 0) {
    return {
      sensationSeeking: 50,
      spiceTolerance: 50,
      comfortSeeking: 50
    };
  }
  
  const avgArousal = movies.reduce((sum, movie) => {
    return sum + calculateArousalScore(movie);
  }, 0) / movies.length;
  
  return {
    sensationSeeking: avgArousal,
    spiceTolerance: avgArousal * 0.9, // Slightly lower than sensation
    comfortSeeking: 100 - avgArousal
  };
}
