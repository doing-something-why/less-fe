import React, { useState } from 'react';
import SearchForm from './SearchForm';
import ProductCard from './ProductCard';
import './style.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (searchStr, country, colors, sizes) => {
        setLoading(true);
        setError(null);

        const requestBody = {
            search_str: searchStr,
            country: country,
            colors: colors,
            sizes: sizes,
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

    const handleRefresh = () => {
        // Logic to refresh the page or reset filters
        window.location.reload(); // Simple page reload
    };

    return (
        <div className="container">
            <header>
                <div className="logo-container">
                    <img src="/logo-v2.svg" alt="Logo" className="logo" />
                    <svg className="hand-draw-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 42" fill="none">
                        <path id="hand-draw-3" d="M3.41887 5.43182C3.50841 4.75438 5.77424 4.41915 6.22832 4.3229C8.79917 3.77794 11.6875 3.14567 14.3337 3.24386C18.3182 3.39171 17.529 8.64528 16.5177 11.094C15.9499 12.469 14.6086 15.958 12.7971 16.1843C11.6503 16.3276 14.013 15.7491 14.2525 15.7047C16.6198 15.2657 18.9586 15.5648 21.2053 16.4528C22.6044 17.0057 24.3851 17.7341 25.4167 18.8851C25.9153 19.4414 26.0603 20.2486 26.2573 20.943C26.6326 22.2655 26.7256 23.5774 26.8451 24.943C27.0061 26.7839 26.3929 28.1695 25.6053 29.7987C24.1627 32.7826 21.9368 36.2603 18.7523 37.5411C17.0885 38.2102 15.4409 38.653 13.681 38.9712C12.5936 39.1678 11.89 39.3552 11.0706 38.5302" stroke="#0000FF" strokeWidth="5" strokeLinecap="round"/>
                    </svg>
                </div>
                <SearchForm onSearch={handleSearch} onRefresh={handleRefresh} />
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
