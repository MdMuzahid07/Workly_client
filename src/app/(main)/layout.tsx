import { ReactNode } from "react";
import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/navigation/Navbar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
