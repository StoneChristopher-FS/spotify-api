import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../components/header/header';

import userImg from '../../images/icons/circle-user-solid.svg';

import '../../main.css';
import './profile.css';


function Profile() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const getData = async () => {
            await axios.get('http://localhost:3001/spotify/v1/me')
            .then(({data}) => {
                setData(data);
                console.log(data);
            })
            .catch(err => console.error(err));

            setLoading(false);
        }
        
       getData();
    }, []);

    return (
        <div className='secondary'>
            {(!loading)
                ? <div>
                    <Header />
                    <section className='profile-container'>
                        <a href={data.external_urls.spotify} target='_blank' rel='noreferrer' className='profile secondary'>
                            {(data.images.length <= 0)
                            ? <img src={userImg} alt='' className='profile-pic'/>
                            : <img src={data.images[0].url} alt='' className='profile-pic'/>
                            }
                            <h2>{data.display_name}</h2>
                            <h3>Followers: {data.followers.total}</h3>
                        </a>
                    </section>
                </div>
                : <h1>Loading...</h1>
            }
        </div>
        
        
    ); 
}

export default Profile;
