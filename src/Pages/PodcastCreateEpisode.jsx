// React router dom
import { useParams } from 'react-router-dom';
// NavBar component
import NavBar from '../Components/Navbar/NavBar';
// Episode Form component
import Form from '../Components/Episode Form/Form';

const PodcastCreateEpisode = () => {

    const {id} = useParams();

    return (
        <div className='PodcastCreateEpisode'>
            <NavBar />
            <Form  podcastId={id}/>
        </div>
    );
}

export default PodcastCreateEpisode;
