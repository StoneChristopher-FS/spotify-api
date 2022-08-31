import { useEffect, useState } from 'react';
import axios from 'axios';

import '../../main.css';
import './dashboard.css'

import Header from '../../components/header/header';
import Card from '../../components/card/card';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getNewReleases = async () => {
        await axios.get('http://localhost:3001/spotify/v1/browse/new-releases')
        .then(({data}) => {
            setData(data);
        })
        .catch(err => {
            console.log(err);
        })
        setLoading(false);
    }

    getNewReleases();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
        await axios.get('http://localhost:3001/spotify/v1/browse/categories')
        .then(({data}) => {
            setCategories(data);
        })
        .catch(err => {
            console.log(err);
        })

        setLoading2(false);
    }

      getCategories();
  }, [])

  return (
    <div className='app-header secondary'>
        <Header />
        <section className='container'>
            <h3>New Releases:</h3>
            <div className='sub-container'>
                {
                    (!loading)
                    ?
                        <div className='test-card'>
                            {data.albums.items.map((album, i) => {
                                return <Card
                                key={i}
                                url={album.external_urls.spotify}
                                img={album.images[1].url}
                                album={album.name}
                                artists={album.artists}
                                />
                            })}
                        </div>
                    : <h1>Loading...</h1>
                }
            </div>
        </section>
        <section className='container'>
            <h3>Categories:</h3>
            <div className='sub-container'>
                {
                    (!loading2)
                    ?
                        <div className='test-card'>
                            {categories.categories.items.map((categories, i) => {
                                return <Card
                                key={i}
                                url='/dashboard'
                                img={categories.icons[0].url}
                                category={categories.name}
                                />
                            })}
                        </div>
                    : <h1>Loading...</h1>
                }
            </div>
        </section>  
    </div>
  );
}

export default Dashboard;