import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import './Home.css'; // Importing the external CSS file

const filterOptions = [
  "RECOMMENDED",
  "NEWEST FIRST",
  "POPULAR",
  "PRICE : HIGH TO LOW",
  "PRICE : LOW TO HIGH",
];

const additionalFilters = {
  Segment: ["Casual", "Formal", "Sports"],
  RawMaterials: ["Cotton", "Polyester", "Wool"],
  SuitableFor: ["Summer", "Winter", "All Seasons"],
  Pattern: ["Solid", "Striped", "Checked"],
  Occasion: ["Party", "Office", "Wedding", "Casual"],
  Work: ["Embroidered", "Printed", "Woven"],
  Fabrics: ["Denim", "Silk", "Linen", "Rayon"],
};

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("RECOMMENDED");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [customizable, setCustomizable] = useState(false);
  const [selectedIdealFor, setSelectedIdealFor] = useState([]);
  const [selectedAdvancedFilters, setSelectedAdvancedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({
    "Ideal For": true,
    ...Object.keys(additionalFilters).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {}),
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const sortProducts = (products, filter) => {
    switch (filter) {
      case "PRICE : HIGH TO LOW":
        return [...products].sort((a, b) => b.price - a.price);
      case "PRICE : LOW TO HIGH":
        return [...products].sort((a, b) => a.price - b.price);
      case "POPULAR":
        return [...products].sort((a, b) => b.rating?.rate - a.rating?.rate);
      default:
        return products;
    }
  };

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleIdealForChange = (value) => {
    setSelectedIdealFor((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleAdvancedFilterChange = (filter, option) => {
    setSelectedAdvancedFilters((prev) => {
      const updated = { ...prev };
      if (!updated[filter]) updated[filter] = [];
      if (updated[filter].includes(option)) {
        updated[filter] = updated[filter].filter((o) => o !== option);
        if (updated[filter].length === 0) delete updated[filter];
      } else {
        updated[filter].push(option);
      }
      return updated;
    });
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const applyAdvancedFilters = (products) => {
    if (Object.keys(selectedAdvancedFilters).length === 0) return products;
    return products.filter((product) =>
      Object.entries(selectedAdvancedFilters).every(([key, values]) =>
        values.some((v) =>
          product.title.toLowerCase().includes(v.toLowerCase())
  )
)
);
};

const applyIdealForFilter = (products) => {
if (selectedIdealFor.length === 0) return products;
return products.filter((product) =>
selectedIdealFor.includes(product.category)
);
};

const filteredProducts = sortProducts(
customizable
? applyAdvancedFilters(applyIdealForFilter(products))
: applyAdvancedFilters(products),
selectedFilter
);

return (
<div className="home-container mx-7">
<div className="text-center m-14">
  <h1 className="text-3xl font-bold mb-4">DISCOVER OUR PRODUCTS</h1>
  <p className="text-gray-600">
    Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
    <br />
    scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
    dolor.
  </p>
</div>

<div className="flex flex-wrap justify-between items-center border-t border-b border-gray-300 py-7 gap-4 mb-6">
  <div className="flex space-x-15">
    <span className="text-gray-800 font-semibold hidden md:block">
      {filteredProducts.length} ITEMS
    </span>
    <button
      onClick={() => setShowFilter(!showFilter)}
      className="text-gray-600 hover:text-gray-800 flex items-center gap-10 text-sm underline"
    >
      <span className="md:block hidden">{showFilter ? "< HIDE FILTER" : "> SHOW FILTER"}</span>
      <span className="md:hidden block">FILTER</span>
    </button>
  </div>

  <div className="relative">
    <div
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="cursor-pointer text-gray-800 font-semibold flex items-center gap-2 text-sm"
    >
      {selectedFilter} <i className="fas fa-chevron-down"></i>
    </div>

    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelectedFilter(option);
              setDropdownOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              selectedFilter === option
                ? "font-bold text-black"
                : "text-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
</div>

<div className="flex flex-col lg:flex-row min-h-screen">
  {showFilter && (
    <div className="filter-container w-full md:w-72 bg-white p-4 overflow-auto shadow-lg z-20 gap-3">
      <div className="mb-4">
        <input
          type="checkbox"
          id="customizable"
          className="mr-2"
          checked={customizable}
          onChange={() => setCustomizable(!customizable)}
        />
        <label htmlFor="customizable" className="font-semibold">
          CUSTOMIZABLE
        </label>
      </div>

      <div className="mb-4 border-y border-gray-400 py-2">
        <div className="flex flex-col gap-3 ">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("Ideal For")}
          >
            <span className="font-semibold">IDEAL FOR</span>
            <GoChevronDown
              className={`transition-transform duration-200 ${
                openSections["Ideal For"] ? "rotate-180" : ""
              }`}
            />
          </div>
          <p>All</p>
        </div>

        {openSections["Ideal For"] && (
          <div className="mt-2">
            <p
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() => setSelectedIdealFor([])}
            >
              Unselect all
            </p>
            <div className="mt-2 space-y-2">
              {[
                "men's clothing",
                "women's clothing",
                "jewelery",
                "electronics",
              ].map((option) => (
                <div className="flex items-center" key={option}>
                  <input
                    type="checkbox"
                    id={option}
                    className="mr-2"
                    checked={selectedIdealFor.includes(option)}
                    onChange={() => handleIdealForChange(option)}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {Object.entries(additionalFilters).map(([key, options]) => (
        <div key={key} className="mb-4 border-b border-gray-400 py-3">
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(key)}
            >
              <span className="font-semibold">{key}</span>
              <GoChevronDown
                className={`transition-transform duration-200 ${
                  openSections[key] ? "rotate-180" : ""
                }`}
              />
            </div>
            <p>All</p>
          </div>
          {openSections[key] && (
            <div className="mt-2 space-y-2">
              {options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={
                      selectedAdvancedFilters[key]?.includes(option) ||
                      false
                    }
                    onChange={() =>
                      handleAdvancedFilterChange(key, option)
                    }
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )}

  <div
    className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ${
      showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
    } gap-6 p-4 flex-1`}
  >
    {loading ? (
      <p>Loading products...</p>
    ) : filteredProducts.length === 0 ? (
      <p>No products found.</p>
    ) : (
      filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-sm relative hover:shadow-md transition w-full p-4 flex flex-col justify-between"
        >
          <button
            onClick={() => toggleLike(product.id)}
            className={`absolute bottom-3 right-3 text-xl ${
              likedItems.includes(product.id)
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            <i
              className={
                likedItems.includes(product.id)
                  ? "fas fa-heart"
                  : "far fa-heart"
              }
            />
          </button>

          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-full object-contain mb-4"
          />

          <div className="font-semibold text-gray-800 line-clamp-2">
            {product.title}
          </div>
          <div className="mt-2 text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>
        </div>
      ))
    )}
  </div>
</div>

<Footer />
</div>
);
};

export default Home;