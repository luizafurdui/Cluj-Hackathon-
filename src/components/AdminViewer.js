import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

const AdminViewer = ({ date }) => {
    const [summary, setSummary] = useState([]);

    const token = localStorage.getItem('token');

    // Make an authenticated request to the server
    const config = {
        headers: {
        'Authorization': `${token}`
        }
    };



    useEffect(() => {
        // Fetch pupils by class ID when classID changes
       //getDailySummary(setSummary, date, token);
    }, []);


    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Supa (Veg)', selector: row => row.soupV, sortable: true },
        { name: 'Fel Principal (Veg)', selector: row => row.mainV, sortable: true }, // Note that it's 'address' not 'adress'
        { name: 'Supa', selector: row => row.soup, sortable: true },
        { name: 'Fel Principal', selector: row => row.main, sortable: true }, // Note that it's 'address' not 'adress'
        { name: 'Ambalaj', selector: row => row.package, sortable: true }
        //{ name: 'Food Preference', selector: row => row.foodPreferenceID, sortable: true },
    ];

    return (
        <div>
        <h1>Rezumat</h1>
        <DataTable
            title="Rezumat"
            columns={columns}
            data={summary}
        />
        </div>
    );
};

export default AdminViewer;
