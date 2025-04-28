/**
 * Quran.com API Service
 * This service provides methods to interact with the Quran.com API
 */

const API_BASE_URL = 'https://api.quran.com/api/v4';

/**
 * Get basic information about a surah
 * @param {number} chapterNumber - The chapter/surah number (1-114)
 * @param {string} language - The language for translations (default: 'en')
 * @returns {Promise<Object>} Surah metadata
 */
export const getSurahInfo = async (chapterNumber, language = 'en') => {
  try {
    // Fetch basic surah info
    const response = await fetch(`${API_BASE_URL}/chapters/${chapterNumber}?language=${language}`);
    const data = await response.json();

    if (!data.chapter) {
      throw new Error(`Failed to fetch surah info for chapter ${chapterNumber}`);
    }

    // Fetch additional info including description
    const infoResponse = await fetch(`${API_BASE_URL}/chapters/${chapterNumber}/info?language=${language}`);
    const infoData = await infoResponse.json();

    // Combine the data
    return {
      ...data.chapter,
      description: infoData?.chapter_info?.short_text || infoData?.chapter_info?.text || '',
    };
  } catch (error) {
    console.error(`Error fetching surah info for chapter ${chapterNumber}:`, error);
    throw error;
  }
};

/**
 * Get verses for a specific surah
 * @param {number} chapterNumber - The chapter/surah number (1-114)
 * @param {string} language - The language for translations (default: 'en')
 * @returns {Promise<Array>} Array of verses
 */
export const getSurahVerses = async (chapterNumber, language = 'en') => {
  try {
    // Fetch the Uthmani text (proper Arabic)
    const uthmaniResponse = await fetch(`${API_BASE_URL}/quran/verses/uthmani?chapter_number=${chapterNumber}`);
    const uthmaniData = await uthmaniResponse.json();

    if (!uthmaniData.verses) {
      throw new Error(`Failed to fetch Uthmani text for chapter ${chapterNumber}`);
    }

    // Fetch verse metadata
    const metadataResponse = await fetch(`${API_BASE_URL}/verses/by_chapter/${chapterNumber}?language=${language}`);
    const metadataData = await metadataResponse.json();

    if (!metadataData.verses) {
      throw new Error(`Failed to fetch verse metadata for chapter ${chapterNumber}`);
    }

    // Combine the data
    return uthmaniData.verses.map((verse, index) => {
      const metadata = metadataData.verses.find(v => v.verse_key === verse.verse_key) || {};

      return {
        id: verse.id,
        verseKey: verse.verse_key,
        verseNumber: metadata.verse_number || parseInt(verse.verse_key.split(':')[1]),
        text: verse.text_uthmani,
        page: metadata.page_number,
        juz: metadata.juz_number
      };
    });
  } catch (error) {
    console.error(`Error fetching verses for chapter ${chapterNumber}:`, error);
    throw error;
  }
};

/**
 * Get translations for a specific surah
 * @param {number} chapterNumber - The chapter/surah number (1-114)
 * @param {string} translationId - The translation ID (default: '131' for Saheeh International)
 * @returns {Promise<Array>} Array of verse translations
 */
export const getSurahTranslation = async (chapterNumber, translationId = '131') => {
  try {
    const response = await fetch(`${API_BASE_URL}/verses/by_chapter/${chapterNumber}?translations=${translationId}`);
    const data = await response.json();

    if (data.verses) {
      return data.verses.map(verse => ({
        verseNumber: verse.verse_number,
        text: verse.translations[0].text
      }));
    } else {
      throw new Error(`Failed to fetch translation for chapter ${chapterNumber}`);
    }
  } catch (error) {
    console.error(`Error fetching translation for chapter ${chapterNumber}:`, error);
    throw error;
  }
};

/**
 * Get available translations
 * @returns {Promise<Array>} List of available translations
 */
export const getAvailableTranslations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/resources/translations`);
    const data = await response.json();

    if (data.translations) {
      return data.translations.map(translation => ({
        id: translation.id,
        name: translation.name,
        language: translation.language_name,
        identifier: translation.id.toString()
      }));
    } else {
      throw new Error('Failed to fetch available translations');
    }
  } catch (error) {
    console.error('Error fetching available translations:', error);
    throw error;
  }
};

/**
 * Get all surahs basic information
 * @param {string} language - The language for translations (default: 'en')
 * @returns {Promise<Array>} List of all surahs
 */
export const getAllSurahs = async (language = 'en') => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapters?language=${language}`);
    const data = await response.json();

    if (data.chapters) {
      return data.chapters.map(chapter => ({
        number: chapter.id,
        name: chapter.name_arabic,
        englishName: chapter.name_simple,
        englishNameTranslation: chapter.translated_name.name,
        numberOfAyahs: chapter.verses_count,
        revelationType: chapter.revelation_place
      }));
    } else {
      throw new Error('Failed to fetch all surahs');
    }
  } catch (error) {
    console.error('Error fetching all surahs:', error);
    throw error;
  }
};

/**
 * Search for surahs by name
 * @param {string} query - The search query
 * @param {Array} allSurahs - Array of all surahs to search in
 * @returns {Array} Filtered list of surahs matching the query
 */
export const searchSurahs = (query, allSurahs) => {
  if (!query || !allSurahs || !Array.isArray(allSurahs)) {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();

  return allSurahs.filter(surah =>
    surah.englishName.toLowerCase().includes(lowerCaseQuery) ||
    (surah.englishNameTranslation &&
     surah.englishNameTranslation.toLowerCase().includes(lowerCaseQuery))
  );
};
