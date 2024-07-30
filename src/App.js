import React, { useState } from 'react';
import SearchForm from './SearchForm';
import ProductCard from './ProductCard';

const App = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (searchStr, country) => {
        setLoading(true);
        setError(null);

        const requestBody = {
            search_str: searchStr,
            country: country,
        };

        try {
            const corsProxy = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = 'https://findresale.onrender.com/search';
            const response = await fetch(corsProxy + apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            setProducts([...data.vestiare?.items || [], ...data.vinted?.items || []]);
        } catch (err) {
            setError('Error loading results.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>less&lt;</h1>
                <SearchForm onSearch={handleSearch} />
            </header>
            <div id="results" className="results-section">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {products.length === 0 && !loading && <p>No results found.</p>}
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default App;