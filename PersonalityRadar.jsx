import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { calculatePersonalityProfile } from '../utils/sensory-pairing-engine';

/**
 * PersonalityRadar Component
 * Visualizes user's personality profile based on movie preferences
 * Integrates with Visualisify for cross-platform insights
 * 
 * Props:
 * - movies: Array of user's watched/liked movies
 * - spotifyData: Optional Spotify listening data from Visualisify
 */
export function PersonalityRadar({ movies = [], spotifyData = null }) {
  const profile = useMemo(() => {
    if (!movies || movies.length === 0) {
      return {
        sensationSeeking: 50,
        spiceTolerance: 50,
        energyPreference: 50,
        comfortSeeking: 50
      };
    }
    return calculatePersonalityProfile(movies);
  }, [movies]);
  
  // Combine with Spotify data if available
  const combinedProfile = useMemo(() => {
    if (!spotifyData) return profile;
    
    // Spotify data enrichment
    const musicEnergy = spotifyData.avgEnergy * 100; // 0-1 scale to 0-100
    
    return {
      sensationSeeking: (profile.sensationSeeking + musicEnergy) / 2,
      spiceTolerance: profile.spiceTolerance,
      energyPreference: (profile.energyPreference + musicEnergy) / 2,
      comfortSeeking: profile.comfortSeeking
    };
  }, [profile, spotifyData]);
  
  // Format data for Recharts
  const radarData = [
    {
      dimension: 'Sensation\nSeeking',
      value: combinedProfile.sensationSeeking,
      fullMark: 100
    },
    {
      dimension: 'Spice\nTolerance',
      value: combinedProfile.spiceTolerance,
      fullMark: 100
    },
    {
      dimension: 'Energy\nPreference',
      value: combinedProfile.energyPreference,
      fullMark: 100
    },
    {
      dimension: 'Comfort\nSeeking',
      value: combinedProfile.comfortSeeking,
      fullMark: 100
    }
  ];
  
  return (
    <div className="personality-radar-container">
      <h3>🧠 Your Sensory Profile</h3>
      <p className="profile-subtitle">
        Based on {movies.length} movies {spotifyData ? '& your music taste' : ''}
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fill: '#fff', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#888' }}
          />
          <Radar
            name="Your Profile"
            dataKey="value"
            stroke="#1DB954"
            fill="#1DB954"
            fillOpacity={0.6}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #1DB954',
              borderRadius: '8px'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Profile Insights */}
      <div className="profile-insights">
        <ProfileInsight
          label="Sensation Seeking"
          score={combinedProfile.sensationSeeking}
          description={getInsightText('sensation', combinedProfile.sensationSeeking)}
        />
        <ProfileInsight
          label="Spice Tolerance"
          score={combinedProfile.spiceTolerance}
          description={getInsightText('spice', combinedProfile.spiceTolerance)}
        />
        <ProfileInsight
          label="Energy Preference"
          score={combinedProfile.energyPreference}
          description={getInsightText('energy', combinedProfile.energyPreference)}
        />
      </div>
      
      {/* Research Attribution */}
      <div className="research-attribution">
        <p>
          🔬 Profile based on <a href="https://pure.psu.edu/en/publications/personality-factors-predict-spicy-food-liking-and-intake" target="_blank" rel="noopener noreferrer">Penn State research</a> linking sensation-seeking to spicy food preference
        </p>
      </div>
    </div>
  );
}

/**
 * Individual Profile Insight Card
 */
function ProfileInsight({ label, score, description }) {
  return (
    <div className="profile-insight">
      <div className="insight-header">
        <span className="insight-label">{label}</span>
        <span className="insight-score">{Math.round(score)}/100</span>
      </div>
      <div className="insight-bar">
        <div 
          className="insight-fill"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="insight-description">{description}</p>
    </div>
  );
}

/**
 * Generate insight text based on score
 */
function getInsightText(dimension, score) {
  const tier = score >= 80 ? 'high' : score >= 60 ? 'medium-high' : score >= 40 ? 'medium' : score >= 20 ? 'low-medium' : 'low';
  
  const insights = {
    sensation: {
      high: 'You crave intense, thrilling experiences. Action movies and extreme flavors are your sweet spot.',
      'medium-high': 'You enjoy excitement and variety. You appreciate bold movies and spicy food.',
      medium: 'You balance excitement with comfort. You enjoy moderate intensity.',
      'low-medium': 'You prefer measured experiences. Subtle flavors and thoughtful films resonate.',
      low: 'You value calm, familiar experiences. Comfort is key in both food and entertainment.'
    },
    spice: {
      high: 'Bring on the heat! Ghost peppers and Nashville hot chicken call your name.',
      'medium-high': 'You enjoy a good burn. Thai curry and buffalo wings are perfect.',
      medium: 'You like noticeable spice without overwhelming heat. Jalapeños are your friend.',
      'low-medium': 'Gentle warmth suits you. Mild curry and light spices are ideal.',
      low: 'You prefer no heat. Rich, savory flavors without capsaicin burn.'
    },
    energy: {
      high: 'High-energy music and intense movies fuel you. EDM and metal match your vibe.',
      'medium-high': 'Upbeat, dynamic content energizes you. Rock and hip-hop fit well.',
      medium: 'You enjoy balanced energy. Pop and indie match your mood.',
      'low-medium': 'Mellow, smooth sounds suit you. Jazz and lo-fi are your go-to.',
      low: 'Calm, ambient music resonates. Classical and acoustic feed your soul.'
    }
  };
  
  return insights[dimension]?.[tier] || '';
}

/**
 * Compact Profile Badge
 * Shows profile in a small space (e.g., user dashboard)
 */
export function ProfileBadge({ movies }) {
  const profile = calculatePersonalityProfile(movies);
  const primaryTrait = Object.entries(profile).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  const traitEmojis = {
    sensationSeeking: '🔥',
    spiceTolerance: '🌶️',
    energyPreference: '⚡',
    comfortSeeking: '😌'
  };
  
  const traitLabels = {
    sensationSeeking: 'Thrill Seeker',
    spiceTolerance: 'Heat Lover',
    energyPreference: 'High Energy',
    comfortSeeking: 'Comfort First'
  };
  
  return (
    <div className="profile-badge">
      <span className="badge-emoji">{traitEmojis[primaryTrait]}</span>
      <span className="badge-label">{traitLabels[primaryTrait]}</span>
    </div>
  );
}

/**
 * Export Profile Data
 * For sharing between MovieMatch and Visualisify
 */
export function exportProfileData(movies, spotifyData = null) {
  const movieProfile = calculatePersonalityProfile(movies);
  
  return {
    source: 'MovieMatch',
    timestamp: new Date().toISOString(),
    profile: movieProfile,
    metadata: {
      movieCount: movies.length,
      hasSpotifyData: !!spotifyData
    },
    // Format for Visualisify import
    visualisifyFormat: {
      sensationSeeking: movieProfile.sensationSeeking,
      spiceTolerance: movieProfile.spiceTolerance,
      energyPreference: movieProfile.energyPreference,
      comfortSeeking: movieProfile.comfortSeeking
    }
  };
}
