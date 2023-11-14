import { useState, useEffect } from "react";
import styles from "@/styles/SearchFilter.module.css";

export default function SearchFilter(props) {
  const [searchParams, setSearchParams] = useState();

  const handleChange = (e) => {
    setSearchParams(e.target.value);
  };

  const filterList = () => {
    if (!props.filteredList) {
      props.setFilteredList(props.list);
    } else {
      const filtered = props?.list.filter((item) => {
        return (
          item[props.param]
            .toLowerCase()
            .includes(searchParams?.toLowerCase()) ||
          item[props.param2]?.toLowerCase().includes(searchParams?.toLowerCase())
        );
      });
      props.setFilteredList(filtered);
    }
  };

  useEffect(() => {
    filterList();
  }, [searchParams]);

  return (
    <div className={styles.formCtr}>
      <input
        type="text"
        id="filter"
        onChange={handleChange}
        placeholder={props.placeHolder}
        autoComplete="off"
      />
    </div>
  );
}
