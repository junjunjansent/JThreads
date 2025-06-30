import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Box, Button } from "@mui/material";

const CreateProductForm = ({ isDialogOpen, toggleDialog }) => {
  const { user } = useContext(UserContext);
  const [, setCreateProductDetails] = useState({
    productName: "",
    productCategory: "Tops",
    productDescription: "",
    productOwner: user._id,
    productDisplayPhoto: "",
    productDefaultDeliveryTime: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Jacob: prev details needed here to ensure existing changes are not overriden
    setCreateProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  if (!isDialogOpen) {
    return null;
  }
  return (
    <>
      <dialog open>
        <Box
          component="form"
          //   onSubmit={handleSubmit}
          onChange={handleInputChange}
          //   className={styles["form-field"]}
        >
          Create a new product!
          <form>
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
          </form>
          <Button onClick={toggleDialog}>Close Dialog</Button>
          <Button>Create Product</Button>
        </Box>
      </dialog>
    </>
  );
};
export { CreateProductForm };
