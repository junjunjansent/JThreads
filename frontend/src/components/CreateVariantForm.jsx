import { useState } from "react";
// import { useNavigate } from "react-router";
// import { PATHS } from "../../routes/PATHS";

// import { UserContext } from "../../contexts/UserContext";
import { createVariant } from "../services/productServices";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { errorUtil } from "../utils/errorUtil";

const CreateVariantForm = ({ isDialogOpen, toggleDialog, productId }) => {
  // const { user } = useContext(UserContext);
  //   const navigate = useNavigate();

  const [createVariantDetails, setCreateVariantDetails] = useState({
    productVarDesign: "",
    productVarInventoryQty: "",
    productVarAvailableQty: "",
    productVarPrice: "",
    productVarDisplayPhoto: "",
    // productOwner: user._id,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Jacob: prev details needed here to ensure existing changes are not overriden
    setCreateVariantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      toast.info("Creating new product design...");

      //   const formData = new FormData(createProductDetails);
      //   const data = Object.fromEntries(createProductDetails);
      await createVariant(createVariantDetails, productId);
      // navigate(PATHS.PUBLIC.USER_SHOP(user.username));
      toast.success(`Product design successly created! `);
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
          <h1>Create a new variant!</h1>
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
          {/* Jacob: Button type for closing dialog box is set to submit for stylistic purposes at the moment, to be 100% accurate, should change to justfy-centre */}
          <Button type="submit" onClick={toggleDialog}>
            Changed My Mind
          </Button>
          <Button type="submit">Create Variant Design</Button>
        </Box>
      </dialog>
    </>
  );
};
export { CreateVariantForm };
