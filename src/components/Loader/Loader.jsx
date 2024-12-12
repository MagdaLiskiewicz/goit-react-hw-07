import { PulseLoader } from "react-spinners";

import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <PulseLoader color="#052a4b" size={15} speedMultiplier={0.6} />
    </div>
  );
};

export default Loader;
