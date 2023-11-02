import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./UpdateProductModal.module.css";

import { CustomContext } from "../../App";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Card from "@mui/material/Container";
import { backend_url } from "../../constants";
import { IconButton } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  bgcolor: "#d4def8",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateProductModal({ productData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(false);

  const validationSchema = Yup.object().shape({
    productname: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.string().required(),
    quantity: Yup.number().required(),
  });

  const { handleViewProducts } = React.useContext(CustomContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    setLoadingStatus(true);
    console.log(data);
    console.log(productData);
    const updateProduct = async () => {
      const url = `${backend_url}/update_product/${productData["_id"]}`;
      const rawData = await fetch(url, {
        method: "PATCH",
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
          handleClose();
          handleViewProducts();
          //model('pls login to continue')
          // navigate("/");
        });
      } else {
        let jsonData = await rawData.json();
        console.log(jsonData);
        setLoadingStatus(false);
      }
    };
    updateProduct();
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
        size="small"
        onClick={() => {
          handleOpen();
          console.log(productData);
        }}
      >
        Update Product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "1em",
            }}
          >
            <IconButton color="error" onClick={handleClose}>
              <CancelPresentationIcon />
            </IconButton>
          </Typography>
          <div>
            {/* <p>Click on create Account to register as new user</p> */}
            {/* <h2 style={{ margin: "0" }}>CREATE SHOP</h2> */}
            <div>
              <Card>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                  <br />
                  <input
                    {...register("productname")}
                    placeholder="Enter product Name"
                    defaultValue={productData["productname"]}
                    className={styles.input}
                  />
                  {errors.productname && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.productname.message}{" "}
                    </span>
                  )}
                  <br />
                  <textarea
                    {...register("description")}
                    placeholder="Enter the description"
                    defaultValue={productData["description"]}
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
                    {...register("quantity")}
                    placeholder="Enter product quantity"
                    defaultValue={productData["quantity"]}
                    className={styles.input}
                  />
                  {errors.quantity && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.quantity.message}{" "}
                    </span>
                  )}
                  <br />
                  <input
                    {...register("price")}
                    placeholder="Enter product priice"
                    defaultValue={productData["price"]}
                    className={styles.input}
                  />
                  {errors.price && (
                    <span className={styles.errorText}>
                      {" "}
                      {errors.price.message}{" "}
                    </span>
                  )}
                  <br />

                  {!loadingStatus ? (
                    <input
                      type="submit"
                      value="UPDATE"
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
