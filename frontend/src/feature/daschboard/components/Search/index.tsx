import { Input } from "antd";
import styles from "../../Dashboard.module.css";
import { SearchProps } from "types/search";
const Search = ({ handleSearch, clearSearch }: SearchProps) => {
  return (
    <Input
      placeholder="Поиск папок и файлов..."
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
          clearSearch();
        } else {
          handleSearch(value);
        }
      }}
      allowClear
      onClear={clearSearch}
      className={styles.search}
    />
  );
};

export default Search;
