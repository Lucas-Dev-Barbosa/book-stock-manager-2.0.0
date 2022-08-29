import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes.contentHome + " text-nowrap bg-light text-center shadow-sm p-3"}>
      <h1>
        <span className="oi oi-book"></span> {process.env.REACT_APP_NAME}
      </h1>
      <p>Aplicação desenvolvida para gerenciamento de estoque de livros</p>
    </div>
  );
};

export default Home;
