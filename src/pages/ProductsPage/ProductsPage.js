import { Button, Container, Typography } from "@mui/material";
import CustomCard from "../../components/CustomCard";
import styles from "./ProductsPage.module.css";

import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../../components/Header";
import AddProductModal from "./AddProductModal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProductsPage({
  productsData,
  shopData,
  handleViewProducts,
}) {
  console.log(productsData);
  return (
    <>
      <Header />
      <Container className={styles.pageContainer}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ paddingTop: "1em" }} gutterBottom>
            {shopData[0].shopName.toUpperCase()}
          </Typography>

          <AddProductModal
            shopData={shopData}
            handleViewProducts={handleViewProducts}
          />

          {productsData.length ? (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {productsData.map((product, index) => (
                <Grid item xs={12} sm={5} md={4} key={index}>
                  {/* <Item> */}
                  <CustomCard
                    product={product}
                    handleViewProducts={handleViewProducts}
                  />
                  {/* </Item> */}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" sx={{ padding: "1em" }} gutterBottom>
              {"There are no products added yet"}
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}
