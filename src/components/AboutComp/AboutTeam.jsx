import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

export default function AboutTeam() {
  return (
    <Box
      sx={{
        background: "black",
        pt: 10,
        pb: 8,
      }}
    >
      <Box className="globalContainer">
        <Grid
          container
          sx={{
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "space-between",
              lg: "space-between",
            },
            alignItems: "center",
            p: 2,
          }}
          gap={3}
        >
          <Grid
            item
            lg={5}
            sx={{
              height: {
                xs: "auto",
                sm: "auto",
                md: "450px",
                lg: "500px",
              },
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",

                objectFit: "cover",
                borderRadius: "40px 0px 40px",
                border: "2px solid white",
              }}
              src="https://i.pinimg.com/564x/d9/c7/79/d9c779e4e3633d8511ab08ca1f09d70c.jpg"
              alt=""
            />
          </Grid>
          <Grid item lg={6}>
            <img
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Icon-Our-Service1.png"
              alt=""
            />
            <Typography sx={{ fontSize: "24px", color: "white" }}>
              Experience Team Work
            </Typography>
            <Typography sx={{ fontSize: "18px", color: "gray", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim venia. Quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>

            <Button variant="contained" color="error" sx={{ mt: 3 }}>
              Learn More
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "space-between",
              lg: "space-between",
            },
            alignItems: "center",
            mt: 8,
            p: 2,
          }}
          gap={3}
        >
          <Grid item lg={6}>
            <img
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Icon-Our-Service1.png"
              alt=""
            />
            <Typography sx={{ fontSize: "24px", color: "white" }}>
              Experience Team Work
            </Typography>
            <Typography sx={{ fontSize: "18px", color: "gray", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim venia. Quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>

            <Button variant="contained" color="error" sx={{ mt: 3 }}>
              Learn More
            </Button>
          </Grid>

          <Grid
            item
            lg={5}
            sx={{
              height: {
                xs: "auto",
                sm: "auto",
                md: "450px",
                lg: "500px",
              },
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "40px 0px 40px",
                border: "2px solid white",
              }}
              src="https://i.pinimg.com/564x/2c/88/0f/2c880ff0982ac8226945c7ce77e4181f.jpg"
              alt=""
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "space-between",
              lg: "space-between",
            },
            alignItems: "center",
            mt: 6,
            p: 2,
          }}
          gap={3}
        >
          <Grid
            item
            lg={5}
            sx={{
              height: {
                xs: "auto",
                sm: "auto",
                md: "450px",
                lg: "500px",
              },
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "40px 0px 40px",
                border: "2px solid white",
              }}
              src="https://i.pinimg.com/564x/93/85/f9/9385f9664ccab38cc670a7717ab7e70a.jpg"
              alt=""
            />
          </Grid>
          <Grid item lg={6}>
            <img
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Icon-Our-Service1.png"
              alt=""
            />
            <Typography sx={{ fontSize: "24px", color: "white" }}>
              Experience Team Work
            </Typography>
            <Typography sx={{ fontSize: "18px", color: "gray", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim venia. Quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>

            <Button variant="contained" color="error" sx={{ mt: 3 }}>
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
