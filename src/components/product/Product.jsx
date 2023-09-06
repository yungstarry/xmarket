import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import { ProductFilter, ProductList } from "./index";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/slice/productSlice";
import Loader from "../loader/Loader";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isloading } = useFetchCollection("product");
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);
  
  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isloading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isloading ? <Loader /> : <ProductList products={products} />}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : " Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
