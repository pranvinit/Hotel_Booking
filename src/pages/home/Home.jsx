import "./home.scss";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Header />
    </div>
  );
}
