import { useState } from "react";
// import { useNavigate } from "react-router";
// import { PATHS } from "../../routes/PATHS";

// import { UserContext } from "../../contexts/UserContext";
import { editVariant } from "../services/productServices";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { errorUtil } from "../utils/errorUtil";

const EditVariantForm = ({
  isDialogOpen,
  toggleDialog,
  productId,
  variantId,
}) => {
  const [createVariantDetails, setCreateVariantDetails] = useState({
    productVarDesign: "",
    productVarInventoryQty: "",
    productVarAvailableQty: "",
    productVarPrice: "",
    productVarDisplayPhoto: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreateVariantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      toast.info("Editing design details...");
      await editVariant(createVariantDetails, productId, variantId);
      toast.success(`Design details edited successfully! `);
      //   navigate(PATHS.USER(userUsername).SELLER.PRODUCT_ONE);
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
          Edit Design Details!
          <input
            name="productVarDesign"
            type="text"
            placeholder="Variant Design"
          />
          <input
            name="productVarInventoryQty"
            type="text"
            placeholder="Variant Inventory Quantity"
          />
          <input
            name="productVarAvailableQty"
            type="text"
            placeholder="Variant Available Quantity"
          />
          <input
            name="productVarPrice"
            type="text"
            placeholder="Variant Price"
          />
          <input
            name="productVarDisplayPhoto"
            type="text"
            placeholder="Variant Photo URL"
          />
          <Button type="submit" onClick={toggleDialog}>
            Changed My Mind
          </Button>
          <Button type="submit">Create Variant Design</Button>
        </Box>
      </dialog>
    </>
  );
};
export { EditVariantForm };
