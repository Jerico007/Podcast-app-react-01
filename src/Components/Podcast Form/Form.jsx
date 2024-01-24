// React library 
import { useReducer } from "react";

// Imported from common components
import Input from "../Common components/Input/Input";
import FileInput from "../Common components/File Input/FileInput";
import Button from "../Common components/Button/Button";


// Firebase  library
import {storage,db, auth} from "../../firebase";
import { addDoc, collection} from "firebase/firestore";
import { getDownloadURL, ref,uploadBytes } from "firebase/storage";
// React-toastify library
import { toast } from "react-toastify";
// Redux Api
import { useSelector } from "react-redux";
// React router library
import { useNavigate } from "react-router-dom";
// Form css imported
import "./Form.css";
const Form = () => {

    //use Selector for current user id
    const {user} = useSelector(state => state.user);
   
    const Navigate = useNavigate();

    //useReducer for managing form state
    const [formState,formDispatch] = useReducer(FormReducer , {PodcastTitle:"",PodcastDescription:"",BannerImage:"",smallImage:"",loading:false});

    function FormReducer (state,action)
    {
        if(action.type === "TITLE")
        {      
            return {...state,PodcastTitle:action.payLoad};
        }
        else if(action.type === "DESCRIPTION")
        { 
            return {...state,PodcastDescription:action.payLoad};
        }
        else if(action.type === "BANNER")
        {  
            return {...state,BannerImage:action.payLoad};
        }
        else if(action.type === "SMALL")
        {
            return {...state,smallImage:action.payLoad};
        }
        else if(action.type === "SUCCESS")
        {
            return {...state,PodcastTitle:"",PodcastDescription:"",BannerImage:"",smallImage:""};
        }
        else if(action.type === "LOADING")
        {
            return {...state,loading : action.payLoad};
        }
        return state;
    }

    
    //Function to validate form and upload user data to Firebase storage
    async function validateForm(){
        if(formState.PodcastTitle === "" || formState.PodcastDescription === "" || formState.BannerImage === "" || formState.smallImage === "")
        {
            toast.error("Please complete the form!");
        }
        else {
       
            const BannerImageRef = ref(storage ,`images/banner_images/${user.uid}/${Date.now()}`);
            const SmallImageRef = ref(storage,`images/small_images/${user.uid}/${Date.now()}`);
            try{
                    formDispatch({type:"LOADING",payLoad:true});
                    await uploadBytes(BannerImageRef,formState.BannerImage);
                    await uploadBytes(SmallImageRef,formState.smallImage);
                    const BannerImageURL = await getDownloadURL(BannerImageRef);
                    const SmallImageURL = await getDownloadURL(SmallImageRef);

                    const newPodcast ={
                        title : formState.PodcastTitle,
                        description : formState.PodcastDescription,
                        bannerImage : BannerImageURL,
                        smallImage : SmallImageURL,
                        createdBy : auth.currentUser.uid
                    }

                      await addDoc(collection(db,"podcasts"),newPodcast);

                    Navigate(`/podcasts`);
                    toast.success("Podcast Uploaded!");
                    formDispatch({type:"LOADING",payLoad:false});
                     formDispatch({type:"SUCCESS"});
            }
            catch(e){
                toast.error(e.message);
                formDispatch({type:"LOADING",payLoad:false});
            }
        }
    }
    
    //Function to handle form submit
    function handelSubmit(e){
        e.preventDefault();
        if(formState.loading)
        {
            return;
        }
        validateForm();
    }
 
    return (
        <div className='Form'>
            <h1>Create A Podcast</h1>
            <form onSubmit={handelSubmit}>
            <Input type="text" onInput={(e)=>{formDispatch({type:"TITLE",payLoad:e.target.value})}} maxLength={20} value={formState.PodcastTitle} placeholder="Podcast Title"></Input>
            <Input type="text" onInput={(e)=>{formDispatch({type:"DESCRIPTION",payLoad:e.target.value})}} value={formState.PodcastDescription} placeholder="Podcast Description"></Input>
            <FileInput id={"Banner-img"}  name={"Banner"} accept={"image/*"} callback={formDispatch} />
            <FileInput id={"Small-img"}  name={"Small"} accept={"image/*"} callback={formDispatch} />
            {
                formState.loading? <Button className="Loading" text={"Loading..."}></Button> : <Button type="submit" text={"Create Now"}></Button>
            }
          
           </form>    
        </div>
    );
}

export default Form;
