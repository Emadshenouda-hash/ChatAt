import axios from 'axios';

// Strapi API base URL
const API_BASE_URL = 'http://localhost:1337/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Updated to handle different Strapi data structures
export const getArticles = async (language = null) => {
  try {
    let url = '/articles?populate=image';
    
    if (language) {
      url += `&filters[language][$eq]=${language}`;
    }
    
    console.log('🔍 Fetching from:', API_BASE_URL + url);
    
    const response = await api.get(url);
    
    console.log('📊 Raw API Response:', response.data);
    console.log('📝 Number of articles found:', response.data.data?.length || 0);
    
    // Check if we have data
    if (!response.data || !response.data.data) {
      console.warn('⚠️ No data returned from API');
      return [];
    }

    // Process articles with flexible structure handling
    const processedArticles = response.data.data.map((article, index) => {
      console.log(`🔄 Processing article ${index + 1}:`, article);
      
      if (!article) {
        console.error(`❌ Article ${index + 1} is null or undefined`);
        return null;
      }
      
      // Handle both formats: article.attributes.title OR article.title
      const attrs = article.attributes || article;
      console.log(`📋 Article ${index + 1} data:`, attrs);
      
      if (!attrs.title) {
        console.error(`❌ Article ${index + 1} missing title:`, attrs);
        return null;
      }
      
      const processedArticle = {
        id: article.id,
        title: attrs.title || 'Untitled',
        summary: attrs.summary || 'No summary available',
        content: attrs.content || '',
        author: attrs.author || 'Unknown Author',
        date: attrs.publishedAt || attrs.published
          ? new Date(attrs.publishedAt || attrs.published).toLocaleDateString()
          : new Date().toLocaleDateString(),
        language: attrs.language || language || 'en',
        category: 'General',
        image: attrs.image?.data?.attributes?.url
          ? `http://localhost:1337${attrs.image.data.attributes.url}`
          : attrs.image?.url
          ? `http://localhost:1337${attrs.image.url}`
          : '/img/hero-image.jpg'
      };
      
      console.log(`✅ Successfully processed article ${index + 1}:`, processedArticle);
      return processedArticle;
    });
    
    // Filter out null articles
    const validArticles = processedArticles.filter(article => article !== null);
    console.log('🎯 Final valid articles:', validArticles);
    console.log('📊 Returning', validArticles.length, 'articles to component');
    
    return validArticles;
      
  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    return [];
  }
};

// Updated single article fetch
export const getArticle = async (id) => {
  try {
    const response = await api.get(`/articles/${id}?populate=image`);
    
    if (!response.data?.data) {
      return null;
    }
    
    const article = response.data.data;
    const attrs = article.attributes || article; // Handle both formats
    
    return {
      id: article.id,
      title: attrs.title || 'Untitled',
      summary: attrs.summary || '',
      content: attrs.content || '',
      author: attrs.author || 'Unknown Author',
      date: attrs.publishedAt || attrs.published
        ? new Date(attrs.publishedAt || attrs.published).toLocaleDateString()
        : new Date().toLocaleDateString(),
      language: attrs.language || 'en',
      category: 'General',
      image: attrs.image?.data?.attributes?.url
        ? `http://localhost:1337${attrs.image.data.attributes.url}`
        : attrs.image?.url
        ? `http://localhost:1337${attrs.image.url}`
        : '/img/hero-image.jpg'
    };
  } catch (error) {
    console.error('❌ Error fetching article:', error);
    return null;
  }
};
// Get About Us content
export const getAboutUs = async (language = null) => {
  try {
    let url = '/abouts?populate=hero_image';
    
    // Filter by language if specified
    if (language) {
      url += `&filters[language][$eq]=${language}`;
    }
    
    console.log('🔍 Fetching About Us from:', API_BASE_URL + url);
    
    const response = await api.get(url);
    
    console.log('📊 About Us API Response:', response.data);
    
    if (!response.data || !response.data.data || response.data.data.length === 0) {
      console.warn('⚠️ No About Us data returned from API');
      return null;
    }
    
    // Get the first (and likely only) about us entry
    const aboutData = response.data.data[0];
    const attrs = aboutData.attributes || aboutData;
    
    return {
      id: aboutData.id,
      title: attrs.title || 'About Us',
      content: attrs.content || '',
      mission: attrs.mission || '',
      vision: attrs.vision || '',
      team_description: attrs.team_description || '',
      language: attrs.language || language || 'en',
      hero_image: attrs.hero_image?.data?.attributes?.url
        ? `http://localhost:1337${attrs.hero_image.data.attributes.url}`
        : attrs.hero_image?.url
        ? `http://localhost:1337${attrs.hero_image.url}`
        : null
    };
      
  } catch (error) {
    console.error('❌ Error fetching About Us:', error);
    return null;
  }
};
