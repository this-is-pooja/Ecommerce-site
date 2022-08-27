import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import GetList from "../RealStateData/Data.json";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

const styles = {
  ListBox: {
    width: "22rem",
    height: "22rem",
    backgroundColor: "#fff",
    margin: "2rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "8px",
    fontFamily: "Times New Roman",
    fontSize: "1.2rem",
  },
  outerListBox: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "2rem",
  },
  title: {
    margin: "1rem 0 0 1rem",
    fontSize: "18px",
    fontWeight: 500,
    color: "#7f7f7f",
  },
  price: {
    color: "#FF5733",
    marginLeft: "1rem",
    marginTop: "1rem",
  },
  icon: {
    color: "#FF5733",
    fontSize: "2rem",
    margin: "3rem 1rem",
  },
  searchBtn: {
    width: "8rem",
    height: "3rem",
    color: "#fff",
    fontSize: "1.2rem",
    backgroundColor: "#FF5733",
    border: "1px solid #FF5733",
    borderRadius: "8px",
    cursor: "pointer",
  },
  filterContainer: {
    width: "820px",
    height: "48px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    display: "Flex",
    justifyContent: "space-between",
    padding: "1rem",
  },
  space: {
    height: "1px",
    width: "40px",
    backgroundColor: "#536471",
    transform: "rotate(90deg)",
    marginTop: "1.5rem",
  },
  inputArea: {
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    outline: "none",
  },
  innerBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  img: {
    width: "352px",
    height: "220px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  emptyCartMsg: {
    fontSize: "3rem",
    marginTop: "20%",
    textAlign: "center",
    color: "#FF5733",
  },
};

function Items() {
  const getLocalItem = () => {
    const list = localStorage.getItem("data-info");
    if (list) {
      return JSON.parse(localStorage.getItem("data-info"));
    } else {
      return [];
    }
  };
  const [Info, setInfo] = useState(getLocalItem());
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [ItemList, setItemList] = useState([]);
  const [Favourite, setFavourite] = useState({});
  const [showFavourite, setShowFavourite] = useState(false);
  const [PropertyType, setPropertyType] = useState("House");

  useEffect(() => {
    setItemList(GetList.RealState);
  }, []);

  const onSearchHandler = () => {
    const locationList = ItemList.filter((element) =>
      element.address.includes(location)
    );
    const areaList = ItemList.filter(
      (element) => parseInt(element.area) <= parseInt(area)
    );
    const priceList = ItemList.filter(
      (element) => element.amount <= parseInt(price)
    );
    const BanquetHallList = ItemList.filter(
      (element) => element.Property_type === "Banquet Hall"
    );

    const arr = [];
    if (PropertyType === "House") {
      if (locationList || areaList || priceList) {
        arr.push(...locationList);
        arr.push(...areaList);
        arr.push(...priceList);
        const Newarr = arr.filter((element) => {
          const isDuplicate = uniqueIds.includes(element.House_Img);
          if (!isDuplicate) {
            uniqueIds.push(element.House_Img);
            return true;
          }
          return false;
        });
        setItemList(Newarr);
      }
    } else if (PropertyType === "Banquet Hall") {
      setItemList(BanquetHallList);
    } else {
      setItemList(GetList.RealState);
    }
  };

  const like = (id) => () => {
    setFavourite((state) => ({
      ...state,
      [id]: !state[id],
    }));
    setInfo([...Info, ItemList[id]]);
  };

  useEffect(() => {
    localStorage.setItem("data-info", JSON.stringify(Info));
  }, [Info]);

  const FavouritePageList = localStorage.getItem("data-info");
  const Data = JSON.parse(FavouritePageList);
  const uniqueIds = [];
  const NewData = Data.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.House_Img);
    if (!isDuplicate) {
      uniqueIds.push(element.House_Img);
      return true;
    }
    return false;
  });

  return !showFavourite ? (
    <>
      <Layout setShowFavourite={setShowFavourite} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4rem",
        }}
      >
        <div style={styles.filterContainer}>
          <div style={styles.flexCol}>
            <label style={{ color: "#536471" }}>Location</label>
            <input
              type="text"
              style={styles.inputArea}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div style={styles.space}></div>
          <div style={styles.flexCol}>
            <label style={{ color: "#536471" }}>Price (max)</label>
            <input
              type="number"
              style={styles.inputArea}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div style={styles.space}></div>
          <div style={styles.flexCol}>
            <label style={{ color: "#536471" }}>Area (In Sq.ft)</label>
            <input
              type="number"
              style={styles.inputArea}
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div style={styles.space}></div>
          <div>
            <label style={{ color: "#536471" }}>Property Type</label>
            <select
              onChange={(e) => setPropertyType(e.target.value)}
              value={PropertyType}
            >
              <option value="House">House</option>
              <option value="Banquet Hall">Banquet Hall</option>
            </select>
          </div>
          <div style={styles.space}></div>
          <button style={styles.searchBtn} onClick={onSearchHandler}>
            search
          </button>
        </div>
      </div>

      <div style={{ margin: "1rem" }}>
        {ItemList ? (
          <div style={styles.outerListBox}>
            {ItemList.map((item, id) => (
              <div key={id}>
                <div style={styles.ListBox}>
                  <div style={styles.innerBox}>
                    <div>
                      <img src={item.House_Img} alt="" style={styles.img} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={styles.title}>{item.address}</div>
                        <div style={styles.price}>${item.amount}</div>
                        <div style={{ ...styles.title, marginTop: "10px" }}>
                          {item.Room}, {item.area} Sq.ft
                        </div>
                      </div>
                      <div onClick={like(id)}>
                        {Favourite[id] ? (
                          <BsHeartFill style={styles.icon} />
                        ) : (
                          <BsHeart style={styles.icon} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyCartMsg}>
            Not Found anything you search...!!
          </div>
        )}
      </div>
    </>
  ) : (
    <>
      <Layout setShowFavourite={setShowFavourite} />
      <div style={{ margin: "1rem" }}>
        {NewData.length > 0 ? (
          <div style={styles.outerListBox}>
            {NewData.map((item, id) => (
              <div key={id}>
                <div style={styles.ListBox}>
                  <div style={styles.innerBox}>
                    <div>
                      <img src={item.House_Img} alt="" style={styles.img} />
                    </div>
                    <div style={styles.title}>{item.address}</div>
                    <div style={styles.price}>${item.amount}</div>
                    <div style={{ ...styles.title, marginTop: "10px" }}>
                      {item.Room}bhk, {item.area} Sq.ft
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyCartMsg}>
            You have not selected any item....!!
          </div>
        )}
      </div>
    </>
  );
}

export default Items;
