const CreateProductForm = ({ isDialogOpen, toggleDialog }) => {
  if (!isDialogOpen) {
    return null;
  }
  return (
    <>
      <dialog open>
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
        <button onClick={toggleDialog}>Close Dialog</button>
        <button>Create Product</button>
      </dialog>
    </>
  );
};
export { CreateProductForm };
