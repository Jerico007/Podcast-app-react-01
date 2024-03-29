/* eslint-disable react/prop-types */

// React router dom library
import { useNavigate } from "react-router-dom";

// React library
import { useReducer } from "react";

// React Toastify library
import { toast } from "react-toastify";

// Firebase library
import { storage,db,auth } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Imported from Common Component
import Input from "../Common components/Input/Input";
import FileInput from "../Common components/File Input/FileInput";
import Button from "../Common components/Button/Button";
import { addDoc, collection } from "firebase/firestore";

const Form = ({podcastId}) => {

    const Navigate = useNavigate();

  // Function to handel Submit
  function handelSubmit(e) {
    e.preventDefault();
    if(formState.loading)
    {
        return;
    }
    validateForm();
  }


  async function validateForm(){
    if(formState.episodeTitle === "" || formState.episodeDescription === "" || formState.episodeAudio === "" )
    {
        toast.error("Please complete the form!");
    }
    else{
        try{
            formDispatch({type:"LOADING",payLoad:true});
            // Audio Ref
            const AudioRef = ref(storage,`audios/${auth.currentUser.uid}/${Date.now()}`);
            // Uploading Audio
            await uploadBytes(AudioRef,formState.episodeAudio);
            // Downloading Audio
            const AudioURL =  await getDownloadURL(AudioRef);
            
            const newEpisode = {
                title:formState.episodeTitle,
                description:formState.episodeDescription,
                audio:AudioURL
            }
            
              await addDoc(collection(db,"podcasts",podcastId,"episodes"),newEpisode);
            
            toast.success("Episode uploaded!");
            formDispatch({type:"LOADING",payLoad:false});
            formDispatch({type:"SUCCESS"});
            Navigate(`/podcastDetails/${podcastId}`);
        }
        catch(error)
        {
            toast.error(error.message);
            formDispatch({type:"LOADING",payLoad:false});
        }

    }
  }


    // useReducer
  const [formState, formDispatch] = useReducer(FormReducer, {
    episodeTitle: "",
    episodeDescription: "",
    episodeAudio: "",
    loading: false,
  });

//   FormReducer
  function FormReducer(state, action) {
    if (action.type === "TITLE") {
      return { ...state, episodeTitle: action.payLoad };
    } else if (action.type === "DESCRIPTION") {
      return { ...state, episodeDescription: action.payLoad };
    } else if (action.type === "AUDIO") {
      return { ...state, episodeAudio: action.payLoad };
    }
    else if(action.type === "LOADING"){
        return {...state,loading: action.payLoad}
    }
    else if(action.type === "SUCCESS"){
        return {...state,episodeTitle : "",episodeDescription:"",episodeAudio:""}
    }
    return state;
  }

  
  return (
    <div className="Form">
      <h1>Create An Episode</h1>
      <form onSubmit={handelSubmit} className="EpisodeForm">
        <Input
          type="text"
          onInput={(e) => {
            formDispatch({ type: "TITLE", payLoad: e.target.value });
          }}
          value={formState.PodcastTitle}
          placeholder="Podcast Title"
        ></Input>
        <Input
          type="text"
          onInput={(e) => {
            formDispatch({ type: "DESCRIPTION", payLoad: e.target.value });
          }}
          value={formState.PodcastDescription}
          placeholder="Podcast Description"
        ></Input>
        <FileInput id={"Audio-file"} name={"Audio"} accept={"audio/*"} callback={formDispatch} />
        {formState.loading ? (
          <Button className="Loading" text={"Loading..."}></Button>
        ) : (
          <Button type="submit" text={"Create Now"}></Button>
        )}
      </form>
    </div>
  );
};

export default Form;
