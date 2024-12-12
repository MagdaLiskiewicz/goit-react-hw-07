import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";
import { selectFilter } from "../../redux/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <form className={css.form}>
      <label className={css.label}>
        <span>Find contacts by name</span>
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
    </form>
  );
};

export default SearchBox;
