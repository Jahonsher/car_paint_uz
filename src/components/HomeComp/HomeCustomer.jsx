import { LocationCity } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

import BoxLogo1 from "../../images/HomePage/HomeCustomers/logo1.png";
import BoxLogo2 from "../../images/HomePage/HomeCustomers/logo2.png";
import BoxLogo3 from "../../images/HomePage/HomeCustomers/logo3.webp";

import BoxProduct1 from "../../images/HomePage/HomeCustomers/product1.jpg";
import BoxProduct2 from "../../images/HomePage/HomeCustomers/product2.jpg";
import BoxProduct3 from "../../images/HomePage/HomeCustomers/product3.jpg";

export default function HomeCustomer() {
  return (
    <Box
      sx={{
        background: "black",
        pt: 15,
      }}
    >
      <Box sx={{ p: 2 }} className="globalContainer">
        <Grid container justifyContent={"space-between"}>
          <Grid item lg={5}>
            <Typography
              sx={{
                fontSize: { xs: "34px", sm: "44px", md: "54px" },
                color: "white",
                fontWeight: "bold",
                lineHeight: "70px",
              }}
            >
              What Our Customers Say
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Typography sx={{ color: "gray" }}>
              Discover firsthand accounts from clients who have experienced the
              benefits of our products and services.
            </Typography>

            <Button variant="contained" color="error" sx={{ mt: 6 }}>
              Lead More
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            justifyContent: { xs: "center", sm: "center", md: "space-between" },
          }}
          mt={5}
          gap={3}
        >
          <Grid
            item
            lg={3.5}
            md={3.5}
            sm={5}
            xs={11}
            sx={{ background: "#1C1C1D" }}
          >
            <img width={"100%"} src={BoxProduct1} alt="" />

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                background: "gray",
                opacity: "80%",
                width: "auto",
                p: 1,
              }}
            >
              <img
                style={{
                  width: "100px",
                }}
                src={BoxLogo1}
                alt=""
              />
              <Box>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Orbay
                </Typography>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Orbay Product
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2, mt: 3 }}>
              <Typography
                sx={{ fontSize: "22px", color: "white", fontWeight: "bold" }}
              >
                Great Reparation!
              </Typography>

              <Typography sx={{ color: "gray" }}>
                Lorem ipsum dolor sit amet consectetur. Tortor nunc consequat
                diam amet lacus felis. Augue sapien fringilla sed donec massa in
                lobortis. Natoque congue malesuada aliquet vitae egestas.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            lg={3.5}
            md={3.5}
            sm={5}
            xs={11}
            sx={{ background: "#1C1C1D" }}
          >
            <img width={"100%"} src={BoxProduct2} alt="" />

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                background: "gray",
                opacity: "80%",
                width: "auto",
                p: 1,
              }}
            >
              <img
                style={{
                  width: "60px",
                }}
                src={BoxLogo2}
                alt=""
              />
              <Box>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Axalta
                </Typography>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Axalta Product
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2, mt: 3 }}>
              <Typography
                sx={{ fontSize: "22px", color: "white", fontWeight: "bold" }}
              >
                Great Reparation!
              </Typography>

              <Typography sx={{ color: "gray" }}>
                Lorem ipsum dolor sit amet consectetur. Tortor nunc consequat
                diam amet lacus felis. Augue sapien fringilla sed donec massa in
                lobortis. Natoque congue malesuada aliquet vitae egestas.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            lg={3.5}
            md={3.5}
            sm={5}
            xs={11}
            sx={{ background: "#1C1C1D" }}
          >
            <img width={"100%"} src={BoxProduct3} alt="" />

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                background: "gray",
                opacity: "80%",
                width: "auto",
                p: 1,
              }}
            >
              <img
                style={{
                  width: "120px",
                }}
                src={BoxLogo3}
                alt=""
              />
              <Box>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Nargil
                </Typography>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Nargil Product
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2, mt: 3 }}>
              <Typography
                sx={{ fontSize: "22px", color: "white", fontWeight: "bold" }}
              >
                Great Reparation!
              </Typography>

              <Typography sx={{ color: "gray" }}>
                Lorem ipsum dolor sit amet consectetur. Tortor nunc consequat
                diam amet lacus felis. Augue sapien fringilla sed donec massa in
                lobortis. Natoque congue malesuada aliquet vitae egestas.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography
            sx={{
              fontSize: { xs: "34px", sm: "44px", md: "54px" },
              color: "white",
              textAlign: "center",
            }}
          >
            Book Your Service Now
          </Typography>

          <Grid container justifyContent={"center"} gap={2} mt={3}>
            <Grid
              item
              lg={2.7}
              md={2.7}
              sm={5}
              xs={11}
              sx={{ display: "flex", gap: "10px" }}
            >
              <LocationCity sx={{ color: "red", fontSize: "28px" }} />
              <Box>
                <Typography sx={{ color: "#fff" }}>
                  Physical Address:
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  Sunset Road No 11 Denpasar, Bali
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              lg={2.7}
              md={2.7}
              sm={5}
              xs={11}
              sx={{ display: "flex", gap: "10px" }}
            >
              <LocationCity sx={{ color: "red", fontSize: "28px" }} />
              <Box>
                <Typography sx={{ color: "#fff" }}>
                  Physical Address:
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  Sunset Road No 11 Denpasar, Bali
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              lg={2.7}
              md={2.7}
              sm={5}
              xs={11}
              sx={{ display: "flex", gap: "10px" }}
            >
              <LocationCity sx={{ color: "red", fontSize: "28px" }} />
              <Box>
                <Typography sx={{ color: "#fff" }}>
                  Physical Address:
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  Sunset Road No 11 Denpasar, Bali
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              lg={2.7}
              md={2.7}
              sm={5}
              xs={11}
              sx={{ display: "flex", gap: "10px" }}
            >
              <LocationCity sx={{ color: "red", fontSize: "28px" }} />
              <Box>
                <Typography sx={{ color: "#fff" }}>
                  Physical Address:
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  Sunset Road No 11 Denpasar, Bali
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
