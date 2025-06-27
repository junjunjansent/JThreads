const BuySearchBar = ({ styles, handleSearch }) => {
  return (
    <>
      <form onChange={handleSearch}>
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
