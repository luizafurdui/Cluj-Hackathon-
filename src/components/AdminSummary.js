import React, { useState, useEffect } from 'react';
import NumberTextPair from './NumberTextPair';

const AdminSummary = ({ token }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState({
        totalPortions: 0,
        totalBilledAmount: 0,
        totalPaid: 0,
        totalUnpaid: 0,
        paidPortionsCount: 0,
        unpaidPortionsCount: 0
        ,
    });

    useEffect(() => {
        setLoading(true);
        try {
            if (token !== undefined)
                return
                //getSummary(setSummary, token);
            else console.log("nu e token");
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
        }
    }, [token]);


    return (
        <div className='container'>
            {loading ? <p>Loading...</p> :
                <div>
                    <h1>Overall Summary</h1>
                    <NumberTextPair number={summary.totalPortions} text="Total Chats"  />
                </div>
            }
        </div>
    );
};

export default AdminSummary;