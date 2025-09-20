import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  country = "in",
  category = "top",
  language = "en",
  searchQuery = "",
  searchId = 0,
  setProgress = () => {},
  apiKeys 
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0); 

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const getUrl = (token, key) => {
    const query = searchQuery.trim();
    const base = "https://newsdata.io/api/1/news";
    
    let url = `${base}?apikey=${key}&country=${country}&language=${language}`;

    if (query) {
      url += `&q=${encodeURIComponent(query)}`;
    } else {
      url += `&category=${category}`;
    }

    if (token) {
      url += `&page=${token}`;
    }
    return url;
  };

  const updateNews = async (retry = false) => {
    setProgress(10);
    setLoading(true);

    try {
      const currentKey = apiKeys[currentKeyIndex];
      const url = getUrl(null, currentKey);
      const res = await fetch(url);

      if (res.status === 429) { 
        console.warn(`API key has reached its limit. Attempting to switch.`);
        
        const nextKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
        
        if (nextKeyIndex !== currentKeyIndex) {
          setCurrentKeyIndex(nextKeyIndex);
          updateNews(true);
          return;
        } else {
          console.error("All API keys have reached their request limit.");
          setLoading(false);
          setProgress(100);
          return;
        }
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`API Error: ${res.status} - ${JSON.stringify(errorData.results)}`);
      }

      const data = await res.json();
      const safeArticles = Array.isArray(data.results) ? data.results : [];
      
      setArticles(safeArticles);
      setTotalResults(data.totalResults || 0);
      setNextPageToken(data.nextPage || null);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setArticles([]);
      setTotalResults(0);
      setNextPageToken(null);
    }

    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    if (!nextPageToken) return;

    try {
      const currentKey = apiKeys[currentKeyIndex];
      const url = getUrl(nextPageToken, currentKey); 
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();
      const safeArticles = Array.isArray(data.results) ? data.results : [];
      
      setArticles(articles.concat(safeArticles));
      setNextPageToken(data.nextPage || null);
    } catch (error) {
      console.error("Failed to fetch more news:", error);
      setNextPageToken(null);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - Prime News Hub`;
    updateNews();
    // eslint-disable-next-line
  }, [category, searchId, language, currentKeyIndex]);

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "70px" }}
      >
        Prime News Hub -{" "}
        {searchQuery
          ? `Results for "${searchQuery}"`
          : `Top ${capitalizeFirstLetter(category)} Headlines`}
      </h1>

          {loading && articles.length === 0 && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={nextPageToken !== null}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.article_id}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.image_url}
                  newsUrl={element.link}
                  author={element.creator ? element.creator[0] : "Unknown"}
                  date={element.pubDate ? new Date(element.pubDate).toUTCString() : "Unknown date"}
                  source={element.source_id || "Unknown"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;