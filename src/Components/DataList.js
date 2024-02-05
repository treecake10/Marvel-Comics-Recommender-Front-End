import React from 'react';
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const DataList = ({ array = [], listName, loading }) => {
    let displayProperty;
    let listIdRoute;

    switch (listName) {
        case 'Characters':
            displayProperty = 'name';
            
            listIdRoute = 'character';
            break;
        case 'Creators':
            displayProperty = 'fullName';
            
            listIdRoute = 'creator';
            break;
        case 'Comics':
            displayProperty = 'title';
            
            listIdRoute = 'comic';
            break;
        case 'Series':
            displayProperty = 'title';
          
            listIdRoute = 'series';
            break;
        default:
            displayProperty = 'title';
            listIdRoute = 'event';
            break;
    }

    return (
        <div className="lists">
            <h2>{listName}</h2>
            <br />
            {loading ? (
                <BarLoader
                    color={'#F0131E'}
                    loading={loading}
                    size={0}
                    aria-label="Loading Grid"
                    data-testid="loader"
                />
            ) : (
                <ul>
                    {array && array.map((item, index) => (
                        <li key={index}>
                            <Link to={`/${listIdRoute}/${item.id}`}>{item[displayProperty]}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DataList;
