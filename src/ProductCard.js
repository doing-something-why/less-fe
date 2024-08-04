import React from 'react';

const ProductCard = ({ product }) => {
    const isVestiaire = Boolean(product.brand && product.brand.name);
    const getProductImage = () => {
        if (isVestiaire) {
            return product.pictures && product.pictures.length > 0
                ? `https://images.vestiairecollective.com/images/resized/w=480,q=75,f=auto,${product.pictures[0]}`
                : 'default-image.jpg';
        }
        return product.photo ? product.photo.url : 'default-image.jpg';
    };

    const getProductPrice = () => {
        if (isVestiaire) {
            return product.price && product.price.cents && product.price.currency
                ? `${Math.round(parseInt(product.price.cents, 10) / 100)} ${product.price.currency}`
                : 'N/A';
        }
        return product.price ? `${Math.round(product.price)} ${product.currency}` : 'N/A';
    };

    const getProductDescription = () => {
        if (isVestiaire) {
            return product.description ? product.name : 'No name available';
        }
        return product.title ? product.title : 'No name available';
    };

    const getProductBrand = () => {
        if (isVestiaire) {
            return product.brand && product.brand.name ? product.brand.name : 'Unknown Brand';
        }
        return product.brand_title ? product.brand_title : 'Unknown Brand';
    };

    const getProductSize = () => {
        if (isVestiaire) {
            return product.size && product.size.label ? product.size.label : 'Unknown Size';
        }
        return product.size_title ? product.size_title : 'Unknown Size';
    };

    const getProductLink = () => {
        if (isVestiaire) {
            return product.link ? `https://www.vestiairecollective.com${product.link}` : '#';
        }
        return product.url ? product.url : '#';
    };

    const getPlatformLogo = () => {
        return isVestiaire
            ? 'https://uploads-ssl.webflow.com/666b15a55a26ad71221e8e13/666e9e119c5082dae41c664f_vestiaire%20logo.png'
            : 'https://uploads-ssl.webflow.com/666b15a55a26ad71221e8e13/666e9e11d0c8bbf461c51a1e_vinted%20logo.png';
    };

    return (
        <a href={getProductLink()} className="product-card-wrapper">
            <div className="product-card">
                <div className="card-image-wrapper">
                    <img
                        loading="lazy"
                        src={getProductImage()}
                        alt={`${getProductBrand()} ${getProductDescription()}`}
                        className="card-image"
                    />
                    <div className="product-price">
                        <span>{getProductPrice()}</span>
                    </div>
                </div>
                <div className="card-text-wrapper">
                    <div className="card-title-wrapper">
                        <div className="product-brand">{getProductBrand()}</div>
                        <img src={getPlatformLogo()} alt="" className="card-platform-logo" />
                    </div>
                    <div className="product-size">{getProductSize()}</div>
                    <div className="product-description">{getProductDescription()}</div>
                    {product.country && isVestiaire && (
                        <div className="product-country">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.875 7.0835C14.875 12.0418 8.5 16.2918 8.5 16.2918C8.5 16.2918 2.125 12.0418 2.125 7.0835C2.125 5.39274 2.79665 3.77123 3.99219 2.57569C5.18774 1.38015 6.80924 0.708496 8.5 0.708496C10.1908 0.708496 11.8123 1.38015 13.0078 2.57569C14.2033 3.77123 14.875 5.39274 14.875 7.0835Z"
                                    stroke="#000000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.5 9.2085C9.6736 9.2085 10.625 8.2571 10.625 7.0835C10.625 5.90989 9.6736 4.9585 8.5 4.9585C7.32639 4.9585 6.375 5.90989 6.375 7.0835C6.375 8.2571 7.32639 9.2085 8.5 9.2085Z"
                                    stroke="#202020"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>{product.country}</span>
                        </div>
                    )}
                    {product.condition && (
                        <div className="product-condition">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.5839 9.49859L9.50518 14.5773C9.37361 14.7091 9.21737 14.8135 9.04539 14.8848C8.87341 14.9561 8.68906 14.9928 8.50289 14.9928C8.31672 14.9928 8.13237 14.9561 7.96039 14.8848C7.78841 14.8135 7.63217 14.7091 7.5006 14.5773L1.41602 8.49984V1.4165H8.49935L14.5839 7.50109C14.8478 7.76652 14.9959 8.12557 14.9959 8.49984C14.9959 8.8741 14.8478 9.23316 14.5839 9.49859Z"
                                    stroke="#202020"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M4.95898 4.9585H4.96695" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{isVestiaire ? product.condition.name : product.status}</span>
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
};

export default ProductCard;