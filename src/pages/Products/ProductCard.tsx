import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/buttons/TButton';
import TButton from '../../components/buttons/TButton';

interface ProductCardProps {
    product: {
        _id: string;
        title: string;
        author: string;
        price: number;
        category: string;
        image: string; // Add image URL
        rating: number; // Add rating
        description: string; // Add description
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:rotate-3d hover:scale-105 overflow-hidden">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm font-semibold">
                    ⭐ {product.rating}
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col">
                <h2 className="text-xl font-bold text-text mb-2">{product.title}</h2>
                <p className="text-text-accent mb-1">
                    <strong>Author:</strong> {product.author}
                </p>
                <p className="text-text-accent mb-1">
                    <strong>Category:</strong> {product.category}
                </p>
                <p className="text-text-accent mb-4">
                    <strong>Price:</strong> ${product.price}
                </p>

                {/* Description (Truncated) */}
                <p className="text-text-accent text-sm mb-4 line-clamp-3">
                    {product.description}
                </p>

                {/* View Details Button */}
                <div className="mt-auto">
                    <TButton
                        text="View Details"
                        onClick={() => navigate(`/products/${product._id}`)}
                        primaryColor="primary"
                        accentColor="primary-fade"
                    />
                </div>
            </div>
        </div>

    );
};

export default ProductCard;