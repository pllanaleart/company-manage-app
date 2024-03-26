import "./ProductsTable.css";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import DeleteIcon from "../../svg/delete-icon2.svg";
import EditIcon from "../../svg/edit-icon2.svg";
import LeftArrow from "../../svg/left-arrow.svg";
import RightArrow from "../../svg/right-arrow.svg";

function ProductsTable() {
  const [paginationInfo, setPaginationInfo] = useState({
    pageNo: 0,
    pageSize: 6,
    last: false,
  });

  const { isLoading, error, data, refetch } = useQuery("products", () =>
    fetch(
      `http://localhost:8080/products?page=${paginationInfo.pageNo}&limit=${paginationInfo.pageSize}&sortBy=id&sortDir=dsc`
    ).then((res) => res.json())
  );

  function handlePagination(arrow) {
    setPaginationInfo((prevPaginationInfo) => {
      const tempPagination = { ...prevPaginationInfo }; // Use the previous state
      if (arrow === "left") {
        tempPagination.pageNo = prevPaginationInfo.pageNo - 1;
      } else if (arrow === "right") {
        tempPagination.pageNo = prevPaginationInfo.pageNo + 1;
      }
      return tempPagination; // Return the updated state
    });
  }

  useEffect(() => {
    console.log(paginationInfo.pageNo);

    refetch();
  }, [paginationInfo]);
  return (
    <div id="table-container">
      <table>
        <thead>
          <tr className="product-table-header">
            <th>Name</th>
            <th>Description</th>
            <th>Barcode Number</th>
            <th>Mrp</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.content.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.barcodeNumber}</td>
                  <td>{product.mrp}</td>
                  <td>{product.price}</td>
                  <td>
                    <img src={EditIcon} alt="edit icon" />
                    <img src={DeleteIcon} alt="del icon" />
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className="product-table-pagination-container">
                <img
                  src={LeftArrow}
                  alt="left icon"
                  className={`products-table-arrows ${
                    paginationInfo.pageNo === 0 ? "hidden" : ""
                  }`}
                  onClick={() => handlePagination("left")}
                />
                <span className="products-table-pageNo">
                  {paginationInfo.pageNo + 1}
                </span>
                <img
                  src={RightArrow}
                  alt="right icon"
                  className={`products-table-arrows ${
                    data && data.last ? "hidden" : ""
                  }`}
                  onClick={() => handlePagination("right")}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
export default ProductsTable;
