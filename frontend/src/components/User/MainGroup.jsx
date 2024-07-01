// MainGroup.js
import UserNav from "../User/UserNav";
import Footer from "../Footer";
import './MainGroup.css';
import Friend from "./Friend";
import SplitGrp from "./SplitGrp";

function MainGroup() {
    return (
        <div className="mainGroup-container">
            <UserNav/>
            <div className="mainGroup-content">
                <div className="friend">
                    <Friend/>
                </div>
                <div className="grp1">
                    <SplitGrp  />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default MainGroup;
