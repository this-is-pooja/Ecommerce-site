import React, { useEffect } from 'react';
import { getList } from "./api";
import Layout from "./Layout";
import { useList } from "react-use";

const ListBox = {
    width: "16rem",
    height: "21rem", backgroundColor: "#fff", margin: "2rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "8px",
    fontFamily: "Times New Roman", padding: "1rem", fontSize: "1.2rem"
}
const outerListBox = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "2rem"
}
const title = {
    margin: "2rem 0 0 1rem",
    fontSize: "1rem",
    color: "#7f7f7f"
}
const price = {
    color: "#FF5733",
    marginLeft: "1rem",
    marginTop: "1rem"
}

function Items() {

    const [list, { set, sort, filter }] = useList([]);

    useEffect(() => {
        getList()
            .then(
                items => {
                    set(items)
                }
            )
    }, [])

    return (
        <>
            <Layout
                items={list}
                onClick={() => sort((a, b) => a - b)}
                onChange={() => filter(items => items.category === "jewelery")}
                Men={() => filter(items => items.category === "men's clothing")}
                Electronics={() => filter(items => items.category === "electronics")}
            />
            <div style={{ margin: "1rem" }}>
                <div style={outerListBox}>
                    {
                        list.map((item, id) =>
                            <div key={id}>
                                <div style={ListBox}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "1rem"
                                        }}
                                    >
                                        <div
                                            style={{ marginLeft: "1.6rem" }}>
                                            <img
                                                src={item.image}
                                                alt=""
                                                width="200px"
                                                height="180px" />
                                        </div>
                                        <div style={title}>
                                            {item.title}
                                        </div>
                                        <div style={price}>
                                            ${item.price}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                </div>
            </div>
        </>
    );
}

export default Items