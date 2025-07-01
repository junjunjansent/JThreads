import { PATHS } from "../../routes/PATHS";

const NavCategory = ({ styles }) => {
  const categories = [
    { name: "Tops", searchValue: "tops" },
    { name: "Pants", searchValue: "pants" },
    { name: "Headwear", searchValue: "headwear" },
    { name: "Bags", searchValue: "bags" },
    { name: "Accessories", searchValue: "accessories" },
    { name: "Misc", searchValue: "misc" },
  ];

  return (
    <div className={styles.dropdown}>
      <button className={styles.categoryButton}>==</button>
      <div className={styles.dropdowncontent}>
        <ul>
          {categories.map((category) => (
            <a
              key={category.searchValue}
              href={`${PATHS.PUBLIC.BUY.PRODUCT_ALL}?search=${category.searchValue}`}
            >
              <li name={category.name.toLowerCase()}>{category.name}</li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { NavCategory };
