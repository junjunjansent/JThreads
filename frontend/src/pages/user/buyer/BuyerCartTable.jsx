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
//   },

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BuyerCartTableRow from "./BuyerCartTableRow";

const BuyerCartTable = ({ cartItems, handleCartChange }) => {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="Table of Cart Items">
        <TableHead>
          <TableRow>
            <TableCell>PHOTO</TableCell>
            <TableCell>PRODUCT</TableCell>
            {/* Product to contain Main Product Name & Design Category & Seller */}
            <TableCell>CATEGORY</TableCell>
            <TableCell align="center">QTY</TableCell>
            <TableCell align="center">PRICE (each)</TableCell>
            <TableCell align="center">TOTAL</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((cartItem) => (
            <BuyerCartTableRow
              key={cartItem._id}
              cartItem={cartItem}
              handleCartChange={handleCartChange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BuyerCartTable;
