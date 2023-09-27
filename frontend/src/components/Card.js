import React, { useState } from 'react';
import { sendEmail } from '../lib/api';

const Card = () => {
    const [numEmail, setNumEmail] = useState(0);

    const onSend = (e) => {
        e.preventDefault();
        sendEmail(numEmail);
        setNumEmail(0);
    }  

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 w-96">
                <h1 className="text-2xl font-semibold mb-4 text-center">Fena</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="numEmail" className="block text-gray-600 font-medium mb-2">Number of email's to process</label>
                        <input type="number" id="numEmail" name="numEmail" value={numEmail} onChange={(e) => setNumEmail(e.target.value)} className="border rounded w-full py-2 px-3" />
                    </div>
                    <button type="submit" onClick={onSend} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Card;
