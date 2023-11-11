import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className="h-full w-fullz-50 flex items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
