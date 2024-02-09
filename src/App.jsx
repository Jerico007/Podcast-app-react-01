// React router Dom library
import { Routes, Route, useNavigate } from "react-router-dom";

// Pages routes
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Podcasts from "./Pages/Podcasts";
import StartAPodcast from "./Pages/StartAPodcast";
import PodcastDetails from "./Pages/PodcastDetails";
import PodcastCreateEpisode from "./Pages/PodcastCreateEpisode";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";

// React libraries
import { useEffect } from "react";

// Firebase libraries
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// React toastify libraries
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux libraries
import { setUser } from "./Slices/userSlice";
import { useDispatch } from "react-redux";
// Private route component
import PrivateRoute from "./Components/Private Route/PrivateRoute";


function App() {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  //useEffect to authorize user if already signed in
  useEffect(() => {
    Navigate("/profile");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const docData = docSnap.data();
            dispatch(
              setUser({
                fullName: docData.fullName,
                email: docData.email,
                profileURL: docData.profileURL,
                uid: docData.uid,
              })
            );
          }
        });
      } else {
        // No user is signed in.
        toast.success("Welcome Anonymous");
        Navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route element={<PrivateRoute />}>
       
          <Route path="/podcasts" element={<Podcasts />}></Route>
       
          <Route path="/startApodcast" element={<StartAPodcast />}></Route>
          <Route
            path="/podcastDetails/:id"
            element={<PodcastDetails />}
          ></Route>
          <Route
            path="/podcast/create-episode/:id"
            element={<PodcastCreateEpisode />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/editProfile" element={<EditProfile />}></Route>
        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
