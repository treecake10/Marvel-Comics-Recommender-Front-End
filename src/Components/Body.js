import React, { useEffect, useState } from 'react';
import { fetchComicEvents } from "../utils/utils";

const Body = () => {

    const [comicEventData, setComicEventData] = useState([]);
    const [randomArrItems, setRandomArrItems] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const eventData = await fetchComicEvents();
                setComicEventData(eventData); 
                console.log(comicEventData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();

    }, []);

    useEffect(() => {
        
        if (comicEventData && comicEventData.data && comicEventData.data.results) {
            const items = comicEventData.data.results;
            const shuffledArr = items.sort(() => 0.5 - Math.random());
            setRandomArrItems(shuffledArr.slice(0, 9));
        }
        
    }, [comicEventData]);

    
    return(

        <div className="body">
            <div className="col">
                <h2>Comics Just For You</h2>
                <p>Sign in or create an account. Select your favorite characters, movies, or comic series.<br/>Get a recommended reading list tailored to your interests! </p>
                <button type="button">Get Started</button>
            </div>
            <div className="col">
                {randomArrItems.map((item, index) => (
                    <div key={index} className="card">
                        <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={`Image ${index}`} />
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default Body;