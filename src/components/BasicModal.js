import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./BasicModal.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Card from "@mui/material/Container";
import { backend_url } from "../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  setShopData,
  loggedInUserId,
  getShopData,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(false);

  const validationSchema = Yup.object().shape({
    shopName: Yup.string().required(),
    description: Yup.string().required(),
    address: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    setLoadingStatus(true);
    let location = { lat: data.latitude, lng: data.longitude };
    data["location"] = location;
    data["userId"] = loggedInUserId;
    console.log(data);
    const createShop = async () => {
      const url = `${backend_url}/create_shop`;
      const rawData = await fetch(url, {
        method: "POST",
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (rawData.status == 200) {
        let jsonData = await rawData.json().then((res) => {
          // setStatus("Login Successful")
          console.log(res);
          getShopData();
          //model('pls login to continue')
          // navigate("/");
        });
      } else {
        let jsonData = await rawData.json();
        console.log(jsonData);
        setLoadingStatus(false);
      }
    };
    createShop();
    // navigate("/login")
    setLoadingStatus(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "1em",
      }}
    >
      <Button
        sx={{ margin: "10px" }}
        variant="contained"
        size="large"
        onClick={handleOpen}
      >
        Create Shop
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {/* <p>Click on create Account to register as new user</p> */}
            {/* <h2 style={{ margin: "0" }}>CREATE SHOP</h2> */}
            <div>
              <Card>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                  <br />
                  <input
                    {...register("shopName")}
                    placeholder="Enter shop Name"
                    className={styles.input}
                  />
                  {errors.shopName && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.shopName.message}{" "}
                    </span>
                  )}
                  <br />
                  <textarea
                    {...register("description")}
                    placeholder="Enter the description"
                    className={styles.input}
                  />
                  {errors.description && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.description.message}{" "}
                    </span>
                  )}
                  <br />
                  <input
                    {...register("latitude")}
                    placeholder="Enter the area latitude"
                    className={styles.input}
                  />
                  {errors.latitude && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.latitude.message}{" "}
                    </span>
                  )}
                  <br />
                  <input
                    {...register("longitude")}
                    placeholder="Enter your the area longitude"
                    className={styles.input}
                  />
                  {errors.longitude && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.longitude.message}{" "}
                    </span>
                  )}
                  <br />
                  <input
                    {...register("address")}
                    placeholder="Enter your address"
                    className={styles.input}
                  />
                  {errors.address && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.address.message}{" "}
                    </span>
                  )}
                  <br />

                  {!loadingStatus ? (
                    <input
                      type="submit"
                      value="CREATE"
                      className={styles.input}
                    />
                  ) : (
                    <CircularProgress disableShrink />
                  )}
                  <br />
                </form>
              </Card>
            </div>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}
