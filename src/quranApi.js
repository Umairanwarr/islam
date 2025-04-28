// Quran API service for fetching surah data and translations
// Using alquran.cloud API

const API_BASE_URL = 'https://api.alquran.cloud/v1';

/**
 * Get a list of all surahs
 * @returns {Promise<Array>} List of surahs with basic information
 */
export const getAllSurahs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    } else {
      throw new Error('Failed to fetch surah list');
    }
  } catch (error) {
    console.error('Error fetching surah list:', error);
    throw error;
  }
};

/**
 * Get a specific surah with Arabic text
 * @param {number} surahNumber - The surah number (1-114)
 * @returns {Promise<Object>} Surah data with Arabic text
 */
export const getSurahArabic = async (surahNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/quran-uthmani`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    } else {
      throw new Error(`Failed to fetch surah ${surahNumber}`);
    }
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    throw error;
  }
};

/**
 * Get a specific surah with translation
 * @param {number} surahNumber - The surah number (1-114)
 * @param {string} edition - The edition identifier (e.g., 'en.asad')
 * @returns {Promise<Object>} Surah data with translation
 */
export const getSurahTranslation = async (surahNumber, edition = 'en.asad') => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${edition}`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    } else {
      throw new Error(`Failed to fetch translation for surah ${surahNumber}`);
    }
  } catch (error) {
    console.error(`Error fetching translation for surah ${surahNumber}:`, error);
    throw error;
  }
};

/**
 * Get available translations/editions
 * @returns {Promise<Array>} List of available translations
 */
export const getAvailableTranslations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/edition/type/translation`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    } else {
      throw new Error('Failed to fetch available translations');
    }
  } catch (error) {
    console.error('Error fetching available translations:', error);
    throw error;
  }
};

/**
 * Search for surahs by name
 * @param {string} query - The search query
 * @param {Array} surahList - The list of all surahs
 * @returns {Array} Filtered list of surahs matching the query
 */
export const searchSurahs = (query, surahList) => {
  if (!query || !surahList || !surahList.length) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return surahList.filter(surah => {
    const englishName = surah.englishName.toLowerCase();
    const name = surah.name.toLowerCase();
    const englishNameTranslation = surah.englishNameTranslation.toLowerCase();
    
    return (
      englishName.includes(normalizedQuery) ||
      name.includes(normalizedQuery) ||
      englishNameTranslation.includes(normalizedQuery) ||
      surah.number.toString() === normalizedQuery
    );
  });
};
