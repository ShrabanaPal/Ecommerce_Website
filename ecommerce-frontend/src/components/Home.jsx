import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = () => {
  const { data, isError, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/products"
          );
          setProducts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [data]);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Something went wrong...
      </h2>
    );
  }

  return (
    <>
      <div
        className="grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          padding: "2rem",
          marginTop:"50px"
        }}
      >
        {products.map((product) => (
          <div
            className="card"
            key={product.id}
            style={{
              width: "20rem",
              height: "18rem",
              backgroundColor: "#d0f0ff", // very light blue
             boxShadow: "rgba(0, 123, 255, 0.3) 0px 2px 4px",
              borderRadius: "10px",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <h5
                    className="card-title"
                    style={{ marginBottom: "8px", fontWeight: "600" }}
                  >
                    {product.name.toUpperCase()}
                  </h5>
                  <span
                    className="card-brand"
                    style={{ fontSize: "0.9rem", fontStyle: "italic" }}
                  >
                    by {product.brand}
                  </span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <h5
                    className="card-text"
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    ₹{product.price}
                  </h5>
                  <button
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
