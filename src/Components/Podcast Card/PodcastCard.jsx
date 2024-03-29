/* eslint-disable react/prop-types */

// Podcast-Card CSS
import "./PodcastCard.css";

// React router dom
import { Link } from "react-router-dom";

const PodcastCard = ({ image, title , id }) => {

  
  return (
    <Link to={`/PodcastDetails/${id}`}>
     <div className="PodcastCard">
      <div className="PodcastCard-content">
        <img className="PodcastCard-bannerImage" alt="No-image" src={image} loading="lazy"/>
        <p className="PodcastCard-title">{title}</p>
      </div>
    </div>
    </Link>
   
  );
};

export default PodcastCard;
