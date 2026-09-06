import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialFeedPosts, reelsData, expertQuestions, notificationsData, weatherData } from '../data/mockData';
import { generateForecastArray, generateAdvisories, generateCriticalAlert } from '../utils/weatherUtils';

const AppStateContext = createContext(null);

export const AppStateProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [feedFilter, setFeedFilter] = useState('for-you');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  // Posts State
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('farmogram_posts');
    return saved ? JSON.parse(saved) : initialFeedPosts;
  });

  // Reels State
  const [reels] = useState(reelsData);

  // Expert Q&A State
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('farmogram_questions');
    return saved ? JSON.parse(saved) : expertQuestions;
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('farmogram_notifications');
    return saved ? JSON.parse(saved) : notificationsData;
  });

  // Weather State
  const [weather, setWeather] = useState(() => {
    const saved = localStorage.getItem('farmogram_weather');
    return saved ? JSON.parse(saved) : weatherData;
  });

  // Settings State
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('farmogram_notifications_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [highContrastMode, setHighContrastMode] = useState(() => {
    const saved = localStorage.getItem('farmogram_high_contrast');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Attempt to fetch fresh location/weather on app load for already logged in users
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            const locRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const locData = await locRes.json();
            const city = locData.address.city || locData.address.town || locData.address.village || locData.address.county || "Unknown Location";
            const state = locData.address.state || "Tamil Nadu";
            
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto`);
            const fetchedWeather = await weatherRes.json();
            
            const temp = Math.round(fetchedWeather.current.temperature_2m);
            const humidity = Math.round(fetchedWeather.current.relative_humidity_2m);
            const windSpeed = Math.round(fetchedWeather.current.wind_speed_10m);
            const code = fetchedWeather.current.weather_code;
            
            let condition = "Clear";
            if (code >= 1 && code <= 3) condition = "Partly Cloudy";
            if (code >= 45 && code <= 48) condition = "Fog";
            if (code >= 51 && code <= 67) condition = "Rain";
            if (code >= 71 && code <= 77) condition = "Snow";
            if (code >= 80 && code <= 82) condition = "Showers";
            if (code >= 95) condition = "Thunderstorm";

            const forecast7Day = generateForecastArray(fetchedWeather.daily);
            const agroAdvisories = generateAdvisories(fetchedWeather.daily, { windSpeed });
            const advisoryAlert = generateCriticalAlert(agroAdvisories);
            
            const currentRainProb = fetchedWeather.daily.precipitation_probability_max[0] || 0;
            const simulatedSoilMoisture = Math.round((humidity * 0.7) + (currentRainProb * 0.3));
            const soilStatus = simulatedSoilMoisture > 50 ? 'Adequate' : simulatedSoilMoisture > 30 ? 'Moderate' : 'Low/Dry';
            
            setWeather(prev => ({
              ...prev,
              location: `${city}, ${state}`,
              currentTemp: temp,
              humidity: humidity,
              windSpeed: windSpeed,
              condition: condition,
              rainfallProbability: currentRainProb,
              soilMoisture: `${soilStatus} (${simulatedSoilMoisture}%)`,
              forecast7Day: forecast7Day,
              agroAdvisories: agroAdvisories,
              advisoryAlert: advisoryAlert
            }));
          } catch(e) {
            console.error("Auto weather fetch failed", e);
          }
        },
        (error) => console.warn("Auto geolocation failed:", error),
        { timeout: 7000 }
      );
    }
  }, []);

  // Persistent storage sync
  useEffect(() => {
    localStorage.setItem('farmogram_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('farmogram_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('farmogram_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('farmogram_weather', JSON.stringify(weather));
  }, [weather]);

  useEffect(() => {
    localStorage.setItem('farmogram_notifications_enabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('farmogram_high_contrast', JSON.stringify(highContrastMode));
    if (highContrastMode) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrastMode]);

  // Post Actions
  const toggleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const toggleSave = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isSaved = !post.isSaved;
        return {
          ...post,
          isSaved,
          saves: isSaved ? post.saves + 1 : post.saves - 1
        };
      }
      return post;
    }));
  };

  const addComment = (postId, commentText, userName = 'Murugan K.') => {
    if (!commentText.trim()) return;
    const newComment = {
      id: 'c_' + Date.now(),
      user: userName,
      text: commentText.trim(),
      time: 'Just now'
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));
  };

  const createPost = (postData) => {
    const newPost = {
      id: 'post_' + Date.now(),
      author: {
        name: 'Murugan K.',
        role: 'Farmer',
        location: 'Perundurai, Erode',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=160&auto=format&fit=crop&q=80',
        verified: false
      },
      crop: postData.crop || 'Vegetables',
      category: postData.category || 'Crop Experience',
      timestamp: 'Just now',
      title: postData.title,
      content: postData.content,
      image: postData.image || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80',
      likes: 1,
      isLiked: true,
      saves: 0,
      isSaved: false,
      commentsCount: 0,
      comments: [],
      tags: postData.tags || [postData.crop, 'FarmogramCommunity']
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const reportPost = (postId, reason) => {
    // In mock state, mark as reported
    alert(`Thank you. Post reported for: "${reason}". Farmogram moderators have been alerted.`);
  };

  // Expert Q&A Actions
  const askQuestion = (questionData) => {
    const newQ = {
      id: 'q_' + Date.now(),
      farmer: {
        name: 'Murugan K.',
        location: 'Perundurai, Erode',
        crop: questionData.crop,
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=160&auto=format&fit=crop&q=80'
      },
      question: questionData.question,
      timestamp: 'Just now',
      image: questionData.image || null,
      answersCount: 0,
      verifiedAnswer: null,
      replies: []
    };
    setQuestions(prev => [newQ, ...prev]);
  };

  const addReplyToQuestion = (questionId, replyText) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: 'r_' + Date.now(),
      user: 'Murugan K.',
      text: replyText.trim(),
      time: 'Just now'
    };

    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answersCount: q.answersCount + 1,
          replies: [...(q.replies || []), newReply]
        };
      }
      return q;
    }));
  };

  // Notifications Actions
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppStateContext.Provider value={{
      isDrawerOpen,
      setIsDrawerOpen,
      toggleDrawer,
      activePage,
      setActivePage,
      feedFilter,
      setFeedFilter,
      posts,
      reels,
      toggleLike,
      toggleSave,
      addComment,
      createPost,
      reportPost,
      questions,
      askQuestion,
      addReplyToQuestion,
      notifications,
      markAllAsRead,
      markAsRead,
      unreadNotificationsCount,
      unreadNotificationsCount,
      weather,
      setWeather,
      notificationsEnabled,
      setNotificationsEnabled,
      highContrastMode,
      setHighContrastMode
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
