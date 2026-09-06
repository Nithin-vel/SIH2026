import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialFeedPosts, reelsData, expertQuestions, notificationsData } from '../data/mockData';

const AppStateContext = createContext(null);

export const AppStateProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [feedFilter, setFeedFilter] = useState('for-you');

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
      unreadNotificationsCount
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
