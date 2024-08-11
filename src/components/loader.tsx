import React from 'react';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className='flex justify-content-center align-items-center' style={{height:'100px'}}>
            <span className="loader"></span>
        </div>
    );
};

export default Loader;
