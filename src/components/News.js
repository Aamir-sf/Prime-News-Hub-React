import React, { useEffect, useState } from "react";
import axios from "axios";

const News = ({ category, pageSize, searchQuery, setProgress }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setProgress(30); // Loading bar start
        let url = `/api/news?category=${category}&pageSize=${pageSize}`;
        if (searchQuery) {
          url += `&searchQuery=${searchQuery}`;
        }
        const response = await axios.get(url);
        setArticles(response.data.articles || []);
        setProgress(100); // Loading complete
      } catch (error) {
        console.error("Error fetching news:", error);
        setProgress(100);
      }
    };

    fetchNews();
  }, [category, pageSize, searchQuery, setProgress]);

  return (
    <div className="news-container">
      {articles.length === 0 ? (
        <p>No news found</p>
      ) : (
        articles.map((article, index) => (
          <div key={index} className="news-item">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))
      )}
    </div>
  );
};

export default News;
