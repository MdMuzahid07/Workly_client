import { ReactNode } from "react";
import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/navigation/Navbar";
import ScrollToTop from "../../components/shared/ScrollToTop";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
