import FooterBottom from "./FooterBottom";
import MainFooter from "./MainFooter";
import MobileAppRecommend from "./MobileAppRecommend";

const Footer = () => {
  return (
    <footer className="bg-white">
      <MobileAppRecommend />
      <MainFooter />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
