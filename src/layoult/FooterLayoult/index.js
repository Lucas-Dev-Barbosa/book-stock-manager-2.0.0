import classes from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className="navbar fixed-bottom bg-light">
        <span className={classes.footerText + " mx-auto"}>
          &copy; 2022 LG. Todos os direitos reservados.
        </span>
      </footer>
    </>
  );
};

export default Footer;
