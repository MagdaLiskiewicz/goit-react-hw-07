import ContactForm from "./ContactForm/ContactForm.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import SearchBox from "./SearchBox/SearchBox.jsx";
import { FaAddressBook } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

import css from "./App.module.css";
import "modern-normalize/modern-normalize.css";

const App = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        <FaAddressBook className={css.titleIcon} size="40" />
        Phonebook
      </h1>
      <Toaster position="top-right" reverseOrder={false} />
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;
