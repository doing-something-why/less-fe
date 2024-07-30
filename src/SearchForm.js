import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [searchStr, setSearchStr] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchStr && country) {
            onSearch(searchStr, country);
        }
    };

    return (
        <form id="searchForm" onSubmit={handleSubmit}>
            <input
                type="text"
                id="search-str"
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
                placeholder="Paste product link or search"
            />
            <select
                id="country-nav"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            >
                <option value="">Country</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="United States">United States</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
