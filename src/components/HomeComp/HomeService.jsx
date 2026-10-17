import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import BackgroundService from "../../images/HomePage/HomeService/bacground.jpeg";

export default function HomeService() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundService})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pt: 15,
        backgroundPosition: "center",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: "white",
          fontSize: { xs: "34px", sm: "44px", md: "54px" },
        }}
      >
        Our Expert Services
      </Typography>

      <Typography sx={{ textAlign: "center", color: "gray", fontSize: "18px" }}>
        Comprehensive solutions for every car need, ensuring your vehicle runs
        at its best.
      </Typography>

      <Box sx={{ mt: 7, p: 2 }} className="globalContainer">
        <Grid
          container
          gap={2}
          sx={{
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <Grid
            item
            lg={4}
            md={4}
            sm={5}
            xs={11}
            sx={{ p: 2, background: "#1C1C1D", opacity: "80%" }}
          >
            <img
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Icon-Our-Service2.png"
              alt=""
            />

            <Typography sx={{ color: "#fff", fontSize: "18px", mt: 2 }}>
              Brake & Transmission
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "16px", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </Typography>
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={5}
            xs={11}
            sx={{ p: 2, background: "#1C1C1D", opacity: "80%" }}
          >
            <img
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Icon-Our-Service2.png"
              alt=""
            />

            <Typography sx={{ color: "#fff", fontSize: "18px", mt: 2 }}>
              Brake & Transmission
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "16px", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          gap={2}
          sx={{
            mt: { xs: 10 },
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <Grid
            item
            lg={4}
            md={4}
            sm={5}
            xs={11}
            sx={{ p: 2, background: "#1C1C1D", opacity: "80%" }}
          >
            <img
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Icon-Our-Service2.png"
              alt=""
            />

            <Typography sx={{ color: "#fff", fontSize: "18px", mt: 2 }}>
              Brake & Transmission
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "16px", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </Typography>
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={5}
            xs={11}
            sx={{ p: 2, background: "#1C1C1D", opacity: "80%" }}
          >
            <img
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Icon-Our-Service2.png"
              alt=""
            />

            <Typography sx={{ color: "#fff", fontSize: "18px", mt: 2 }}>
              Brake & Transmission
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "16px", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
