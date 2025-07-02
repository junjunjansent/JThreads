// "cartItems": [
//   {
//     "item": {
//       "_id": "685faa35a59d22a929ff2be2",
//       "mainProduct": {
//         "_id": "685faa35a59d22a929ff2ba5",
//         "productName": "Sausages",
//         "productIsActive": true,
//         "productCategory": "Headwear",
//         "productOwner": {
//           "_id": "685faa34a59d22a929ff2b8f",
//           "username": "user1"
//         },
//         "productDefaultDeliveryTime": 30
//       },
//       "productVarDesign": "Sausages",
//       "productVarAvailableQty": 65,
//       "productVarPrice": 0.87,
//       "productVarDisplayPhoto": "https://picsum.photos/seed/r6cTc3oRs/2258/2853?grayscale&blur=8"
//     },
//     "qty": 64,
//     "_id": "68642814f64c0ccd236e9f6d"

import { useState } from "react";

import { errorUtil } from "../../../utils/errorUtil";
import { updateOwnerCart } from "../../../services/cartServices";

import { Avatar, Button, TableCell, TableRow, Typography } from "@mui/material";
import BuyerCartQtyEditor from "./BuyerCartQtyEditor";
import InfoTextCard from "../../../components/InfoTextCard";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../components/Loader";

//   },
const BuyerCartTableRow = ({ cartItem, handleCartChange }) => {
  const [isClearingCart, setIsClearingCart] = useState(false);
  const { item, qty } = cartItem;

  const handleClearCartQty = async (itemId) => {
    try {
      setIsClearingCart(true);
      const updatedCart = await updateOwnerCart({ itemId, qtySet: 0 });
      await handleCartChange(updatedCart);
      toast.success("Cleared Cart Qty");
    } catch (err) {
      toast.error("Erroring Clearing Cart Item");
      errorUtil(err);
    } finally {
      setIsClearingCart(false);
    }
  };

  // const renderQuantityOptions = Array.from(
  //   { length: productVarAvailableQty },
  //   (_, i) => i + 1
  // );
  //                 <select>
  //                   <optgroup>
  //                     {renderQuantityOptions.map((quantity) => (
  //                       <option key={quantity}>{quantity}</option>
  //                     ))}
  //                   </optgroup>
  //                 </select>

  return (
    <>
      <TableRow>
        <TableCell>
          <InfoTextCard
            label={`Sold by: ${item.mainProduct.productOwner.username}`}
            value={
              <Avatar
                variant="square"
                src={item.productVarDisplayPhoto}
                alt={item.productVarDesign}
                sx={{ width: "4rem", height: "4rem" }}
              />
            }
          />
        </TableCell>
        <TableCell>
          <InfoTextCard
            label={item.productVarDesign}
            value={item.mainProduct.productName}
          />
        </TableCell>
        <TableCell>{item.mainProduct.productCategory}</TableCell>
        <TableCell align="center">
          <BuyerCartQtyEditor
            id={item._id}
            qty={qty}
            productVarAvailableQty={item.productVarAvailableQty}
            handleCartChange={handleCartChange}
          />
        </TableCell>
        <TableCell align="center">${item.productVarPrice.toFixed(2)}</TableCell>
        <TableCell align="center">
          ${(qty * item.productVarPrice).toFixed(2)}
        </TableCell>
        <TableCell align="center">
          {isClearingCart ? (
            <Loader />
          ) : (
            <Button onClick={() => handleClearCartQty(item._id)}>
              Clear <FontAwesomeIcon icon={faTrash} />
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default BuyerCartTableRow;
