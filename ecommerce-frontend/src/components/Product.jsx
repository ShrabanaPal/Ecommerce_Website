import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <h2 style={{ padding: "10rem", textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e6f7ff",
      }}
    >
      <div
        className="container"
        style={{
          border: "2px solid black",
          padding: "2rem",
          gap: "20px",
          width: "40vw",
          borderRadius: "10px",
          backgroundColor: "#f0f8ff",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.9rem", color: "#666" }}>{product.category}</span>
          <h1 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>{product.name}</h1>
          <h5 style={{ fontStyle: "italic", color: "#888" }}>{product.brand}</h5>
          <p style={{ marginTop: "1rem", lineHeight: "1.5rem" }}>{product.description}</p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
            ₹{product.price}
          </span>
          <br />
          <button
            style={{
              marginTop: "1rem",
              padding: "10px 20px",
              backgroundColor: product.productAvailable ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: product.productAvailable ? "pointer" : "not-allowed",
            }}
            disabled={!product.productAvailable}
          >
            {product.productAvailable ? "Add to cart" : "Out of Stock"}
          </button>
          <h6 style={{ marginTop: "1rem" }}>
            Stock Available:{" "}
            <i style={{ color: "green", fontWeight: "bold" }}>{product.stockQuantity}</i>
          </h6>
          <h6 style={{ marginTop: "0.5rem" }}>
            Product listed on: <i>{product.releaseDate}</i>
          </h6>
        </div>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            style={{
              backgroundColor: "#0d6efd",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            type="button"
          >
            Update
          </button>
          <button
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
