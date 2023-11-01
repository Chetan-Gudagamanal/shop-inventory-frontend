import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { backend_url } from "../../constants";
import { Button, Container, Typography } from "@mui/material";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../components/BasicModal";

export default function HomePage({
  loggedInUserId,
  setProductsData,
  shopData,
  setShopData,
  handleViewProducts,
}) {
  const getShopData = async () => {
    const url = `${backend_url}/get_shop_details/${loggedInUserId}`;
    const rawData = await fetch(url, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
        "Content-Type": "application/json",
      },
    });
    if (rawData.status == 200) {
      let jsonData = await rawData.json().then((res) => {
        setShopData(res.shops);
      });
    } else {
      let jsonData = await rawData.json();
    }
  };
  useEffect(() => {
    getShopData();
  }, []);
  return (
    <>
      <Header />
      {/* <p>
        <span className={styles.fancy}>Shop Inventory</span>
      </p> */}
      {shopData.length ? (
        <>
          <Container
            sx={{
              backgroundImage: `url(https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5em",
              flexWrap: "wrap",
              padding: "1em",
              height: "90vh",
            }}
          >
            <Typography
              variant="h3"
              className={styles.fancy}
              sx={{ fontWeight: "bolder" }}
            >
              {shopData[0].shopName.toUpperCase()}
            </Typography>
            <Typography>{shopData[0].description}</Typography>
            <Typography>{shopData[0].address}</Typography>
            <Typography>{`lat:${shopData[0].location.lat}   lng:${shopData[0].location.lng}`}</Typography>
            <Button
              sx={{ marginTop: "10px" }}
              variant="contained"
              onClick={() => {
                console.log(shopData[0]["_id"]);
                handleViewProducts();
              }}
            >
              View / ADD Products
            </Button>
          </Container>
        </>
      ) : (
        <>
          <p>
            <span className={styles.fancy}>Shop Inventory</span>
          </p>
          <BasicModal
            setShopData={setShopData}
            loggedInUserId={loggedInUserId}
            getShopData={getShopData}
          />
        </>
      )}
    </>
  );
}
