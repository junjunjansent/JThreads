const BuySearchBar = ({ styles }) => {
  return (
    <>
      <form>
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
