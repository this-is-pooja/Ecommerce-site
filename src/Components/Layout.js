import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import { ImSortAmountAsc } from "react-icons/im";
import { BsFilterSquareFill } from "react-icons/bs";

const styles = {
    height: "8rem",
    backgroundColor: "#fff",
    fontSize: "1.5rem",
    paddingLeft: "1.2rem",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
}
const btnStyle = {
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
    cursor: "pointer"
}
const hoverBtnStyle = {
    width: "8rem",
    marginRight: "5rem",
    height: "1.5rem",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#FF5733",
    border: "1px solid #FF5733",
    display: "flex",
    justifyContent: "center",
    fontSize: "1rem",
    cursor: "pointer"
}
const FilterStyle = {
    marginTop: "0.5rem",
    marginRight: "4px"
}
const FilterOuterBox = {
    display: "flex",
    alignItems: "center",
    width: "calc(100vw-600px)",
    height: "8rem"
}
const icon = {
    marginTop: "0.6rem"
}

function Layout(props) {
    
    const [Filter, setFilter] = useState(false);
    props.items.sort((a, b) => a.price - b.price);

    return (
        <div style={styles}>
            <div>
                <img
                    src={Logo}
                    alt=""
                    width="160px"
                    height="120px"
                />
            </div>
            <div>
                <div style={FilterOuterBox}>
                    <button style={btnStyle}>
                        <div
                            style={FilterStyle}
                            onClick={() => props.onClick()}
                        >
                            Sort
                        </div>
                        <ImSortAmountAsc style={icon} />
                    </button>
                    <div
                        onMouseEnter={() => {
                            setFilter(true);
                        }}
                        onMouseLeave={() => {
                            setFilter(false);
                        }}
                    >
                        {
                            Filter
                                ?
                                <>
                                    <button
                                        style={hoverBtnStyle}
                                        onClick={() => props.onChange()}>
                                        Jwellery's
                                    </button>
                                    <div
                                        style={{ margin: "1rem 0 1rem 0" }}
                                    >
                                        <button
                                            style={hoverBtnStyle}
                                            onClick={() => props.Men()}
                                        >
                                            Men's
                                        </button>
                                    </div>
                                    <button
                                        style={hoverBtnStyle}
                                        onClick={() => props.Electronics()}
                                    >
                                        Electronics
                                    </button>
                                </>
                                :
                                <button
                                    style={btnStyle}
                                >
                                    <div
                                        style={FilterStyle}
                                    >Filter
                                    </div>
                                    <BsFilterSquareFill style={icon} />
                                </button>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Layout