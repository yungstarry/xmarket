import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import { db, storage } from "../../../firebase/config";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { selectProducts } from "../../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "",
  imageURL: "",
  price: "",
  category: "",
  brand: "",
  desc: "",
};

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, 
        {...initialState}, productEdit)
        return newState
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const { name, imageURL, price, category, brand, desc } = product;


  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    } else return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const storageRef = ref(storage, `Xmarket/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const docRef = addDoc(collection(db, "product"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsloading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfuly.");
    } catch (error) {
      setIsloading(false);
      toast.error(error.message);
    }
  };

  

const editproduct = async(e) => {
      e.preventDefault();
      setIsloading(true);

if (product.imageURL !== productEdit.imageURL){
     const storageRef = ref(storage, productEdit.imageURL);
     await deleteObject(storageRef);
}
  try {
    await setDoc(doc(db, "product", id), {
      name: product.name,
      imageURL: product.imageURL,
      price: Number(product.price),
      category: product.category,
      brand: product.brand,
      desc: product.desc,
      createdAt: productEdit.createdAt,
      editedAt: Timestamp.now().toDate(),
    });
    setIsloading(false);
    toast.success("Updated sucessfully");
    navigate("/admin/all-products");
  } catch (error) {
    setIsloading(false);
    toast.error(error.message);
  }
    };


  return (
    <>
      {isloading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editproduct)}>
            <label> Product name: </label>
            <input
              type="text"
              placeholder="Product Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <label> Product image: </label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                required
                name="image"
                // value={imageURL}
                onChange={handleImageChange}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  required
                  name="imageURL"
                  disabled
                  value={imageURL}
                />
              )}
            </Card>
            <label> Product price: </label>
            <input
              type="number"
              placeholder="Product price"
              required
              name="price"
              value={price}
              onChange={handleInputChange}
            />
            <label> Product Category: </label>
            <select
              required
              name="category"
              value={category}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                --Choose Product Category--
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <label> Product Brand: </label>
            <input
              type="text"
              placeholder="Product brand"
              required
              name="brand"
              value={brand}
              onChange={handleInputChange}
            />
            <label> Product description: </label>
            <textarea
              name="desc"
              cols="30"
              rows="10"
              value={desc}
              onChange={handleInputChange}
              required
            ></textarea>

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
