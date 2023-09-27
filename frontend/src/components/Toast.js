import React, { useEffect, useState } from 'react';

const Toast = ({ message }) => {
    const [renderedItems, setRenderedItems] = useState([]);
    const [displayedItems, setDisplayedItems] = useState([]);

    useEffect(() => {
        const delay = 1000;

        const renderItemsWithDelay = async () => {
            for (const item of message) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                setRenderedItems((prevRenderedItems) => [...prevRenderedItems, item]);
                setDisplayedItems([item]);

                // Remove the item from displayedItems after 3 seconds (adjust as needed)
                setTimeout(() => {
                    setDisplayedItems([]);
                }, 3000);
            }
        };

        renderItemsWithDelay();
    }, [message]);

    return (
        <>
            {displayedItems.map((item, index) => (
                <div
                    key={index}
                    className="fixed bottom-0 right-0 m-4 bg-gray-800 text-white p-2 rounded"
                >
                    {item}
                </div>
            ))}
        </>
    );
};

export default Toast;