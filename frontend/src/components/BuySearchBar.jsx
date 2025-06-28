const BuySearchBar = ({ styles, handleInputChange }) => {
  return (
    <>
      <form onChange={handleInputChange}>
        <input
          className={styles.inputfield}
          type="search"
          placeholder="WHAT ARE YOU LOOKING FOR TODAY?"
        ></input>
      </form>
    </>
  );
};

export { BuySearchBar };
