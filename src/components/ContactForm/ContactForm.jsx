import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import css from "./ContactForm.module.css";
import { toast } from "react-hot-toast";
import { addContact } from "../../redux/operations";
import { selectContacts } from "../../redux/selectors";

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
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Number must be in the format XXX-XXX-XXXX")
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
        contact.phone === values.number
    );

    if (isDuplicate) {
      toast.error("This contact already exists!");
      return;
    }

    dispatch(
      addContact({
        name: values.name,
        phone: values.number,
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
