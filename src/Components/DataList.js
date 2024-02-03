import React from 'react';
import BarLoader from "react-spinners/BarLoader";

const DataList = ({ array = [], listName, loading }) => {
    return (
        <div className='character__series'>
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
                    {array.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default DataList;