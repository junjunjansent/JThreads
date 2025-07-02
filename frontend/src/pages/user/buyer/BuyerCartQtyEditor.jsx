import { useState } from "react";

import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";
import InfoTextCard from "../../../components/InfoTextCard";
import Loader from "../../../components/Loader";

import { updateOwnerCart } from "../../../services/cartServices";
import { errorUtil } from "../../../utils/errorUtil";

const BuyerCartQtyEditor = ({
  id,
  qty,
  productVarAvailableQty,
  handleCartChange,
}) => {
  const [displayQty, setDisplayQty] = useState(qty);
  const [isAddingToCart, setAddingToCart] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openEditor = () => {
    setIsEditing(true);
    setDisplayQty(qty);
  };

  const handleEditCartQty = async (itemId, qtySet) => {
    try {
      setAddingToCart(true);
      const updatedCart = await updateOwnerCart({ itemId, qtySet });
      await handleCartChange(updatedCart);
      toast.success("Edited Cart Qty");
    } catch (err) {
      toast.error("Erroring Adding Item To Cart");
      errorUtil(err);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <>
          <InfoTextCard
            value={
              <>
                {displayQty > 0 && (
                  <Button onClick={() => setDisplayQty(displayQty - 1)}>
                    -
                  </Button>
                )}
                {displayQty}

                {displayQty <= productVarAvailableQty && (
                  <Button onClick={() => setDisplayQty(displayQty + 1)}>
                    +
                  </Button>
                )}
              </>
            }
            label={`max ${productVarAvailableQty}`}
          />
          {isAddingToCart ? (
            <Loader />
          ) : (
            <Button onClick={() => handleEditCartQty(id, displayQty)}>
              Save
            </Button>
          )}
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <Typography>{qty}</Typography>
          <Button onClick={openEditor}>Change</Button>
        </>
      )}
    </>
  );
};

export default BuyerCartQtyEditor;
