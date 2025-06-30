import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { createProduct } from "../../services/productServices";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { errorUtil } from "../../utils/errorUtil";

const CreateProductForm = ({ isDialogOpen, toggleDialog }) => {
  const { user } = useContext(UserContext);
  const [createProductDetails, setCreateProductDetails] = useState({
    productName: "",
    productCategory: "Tops",
    productDescription: "",
    productDisplayPhoto: "",
    productDefaultDeliveryTime: "",
    // productOwner: user._id,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Jacob: prev details needed here to ensure existing changes are not overriden
    setCreateProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      toast.info("Creating new product...");

      //   const formData = new FormData(createProductDetails);
      //   const data = Object.fromEntries(createProductDetails);
      await createProduct(createProductDetails);
      //   navigate(PATHS.PUBLIC.USER_SHOP(user.username));
      toast.success(`Welcome, ${user.username}`);
    } catch (err) {
      errorUtil(err);
    }
  };

  if (!isDialogOpen) {
    return null;
  }
  return (
    <>
      <dialog open>
        <Box
          component="form"
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          // className={styles["form-field"]}
        >
          Create a new product!
          <input name="productName" type="text" placeholder="Product Name" />
          <select name="productCategory">
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Headwear">Headwear</option>
            <option value="Bags">Bags</option>
            <option value="Accesories">Accessories</option>
            <option value="Misc">Misc</option>
          </select>
          <input
            name="productDescription"
            type="text"
            placeholder="Product Description"
          />
          <input
            name="productDisplayPhoto"
            type="text"
            placeholder="Product Image"
          />
          <input
            name="productDefaultDeliveryTime"
            type="text"
            placeholder="Delivery Time"
          />
          {/* Jacob: Button type for closing dialog box is set to submit for stylistic purposes at the moment, to be 100% accurate, should change to justfy-centre */}
          <Button type="submit" onClick={toggleDialog}>
            Changed My Mind
          </Button>
          <Button type="submit">Create Product</Button>
        </Box>
      </dialog>
    </>
  );
};
export { CreateProductForm };
