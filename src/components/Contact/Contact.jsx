import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { deleteContact } from "../../redux/operations";

const Contact = ({ id, name, phone }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.contact}>
      <div className={css.contactText}>
        <span className={css.info}>
          <FaUser className={css.contactIcon} />
          {name}
        </span>
        <span className={css.info}>
          <FaPhoneAlt className={css.contactIcon} />
          {phone}
        </span>
      </div>
      <button className={css.btn} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default Contact;
