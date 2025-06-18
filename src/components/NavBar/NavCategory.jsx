const NavCategory = ({ styles }) => {
  return (
    <div className={styles.dropdown}>
      <button className={styles.categoryButton}>==</button>
      <div className={styles.dropdowncontent}>
        <ul>
          <li>Tops</li>
          <li>Pants</li>
          <li>Headwear</li>
          <li>Bags</li>
          <li>Accessories</li>
          <li>Misc</li>
        </ul>
      </div>
    </div>
  );
};

export { NavCategory };
