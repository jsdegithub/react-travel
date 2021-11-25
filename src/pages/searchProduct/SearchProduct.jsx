import styles from "./SearchProduct.module.css";
import React, { useEffect } from "react";
import { Spin } from "antd";
import { useParams } from "react-router";
import { searchProduct } from "../../redux/reducer/searchProduct/slice";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout/MainLayout";
import { FilterArea, SearchProductList } from "../../components";

export const SearchProduct = () => {
  const loading = useSelector((state) => state.searchProduct.loading);
  const error = useSelector((state) => state.searchProduct.error);
  const searchProductList = useSelector((state) => state.searchProduct.searchProductList);
  const pagination = useSelector((state) => state.searchProduct.pagination);
  const { keyword } = useParams();

  const dispatch = useDispatch();

  console.log("loading: ", loading);
  console.log("searchProductList: ", searchProductList);
  console.log("pagination: ", pagination);

  const handlePageChange = (pageNumber, pageSize) => {
    dispatch(searchProduct({ pageNumber, pageSize, keyword }));
  };

  useEffect(() => {
    dispatch(
      searchProduct({
        pageNumber: 1,
        pageSize: 6,
        keyword,
      })
    );
  }, [keyword]);

  if (loading) {
    return (
      <Spin
        size={"large"}
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>SearchProduct-State-Error: {error}</div>;
  }

  return (
    <MainLayout>
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>
      <div className={styles["product-list-container"]}>
        <SearchProductList
          searchProductList={searchProductList}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </MainLayout>
  );
};

export default SearchProduct;
