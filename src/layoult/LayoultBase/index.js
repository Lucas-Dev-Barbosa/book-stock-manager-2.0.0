import Content from "../Content";
import Footer from "../FooterLayoult";
import Header from "../Header";
import { useSelector } from "react-redux";

const Layoult = (props) => {
  const { signed } = useSelector((state) => state);

  return (
    <>
      {signed && <Header />}
      <Content>{props.children}</Content>
      {signed && <Footer />}
    </>
  );
};

export default Layoult;
