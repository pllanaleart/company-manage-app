import "./Products.css";
import { useState } from "react";
import ProductsTable from "../components/products/ProductsTable";
import ProductSearch from "../components/products/ProductSearch";

function Products() {
  const [refetchData, setRefetchdata] = useState("");

  const handleRefetch = (data) => {
    setRefetchdata(data);
  };

  return (
    <div id="products-container">
      <ProductSearch askRefetchData={handleRefetch} />
      <ProductsTable useRefetchData={refetchData} />
    </div>
  );
}

export default Products;
