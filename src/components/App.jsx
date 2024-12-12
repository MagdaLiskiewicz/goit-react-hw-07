import ContactForm from "./ContactForm/ContactForm.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import SearchBox from "./SearchBox/SearchBox.jsx";
import { FaAddressBook } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

import css from "./App.module.css";
import "modern-normalize/modern-normalize.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/operations";
import { selectError, selectIsLoading } from "../redux/selectors.js";
import Loader from "./Loader/Loader.jsx";

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        <FaAddressBook className={css.titleIcon} size="40" />
        Phonebook
      </h1>
      <Toaster position="top-right" reverseOrder={false} />
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <Loader />}

      <ContactList />
    </div>
  );
};

export default App;
