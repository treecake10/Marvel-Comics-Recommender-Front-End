import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { checkIfItemLiked, checkIfItemFavorited } from '../Components/State/Auth/Action';
import { fetchCreatorById, fetchSeriesByCreatorId, fetchEventsByCreatorId } from "../libs/utils";
import ConcurrentDataFetcher from "../Components/DataTools/ConcurrentDataFetcher";
import DataList from "../Components/DataList";
import Like from "../Components/Icons/Like";
import Favorite from "../Components/Icons/Favorite";

const CreatorDetails = ({ isAuthenticated }) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const isLiked = useSelector(state => state.auth.isLiked);
    const isFavorited = useSelector(state => state.auth.isFavorited);

    const [creator, setCreator] = useState(null);

    const [data, setData] = useState({
        series: [],
        events: [],
    });
    
    const [loading, setLoading] = useState({
        series: false,
        events: false,
    });

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

    const fetchListData = async (fetchFunction, listType) => {
        
        setLoading((prevLoading) => ({ ...prevLoading, [listType]: true }));

        try {
            if (creator && creator[listType]?.available) {
                const availability = creator[listType].available;
                const result = await memoizedConcurrentDataFetcher(fetchFunction, id, availability);
                setData((prevData) => ({ ...prevData, [listType]: result }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, [listType]: false }));
        }
    };

    useEffect(() => {

        dispatch(checkIfItemLiked(id, 'creator', jwt));
        dispatch(checkIfItemFavorited(id, 'creator', jwt));
     
     }, [dispatch, id, jwt])

    useEffect(() => {
        fetchListData(fetchEventsByCreatorId, 'events');
        fetchListData(fetchSeriesByCreatorId, 'series');
    }, [creator]);

    const memoizedConcurrentDataFetcher = useMemo(() => ConcurrentDataFetcher, []);

    if (!creator) return null;

    const { fullName, thumbnail } = creator;

    return (
        <div className="home">
            <div className="container large">
                <div className="details-container">
                    <div className="left-side">
                        <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt='character image full size' />
                        <div className="contents">
                            <br />
                            <div className="contents__arrangement">
                                <h1>{fullName}</h1>
                            </div>
                            <br />
                            <div className="contents__arrangement">

                                {isAuthenticated ? (
                                    <Like itemId={id} itemType={'creator'} itemName={fullName} likedBool={isLiked}/>
                                ) : (
                                    <Link to="/authentication?type=detailsPage" className="link-style">
                                        <Like />
                                    </Link>
                                )}

                                <div className="middle-column-spacing"></div>

                                {isAuthenticated ? (
                                    <Favorite itemId={id} itemType={'creator'} itemName={fullName} favoritedBool={isFavorited}/>
                                ) : (
                                    <Link to="/authentication?type=detailsPage" className="link-style">
                                        <Favorite />
                                    </Link>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="column-space"></div>
                        <DataList array={data.series} listName={"Series"} loading={loading.series} />
                        <div className="middle-column-spacing"></div>
                        <DataList array={data.events} listName={"Events"} loading={loading.events} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorDetails;
