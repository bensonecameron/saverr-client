import React from "react";
import logoutPic from "../../assets/logout.png";

type AcceptedProps = {
  clearToken: () => void;
};

export default class Logout extends React.Component<AcceptedProps> {
  constructor(props: AcceptedProps) {
    super(props);
  }
  render() {
    return (
      <div className="">
        <div className="nav-item">
          {/* <img
            onClick={() => this.props.clearToken()}
            id="logout"
            className="logout"
            src={logoutPic}
            alt="powerbutton"
            width="30px"
            height="30px"
          /> */}
        </div>
      </div>
    );
  }
}
