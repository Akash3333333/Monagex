//ViewTransac.jsx
import UserNav from "../User/UserNav";
import Graph from "./Graph";
import Footer from "../Footer";
import './ViewTransac.css';
import Records from "./Records";

const ViewTransac = () => {
    return (
        <div className="view-container">
            <UserNav/>
            <div className="view-content">
                <div className="view-inner">
                  <Graph  />
                  <Records  />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ViewTransac;
