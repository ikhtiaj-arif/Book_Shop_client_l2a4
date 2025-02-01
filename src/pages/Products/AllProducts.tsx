import { Card, Col, Input, Row, Select, Skeleton, Slider } from 'antd';

import React, { useState } from 'react';
import ServiceHeader from '../../components/ServiceHeader';
import { useGetAllProductsQuery } from '../../redux/features/products/products.api';
import { IProduct } from '../../types/types';
import BookStoreFooter from '../Footer';
import ProductCard from './ProductCard';


const { Search } = Input;
const { Option } = Select;
// const { Title } = Typography;



const AllProducts: React.FC = () => {
    const { data: allProductData, isLoading } = useGetAllProductsQuery(undefined);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(undefined);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);



    const products: IProduct[] = allProductData?.data || [];
    const categories = Array.from(new Set(products.map((p) => p.category)));
    const authors = Array.from(new Set(products.map((p) => p.author)));

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesAuthor = selectedAuthor ? product.author === selectedAuthor : true;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesAuthor && matchesPrice;
    });

    if (isLoading) {
        return (
            <div className="bg-background rounded-lg p-2  md:p-4 min-h-screen ">
                {/* Header Section */}
                <ServiceHeader title="All Products" text="Discover and filter the books you love." />
                <Row gutter={[24, 24]} justify="center" >
                    {[...Array(6)].map((_, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <Card
                                className="custom-card"
                                style={{
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                cover={<Skeleton.Image style={{ width: "100%", height: "220px" }} />}
                            >
                                <Skeleton active />
                            </Card>
                        </Col>
                    ))}
                </Row>

            </div>
        );
    }

    return (
        <div className="bg-background">
            <div className="bg-background rounded-lg p-2 md:p-4 min-h-screen ">
                {/* Header Section */}
                <ServiceHeader title="All Products" text="Discover and filter the books you love." />

                {/* Search and Filters */}
                <div className="max-w-6xl  mx-auto grid gap-4 grid-cols-1 md:grid-cols-4 mb-8">
                    <Search
                        placeholder="Search by title, author, or category"
                        allowClear
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="col-span-1 shadow-md bg-white rounded-md px-3 py-2 text-text"
                    />
                    <Select
                        placeholder="Filter by category"
                        allowClear
                        onChange={(value) => setSelectedCategory(value)}
                        className="shadow-md bg-white rounded-md px-3 py-2 h-12 text-text w-full" /* Added h-12 */
                    >
                        {categories.map((category) => (
                            <Option key={category} value={category}>
                                {category}
                            </Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Filter by author"
                        allowClear
                        onChange={(value) => setSelectedAuthor(value)}
                        className="shadow-md bg-white rounded-md px-3 py-2 h-12 text-text w-full"
                    >
                        {authors.map((author) => (
                            <Option key={author} value={author}>
                                {author}
                            </Option>
                        ))}
                    </Select>
                    <div className="col-span-1 flex items-center gap-4 bg-white rounded-md shadow-md px-3 py-2 h-12">
                        <label className="text-text font-medium text-sm">Price:</label>
                        <span className="text-sm text-text-accent font-medium">${priceRange[0]}</span>
                        <Slider
                            range
                            max={200}
                            defaultValue={[0, 200]}
                            onChange={(value) => setPriceRange(value as [number, number])}
                            className="w-full custom-slider"
                        />
                        <span className="text-sm text-text-accent font-medium">${priceRange[1]}</span>
                    </div>
                </div>


                {/* Product Cards */}
                <div className="max-w-6xl  mx-auto pb-24 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
            <BookStoreFooter />
        </div>
    );
};

export default AllProducts;
