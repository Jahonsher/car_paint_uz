import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ModalVideo from "./ModalVideo";

export default function HomeAbout() {
  return (
    <Box
      sx={{
        backgroundImage:
          "url('https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Backgrounds-Section-2-.png')",
        pt: 10,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pb: 10,
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
          }}
          gap={4}
        >
          <Grid item lg={5} md={5} sm={10} xs={11}>
            <Typography
              sx={{
                fontSize: { xs: "34px", sm: "44px", md: "54px" },
                color: "white",
              }}
            >
              Who We Are
            </Typography>
            <Typography sx={{ color: "gray", mt: 3 }}>
              At [Company Name], we believe every car has its unique journey and
              story. Our mission? To ensure that story continues with safety,
              reliability, and renewed vigor. With over [XX years] in the
              automotive industry, our team combines traditional craftsmanship
              with modern technology, bringing you unparalleled service and
              expertise
            </Typography>
          </Grid>
          <Grid item lg={5} md={5} sm={10} xs={11}>
            <Box
              sx={{
                backgroundImage:
                  "url('https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Background-Video.png')",
                width: "100%",
                height: "300px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                lineHeight: "300px",
              }}
            >
              <ModalVideo videoSrc={"WVl6g5hvcDA"} />
            </Box>
          </Grid>
        </Grid>

        {/* <Box
          sx={{
            textAlign: "center",
            mt: 12,
            width: { xs: "300px", sm: "400px", md: "500px", lg: "700px" },
            margin: "0 auto",
          }}
        >
          <img
            style={{ width: "100%" }}
            src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Team-1-1024x417.png"
            alt=""
          />
        </Box> */}
      </Box>
    </Box>
  );
}
