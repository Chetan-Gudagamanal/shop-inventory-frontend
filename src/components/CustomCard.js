import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { backend_url } from "../constants";
import { useNavigate } from "react-router-dom";
import UpdateProductModal from "../pages/ProductsPage/UpdateProductModal";
import { CustomContext } from "../App";

export default function CustomCard(props) {
  const { handleViewProducts } = React.useContext(CustomContext);
  const navigate = useNavigate();
  const handleDelete = async () => {
    const url = `${backend_url}/delete_product/${props.product["_id"]}`;
    const rawData = await fetch(url, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
        "Content-Type": "application/json",
      },
    });
    if (rawData.status == 200) {
      let jsonData = await rawData.json().then((res) => {
        handleViewProducts();
      });
    } else {
      let jsonData = await rawData.json();
    }
  };
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "beige" }}>
      <CardContent>
        <Typography
          sx={{ color: "teal" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {props.product.productname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Chip label={`Quantity:${props.product.quantity}`} variant="outlined" />
        <Chip label={`Price:${props.product.price}`} variant="outlined" />
        {/* <Typography size="small">Delete</Typography>
        <Button size="small">Quantity:{product.quantity}</Button> */}
      </CardActions>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <UpdateProductModal
          productData={props.product}
          handleViewProducts={props.handleViewProducts}
        />
        <Button
          size="small"
          color="error"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
