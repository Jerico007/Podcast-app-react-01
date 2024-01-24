// React library
import { useEffect, useState } from "react";

// Navbar component
import NavBar from "../Components/Navbar/NavBar";

// Button component
import Button from "../Components/Common components/Button/Button";

// Episode component
import Episode from "../Components/Episode Card/Episode";

// Audio component
import AudioPlayer from "../Components/Audio Player/AudioPlayer";

// React router dom library
import { useParams, useNavigate } from "react-router-dom";

// firestore library
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";

// React toastify library
import { toast } from "react-toastify";

const PodcastDetails = () => {
  // Podcast Id
  const { id } = useParams();

  //   Navigate
  const Navigate = useNavigate();

  // useState to store podDetails
  const [podDetails, setPodDetails] = useState({});

  // useState to store episodes
  const [episodes, setEpisodes] = useState([]);

  // useState to store audio player details
  const [playSound, setplaySound] = useState("");

  // useEffect for getting the banner data on id change
  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id]);

  // useEffect for gettting episodes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "podcasts", id, "episodes"),
      (snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({ id: doc.id, isPlaying: false, ...doc.data() });
        });
        setEpisodes(arr);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);

  // function to fetch the podcast details
  async function getDetails() {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPodDetails({ id: id, ...docSnap.data() });
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="PodcastDetails">
      <NavBar />
      {podDetails.id ? (
        <div className="Pod-Details">
          <div className="Pod-title-button-holder">
            <p className="Pod-title">{podDetails.title}</p>
            {auth.currentUser.uid === podDetails.createdBy && (
              <Button
                className={"Pod-create-episode-button"}
                callback={() => {
                  Navigate(`/podcast/create-episode/${id}`);
                }}
                text={"Create Episode"}
              />
            )}
          </div>
          {/* Podcast details section */}
          <div className="Pod-banner">
            <img src={podDetails.bannerImage} alt="No-Image" />
          </div>
          <p className="Pod-description">{podDetails.description}</p>
          {/* Episode section */}
          <div className="Pod-episodes">
            <h3 className="Episode-heading" style={{ color: "white" }}>
              Episodes
            </h3>
            {episodes.length > 0 ? (
              episodes.map((val, index) => (
                <Episode
                  key={val.id}
                  episode={val}
                  index={index}
                  setplaySound={setplaySound}
                  play={val.isPlaying}
                  episodes={episodes}
                  setEpisodes={setEpisodes}
                />
              ))
            ) : (
              <h3 style={{ color: "white", alignSelf: "center" }}>
                No episodes added
              </h3>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {playSound !== "" ? (
        <AudioPlayer
          src={playSound.audio}
          image={podDetails.smallImage}
          name={playSound.title}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PodcastDetails;
