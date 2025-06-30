const CreateProductForm = ({ isDialogOpen, toggleDialog }) => {
  if (!isDialogOpen) {
    return null;
  }
  return (
    <>
      <p>Dialog Open</p>
      <dialog open>
        Test
        <button onClick={toggleDialog}>Close Dialog</button>
        <button>Create Product</button>
      </dialog>
    </>
  );
};
export { CreateProductForm };
