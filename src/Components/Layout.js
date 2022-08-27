import React from "react";
import { BsHeartFill } from "react-icons/bs";

const styles = {
  layoutContainer: {
    height: "5rem",
    backgroundColor: "#fff",
    fontSize: "1.5rem",
    paddingLeft: "1.2rem",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-between",
    boxShadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
  },
  btnStyle: {
    width: "8rem",
    marginRight: "5rem",
    height: "2.5rem",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#FF5733",
    border: "1px solid #FF5733",
    display: "flex",
    justifyContent: "center",
    fontSize: "1rem",
    cursor: "pointer",
  },
  FilterStyle: {
    marginTop: "0.5rem",
    marginRight: "4px",
  },
  FilterOuterBox: {
    display: "flex",
    alignItems: "center",
    width: "calc(100vw-600px)",
    height: "5rem",
  },
  icon: {
    marginTop: "0.6rem",
  },
  logo: {
    marginTop: "-5px",
    cursor: "pointer",
    width: "140px",
    height: "85px",
  },
};

function Layout(props) {
  const showFavouritePage = () => {
    props.setShowFavourite(true);
  };

  const HomePage = () => {
    props.setShowFavourite(false);
    window.location.reload(false);
  };

  return (
    <div style={styles.layoutContainer}>
      <div onClick={HomePage}>
        <img
          src="https://png.pngtree.com/element_our/sm/20180413/sm_5ad0c0643f2d8.jpg"
          alt=""
          style={styles.logo}
        />
      </div>
      <div>
        <div style={styles.FilterOuterBox}>
          <button style={styles.btnStyle} onClick={showFavouritePage}>
            <div style={styles.FilterStyle}>Favourite</div>
            <BsHeartFill style={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Layout;
