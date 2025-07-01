// {
//     "cart": {
//       "buyer": "685faa34a59d22a929ff2b8f",
//       "cartItems": [
//         {
//           "item": "685faa35a59d22a929ff2be4",
//           "qty": 3,
//           "_id": "68634bf7cd2ebeb67c156da7"
//         }
//       ],
//       "_id": "68634bf7cd2ebeb67c156da6",
//       "createdAt": "2025-07-01T02:46:15.652Z",
//       "updatedAt": "2025-07-01T02:46:15.652Z"
//     }
//   }

const BuyerCartTableRow = () => {
  return (
    <>
      {/* <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.calories}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.fat}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow> */}
    </>
  );
};

export default BuyerCartTableRow;
