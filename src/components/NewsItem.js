import React from "react";

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;

  const fallbackImage =
    "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0";

  const validImage = imageUrl && imageUrl.trim() !== "" ? imageUrl : fallbackImage;

  return (
    <div className="my-3">
      <div className="card">
        <span
          className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-black"
          style={{ zIndex: "1" }}
        >
          {source || "Unknown"}
        </span>
        <img src={validImage} className="card-img-top" alt={title || "News"} />
        <div className="card-body">
          <h5 className="card-title">{title || "No Title"}</h5>
          
       
          <p className="card-text">
            {description ? `${description.slice(0, 90)}...` : "No Description Available"}
          </p>
          
          <p className="card-text">
            <small className="text-success">
              By {author || "Unknown"} on {new Date(date).toUTCString() || "Unknown"}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl || "#"}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;