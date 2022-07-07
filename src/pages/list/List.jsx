import "./list.scss";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

export default function List() {
  return (
    <div className="list">
      <Navbar />
      <Header type="list" />
    </div>
  );
}
