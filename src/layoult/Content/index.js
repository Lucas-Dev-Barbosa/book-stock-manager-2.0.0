import classes from "../Layoult.module.css";

const Content = (props) => {
  return (
    <div className={classes.container + " container-md"}>
      <div className="row">
        <div className="col">{props.children}</div>
      </div>
    </div>
  );
};

export default Content;
