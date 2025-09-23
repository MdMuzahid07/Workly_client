import FooterBottom from "./FooterBottom";
import MainFooter from "./MainFooter";
import MobileAppRecommend from "./MobileAppRecommend";

const Footer = () => {
  return (
    <footer className="bg-primary/5">
      <MobileAppRecommend />
      <MainFooter />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
