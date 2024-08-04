import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // Ensure you import the CSS file

const SearchForm = ({ onSearch, onRefresh }) => {
    const [searchStr, setSearchStr] = useState('');
    const [country, setCountry] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
    const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
    const colors = ['Black', 'White', 'Beige', 'Red', 'Blue', 'Green']; // Example color options
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']; // Example size options
    const colorDropdownRef = useRef(null);
    const sizeDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target)) {
                setIsColorDropdownOpen(false);
            }
            if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
                setIsSizeDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchStr && country) {
            onSearch(searchStr, country, selectedColors, selectedSizes);
        }
    };

    const handleColorSelect = (color) => {
        setSelectedColors((prevSelectedColors) =>
            prevSelectedColors.includes(color)
                ? prevSelectedColors.filter((c) => c !== color)
                : [...prevSelectedColors, color]
        );
    };

    const handleSizeSelect = (size) => {
        setSelectedSizes((prevSelectedSizes) =>
            prevSelectedSizes.includes(size)
                ? prevSelectedSizes.filter((s) => s !== size)
                : [...prevSelectedSizes, size]
        );
    };

    const handleColorRemove = (color) => {
        setSelectedColors((prevSelectedColors) => prevSelectedColors.filter((c) => c !== color));
    };

    const handleSizeRemove = (size) => {
        setSelectedSizes((prevSelectedSizes) => prevSelectedSizes.filter((s) => s !== size));
    };

    return (
        <form id="searchForm" onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
            <div className="search-input-wrapper">
                <img src="/search-icon.png" alt="Search" className="search-icon" />
                <input
                    type="text"
                    id="search-str"
                    value={searchStr}
                    onChange={(e) => setSearchStr(e.target.value)}
                    placeholder="Paste product link or search"
                    className="search-input"
                />
            </div>
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
            <div className="filter-wrapper">
                <div className="color-filter" ref={colorDropdownRef}>
                    <button
                        type="button"
                        className="color-dropdown"
                        onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                    >
                        Color <img src="/chevron-down.png" alt="Chevron" className="chevron-icon" />
                    </button>
                    {isColorDropdownOpen && (
                        <div className="color-options">
                            {colors.map((color) => (
                                <div key={color} className="color-option">
                                    <input
                                        type="checkbox"
                                        id={`color-${color}`}
                                        checked={selectedColors.includes(color)}
                                        onChange={() => handleColorSelect(color)}
                                    />
                                    <label htmlFor={`color-${color}`}>{color}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="size-filter" ref={sizeDropdownRef}>
                    <button
                        type="button"
                        className="size-dropdown"
                        onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                    >
                        Size <img src="/chevron-down.png" alt="Chevron" className="chevron-icon" />
                    </button>
                    {isSizeDropdownOpen && (
                        <div className="size-options">
                            {sizes.map((size) => (
                                <div key={size} className="size-option">
                                    <input
                                        type="checkbox"
                                        id={`size-${size}`}
                                        checked={selectedSizes.includes(size)}
                                        onChange={() => handleSizeSelect(size)}
                                    />
                                    <label htmlFor={`size-${size}`}>{size}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button type="button" className="refresh-button" onClick={onRefresh}>
                    Refresh
                </button>
            </div>
            <div className="selected-filters">
                {selectedColors.map((color) => (
                    <div key={color} className="selected-filter">
                        {color}
                        <img src="/cross.png" alt="Remove" className="remove-icon" onClick={() => handleColorRemove(color)} />
                    </div>
                ))}
                {selectedSizes.map((size) => (
                    <div key={size} className="selected-filter">
                        {size}
                        <img src="/cross.png" alt="Remove" className="remove-icon" onClick={() => handleSizeRemove(size)} />
                    </div>
                ))}
            </div>
        </form>
    );
};

export default SearchForm;