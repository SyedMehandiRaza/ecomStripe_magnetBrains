import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://interveiw-mock-api.vercel.app/api/getProducts");
      const result = await response.json();
      if (result.status === "success") {
        setProducts(result.data.slice(0, 9)); // Limit to max 9 products
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.product.variants[0]?.price || 0;
    const priceB = b.product.variants[0]?.price || 0;
    if (sortOption === 'low-to-high') return priceA - priceB;
    if (sortOption === 'high-to-low') return priceB - priceA;
    return 0;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mt-4">
        
      <header className="d-flex justify-content-between align-items-center p-3">
        <h1 className="fs-4 fs-sm-2">All Collection</h1>
        <select className="form-select w-25 w-sm-100 form-select-sm" onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </header>

      <div className="row">
        {sortedProducts.map((product, index) => (
          <div key={index} className="col-md-4 col-6 mb-3 product-card">
            <div className="card p-3">
              <img
                src={product.product.image?.src || 'placeholder.jpg'}
                alt={product.product.title}
                className="card-img-top mb-3"
                style={{ height: '200px' }}
              />
              <h5 className="text-secondary product-title">
                {product.product.title}
              </h5>
              <p className="fw-bold">Rs. {product.product.variants[0]?.price || 'N/A'}</p>
              <button
                className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                onClick={() => handleAddToCart(product)}
              >
                <i className="fas fa-shopping-cart me-2"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
















// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [sortOption, setSortOption] = useState('');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("https://interveiw-mock-api.vercel.app/api/getProducts");
//       const result = await response.json();
//       if (result.status === "success") {
//         setProducts(result.data.slice(0, 9)); // Limit to max 9 products
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleSort = (e) => {
//     setSortOption(e.target.value);
//   };

//   const sortedProducts = [...products].sort((a, b) => {
//     const priceA = a.product.variants[0]?.price || 0;
//     const priceB = b.product.variants[0]?.price || 0;
//     if (sortOption === 'low-to-high') return priceA - priceB;
//     if (sortOption === 'high-to-low') return priceB - priceA;
//     return 0;
//   });

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };

//   return (
//     <div className="container mt-4">
//       <header className="d-flex justify-content-between align-items-center p-3">
//         <h1 className="fs-4 fs-sm-2">All Collection</h1>
//         <select className="form-select w-25 w-sm-100 form-select-sm" onChange={handleSort}>
//           <option value="">Sort By</option>
//           <option value="low-to-high">Price: Low to High</option>
//           <option value="high-to-low">Price: High to Low</option>
//         </select>
//       </header>

//       <div className="row">
//         {sortedProducts.map((product, index) => (
//           <div key={index} className="col-md-4 col-6 mb-3 product-card">
//             <div className="card p-3">
//               <img
//                 src={product.product.image?.src || 'placeholder.jpg'}
//                 alt={product.product.title}
//                 className="card-img-top mb-3"
//                 style={{ height: '200px' }}
//               />
//               <h5 className="text-secondary product-title">
//                 {product.product.title}
//               </h5>
//               <p className="fw-bold">Rs. {product.product.variants[0]?.price || 'N/A'}</p>
//               <button
//                 className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
//                 onClick={() => handleAddToCart(product)}
//               >
//                 <i className="fas fa-shopping-cart me-2"></i> Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
