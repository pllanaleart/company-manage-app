import "./ProductsTable.css";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";
import ProductRegisterModal from "./ProductRegisterModal";
import toastr from "toastr";
import DeleteIcon from "../../svg/delete-icon2.svg";
import EditIcon from "../../svg/edit-icon2.svg";
import LeftArrow from "../../svg/left-arrow.svg";
import RightArrow from "../../svg/right-arrow.svg";

function ProductsTable({ useRefetchData, searchedProduct }) {
  const [paginationInfo, setPaginationInfo] = useState({
    pageNo: 0,
    pageSize: 6,
    last: false,
  });
  const [openUpdateModal, setUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState("");
  const { isLoading, error, data, refetch } = useQuery("products", () =>
    fetch(
      `http://localhost:8080/products?page=${paginationInfo.pageNo}&limit=${paginationInfo.pageSize}&sortBy=id&sortDir=dsc`
    ).then((res) => res.json())
  );
  const deleteMutation = useMutation((deleteId) => {
    fetch(`http://localhost:8080/products/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  });

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };
  const setTrueUpdateModal = () => {
    setUpdateModal(true);
  };
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
  const handleDelete = async (deleteId) => {
    try {
      await deleteMutation.mutateAsync(deleteId);
      if (deleteMutation.isSuccess) {
        toastr.success(`Product widh id ${deleteId} is deleted successfully`);
        console.log("deleted success");
      }
    } catch (error) {
      toastr.error(error);
    }
  };

  const handleUpdate = (product) => {
    setTrueUpdateModal();
    setProductToUpdate(product);
  };
  useEffect(() => {
    refetch();
  }, [paginationInfo, useRefetchData, deleteMutation]);
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
          {searchedProduct === "" && data ? (
            data.content.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.barcodeNumber}</td>
                  <td>{product.mrp}</td>
                  <td>{product.price}</td>
                  <td>
                    <img
                      src={EditIcon}
                      alt="edit icon"
                      onClick={() => handleUpdate(product)}
                    />
                    <img
                      src={DeleteIcon}
                      alt="del icon"
                      onClick={() => handleDelete(product.id)}
                    />
                  </td>
                </tr>
              );
            })
          ) : searchedProduct !== "" ? ( // Check if searchedProduct is defined
            <tr key={searchedProduct.id}>
              <td>{searchedProduct.name}</td>
              <td>{searchedProduct.description}</td>
              <td>{searchedProduct.barcodeNumber}</td>
              <td>{searchedProduct.mrp}</td>
              <td>{searchedProduct.price}</td>
              <td>
                <img
                  src={EditIcon}
                  alt="edit icon"
                  onClick={() => handleUpdate(searchedProduct)}
                />
                <img
                  src={DeleteIcon}
                  alt="del icon"
                  onClick={() => handleDelete(searchedProduct.id)}
                />
              </td>
            </tr>
          ) : null}
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
      <ProductRegisterModal
        isOpen={openUpdateModal}
        handleClose={closeUpdateModal}
        useRefetchData={refetch}
        updateProduct={productToUpdate}
      />
    </div>
  );
}
export default ProductsTable;
