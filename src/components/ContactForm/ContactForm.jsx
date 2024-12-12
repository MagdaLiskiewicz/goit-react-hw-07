import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact, selectContacts } from "../../redux/contactsSlice";
import { nanoid } from "nanoid";
import { useId } from "react";
import css from "./ContactForm.module.css";
import { toast } from "react-hot-toast";

const initialValues = {
  name: "",
  number: "",
};

const FeedbackSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[A-Za-z\s-]+$/, "Name must be a valid!")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in the format XXX-XX-XX")
    .required("Number is required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === values.name.toLowerCase() ||
        contact.number === values.number
    );

    if (isDuplicate) {
      toast.error("This contact already exists!");
      return;
    }

    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: values.number,
      })
    );

    toast.success("Contact added successfully!");
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.fieldWrapper}>
          <label htmlFor="name" className={css.label}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
          ></Field>
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css.fieldWrapper}>
          <label htmlFor="number" className={css.label}>
            Number
          </label>
          <Field
            className={css.field}
            type="text"
            name="number"
            id={numberFieldId}
          ></Field>
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
