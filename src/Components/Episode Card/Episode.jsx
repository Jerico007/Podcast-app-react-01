/* eslint-disable react/prop-types */
import "./Episode.css";

import Button from "../Common components/Button/Button";

import { FaPlay,FaPause } from "react-icons/fa";


const Episode = ({ episode, index, setplaySound, play,episodes,setEpisodes }) => {


  // Function to handle play  episode
  function handlePlay() {
    const newArr = [...episodes];
    
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === episode.id) {
          newArr[i].isPlaying = false;
      }
    }
    setEpisodes(newArr);
 
  }

  // Function to handle pause episode
  function handlePause() {
    const newArr = [...episodes];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === episode.id) {
        
          newArr[i].isPlaying = true;        
      }
      else{
        newArr[i].isPlaying = false
      }
    }
    setEpisodes(newArr);
  }

  return (
    <>
      <div className="Pod-episode">
        <p className="Pod-episode-name">{`${index + 1}.) ${episode.title}`}</p>
        <p className="Pod-episode-description">{episode.description}</p>
        {play ? (
          <Button
            className={"Pod-episode-play-button"}
            text={<FaPause/>}
            callback={() => {
              handlePlay();
              setplaySound("");
            }}
          />
        ) : (
          <Button
            className={"Pod-episode-play-button"}
            text={<FaPlay/>}
            callback={() => {
              handlePause();
              setplaySound(episode);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Episode;
