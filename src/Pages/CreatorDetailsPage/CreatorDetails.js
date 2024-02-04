import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchCreatorById, fetchSeriesByCreatorId, fetchEventsByCreatorId } from "../../libs/utils";
import ParallelDataFetcher from "../../Components/DataTools/ParallelDataFetcher";
import DataList from "../../Components/DataList";
import Like from "../../Components/Icons/Like";
import Favorite from "../../Components/Icons/Favorite";
import "./CreatorDetails.css";

const CreatorDetails = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [series, setSeries] = useState([]);
    const [events, setEvents] = useState([]);
    const [loadSeries, setSeriesLoading] = useState(false);
    const [loadEvents, setEventsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creatorData = await fetchCreatorById(id);
                setCreator(creatorData[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    useEffect(() => {
        const fetchListData = async (fetchFunction, listType) => {
            listType === 'events' ? setEventsLoading(true) : setSeriesLoading(true);
            try {
                if (creator && creator[listType]?.available) {
                    const availability = creator[listType].available;
                    const result = await ParallelDataFetcher(fetchFunction, id, availability);
    
                    if (listType === 'events') {
                        setEvents(result);
                    } else {
                        setSeries(result);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                listType === 'events' ? setEventsLoading(false) : setSeriesLoading(false);
            }
        };
    
        fetchListData(fetchEventsByCreatorId, 'events');
        fetchListData(fetchSeriesByCreatorId, 'series');
    
    }, [id, creator]);

    if (!creator) return null;

    const { fullName, thumbnail } = creator;

    return (
        <div className="home">
            <div className="container large">
                <div className="details-container">
                    <div className="creator__left-side">
                        <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt='character image full size' />
                        <div className="contents">
                            <br />
                            <div className="creator__contents__arrangement">
                                <h1>{fullName}</h1>
                            </div>
                            <br />
                            <div className="creator__contents__arrangement">
                                <Like />
                                <div className="middle-column-spacing"></div>
                                <Favorite />
                            </div>
                        </div>
                    </div>
                    <div className="creator__right-side">
                        <div className="creator__column-space"></div>
                        <DataList array={series} listName={"Series"} listStyle={"creator__lists"} loading={loadSeries} />
                        <div className="middle-column-spacing"></div>
                        <DataList array={events} listName={"Events"} listStyle={"creator__lists"} loading={loadEvents} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorDetails;
