import React, { useState } from 'react';
import { calculateArousalScore, getSensoryPairing } from '../utils/sensory-pairing-engine';
import foodData from '../data/food-pairing-data.json';
import musicData from '../data/music-pairing-data.json';

/**
 * SensoryPairing Component
 * Displays food and music recommendations based on movie selection
 * 
 * Props:
 * - movie: TMDB movie object
 * - userPreferences: { noSpice: boolean, cuisinePreferences: string[] }
 */
export default function SensoryPairing({ movie, userPreferences = {} }) {
  const [showResearch, setShowResearch] = useState(false);
  
  if (!movie) return null;
  
  const pairing = getSensoryPairing(movie, userPreferences);
  const arousalScore = pairing.movie.arousalScore;
  const spiceLevel = pairing.food.spiceLevel;
  const musicTier = pairing.music.tier;
  
  const foodInfo = foodData.spiceLevels[spiceLevel];
  const musicInfo = musicData.musicTiers[musicTier];
  
  return (
    <div className="sensory-pairing">
      {/* Arousal Score Indicator */}
      <div className="arousal-indicator">
        <div className="arousal-bar">
          <div 
            className="arousal-fill"
            style={{ width: `${arousalScore}%` }}
          />
        </div>
        <p className="arousal-label">
          Intensity Score: {arousalScore}/100
        </p>
      </div>
      
      {/* Food Pairing */}
      <div className="pairing-section food-pairing">
        <div className="section-header">
          <h3>🍽️ Food Pairing</h3>
          <span className="spice-badge">{foodInfo.emoji} {foodInfo.name}</span>
        </div>
        
        <p className="pairing-description">{foodInfo.description}</p>
        
        <div className="recommendations-grid">
          {Object.entries(foodInfo.cuisines).map(([cuisine, dishes]) => (
            <div key={cuisine} className="cuisine-category">
              <h4>{cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}</h4>
              <ul>
                {dishes.slice(0, 3).map((dish, idx) => (
                  <li key={idx}>{dish}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Drink Suggestions */}
        <div className="drink-suggestions">
          <h4>🥤 Drink Pairings</h4>
          <div className="drink-list">
            {foodData.drinkPairings[spiceLevel >= 2 ? 'spicy' : spiceLevel === 1 ? 'mild' : 'comfort']
              .nonAlcoholic.slice(0, 3).map((drink, idx) => (
                <span key={idx} className="drink-tag">{drink}</span>
              ))}
          </div>
        </div>
      </div>
      
      {/* Music Pairing */}
      <div className="pairing-section music-pairing">
        <div className="section-header">
          <h3>🎵 Music Pairing</h3>
          <span className="music-badge">{musicInfo.emoji} {musicInfo.name}</span>
        </div>
        
        <p className="pairing-description">{musicInfo.description}</p>
        
        <div className="genre-tags">
          {musicInfo.genres.map((genre, idx) => (
            <span key={idx} className="genre-tag">{genre}</span>
          ))}
        </div>
        
        <div className="artist-recommendations">
          <h4>🎧 Artists to Try</h4>
          <div className="artist-list">
            {musicInfo.artists.slice(0, 5).map((artist, idx) => (
              <span key={idx} className="artist-tag">{artist}</span>
            ))}
          </div>
        </div>
        
        {/* Spotify Playlists */}
        <div className="playlist-suggestions">
          <h4>📱 Spotify Playlists</h4>
          <ul>
            {musicInfo.playlists.spotify.slice(0, 3).map((playlist, idx) => (
              <li key={idx}>{playlist}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Research Badge */}
      <div className="research-section">
        <button 
          className="research-toggle"
          onClick={() => setShowResearch(!showResearch)}
        >
          📚 Research-Backed
        </button>
        
        {showResearch && (
          <div className="research-details">
            <p className="research-citation">
              {foodData.researchInfo.citation}
            </p>
            <ul className="research-findings">
              {foodData.researchInfo.keyFindings.map((finding, idx) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
            <a 
              href={foodData.researchInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="research-link"
            >
              View Full Study →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Companion component: Preference Settings
 * Allows users to customize food/music preferences
 */
export function PairingPreferences({ preferences, onChange }) {
  return (
    <div className="pairing-preferences">
      <h3>⚙️ Customize Your Pairings</h3>
      
      <div className="preference-option">
        <label>
          <input
            type="checkbox"
            checked={preferences.noSpice || false}
            onChange={(e) => onChange({ ...preferences, noSpice: e.target.checked })}
          />
          I prefer no spicy food
        </label>
      </div>
      
      <div className="preference-option">
        <label>Favorite Cuisines</label>
        <div className="cuisine-checkboxes">
          {['american', 'italian', 'mexican', 'asian', 'indian', 'thai'].map(cuisine => (
            <label key={cuisine}>
              <input
                type="checkbox"
                checked={preferences.cuisinePreferences?.includes(cuisine)}
                onChange={(e) => {
                  const current = preferences.cuisinePreferences || [];
                  const updated = e.target.checked
                    ? [...current, cuisine]
                    : current.filter(c => c !== cuisine);
                  onChange({ ...preferences, cuisinePreferences: updated });
                }}
              />
              {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Quick Pairing Card (for movie lists)
 * Compact version for movie grid/list views
 */
export function QuickPairingCard({ movie, compact = true }) {
  const pairing = getSensoryPairing(movie);
  const foodInfo = foodData.spiceLevels[pairing.food.spiceLevel];
  const musicInfo = musicData.musicTiers[pairing.music.tier];
  
  return (
    <div className="quick-pairing-card">
      <div className="pairing-icons">
        <span title={foodInfo.name}>{foodInfo.emoji}</span>
        <span title={musicInfo.name}>{musicInfo.emoji}</span>
      </div>
      {!compact && (
        <div className="pairing-text">
          <p>{foodInfo.name}</p>
          <p>{musicInfo.name}</p>
        </div>
      )}
    </div>
  );
}
