import { useEffect, useState } from 'react';
import '../app/globals.css';
import Header from '../components/header';
import axios from 'axios';

export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products');
                setProducts(response.data); 
                setLoading(false);
            } catch {
                setError('Failed to load products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    return (
        <div>
            <Header />
            <div className="p-20">
                {loading && <p>Loading products...</p>} 
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                                <a>
                                    <div className="flex justify-center items-center h-80 w-80 mx-auto">
                                        <img className="rounded-t-lg object-contain max-h-full max-w-full" src={product.img} alt={product.id} />
                                    </div>
                                </a>
                                <div className="p-5">
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {product.describe}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}
