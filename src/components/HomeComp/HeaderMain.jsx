import React from "react";
import HeaderMenu from "../AllComp/HeaderMenu";
import { Box, Grid, IconButton, Typography } from "@mui/material";

import GifHeader from "../../video/headerMain.gif";
import VideoHeader from "../../video/videoHeader.mp4";

import "./styles/HeaderMain.css";
import { PlayArrow } from "@mui/icons-material";
import ModalVideo from "./ModalVideo";

export default function HeaderMain({ lang, setLang }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${GifHeader})`,
        backgroundSize: "cover",
      }}
    >
      <HeaderMenu lang={lang} setLang={setLang} />

      <Box className="globalContainer" sx={{ mt: 10, pb: 12 }}>
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
          alignItems={"start"}
          gap={3}
        >
          <Grid item lg={8} md={8} sm={10} xs={11}>
            <Typography sx={{ color: "gray", fontSize: "20px" }}>
              PROFESSIONAL AND FAST
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "30px", sm: "28px", md: "44px", lg: "94px" },
                fontWeight: "bold",
              }}
            >
              CAR REPAIR & AUTO SERVICE
            </Typography>
          </Grid>

          {/* <Grid item lg={5} md={5} sm={10} xs={11} sx={{ textAlign: "end" }}>
            <img
              style={{ width: "300px" }}
              src="https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Mechanic-1.png"
              alt=""
            />
          </Grid> */}
        </Grid>

        <Box
          sx={{ mt: 5, p: 2, display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Grid container gap={3} alignItems={"center"}>
            <Grid
              item
              lg={7}
              md={7}
              sm={10}
              xs={12}
              sx={{
                textAlign: "center",
                display: "flex",
                gap: "20px",
                background: "#404041",
                alignItems: "center",
                p: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundImage:
                    "url('https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/09/Background-Video.png')",
                  width: "250px",
                  height: "150px",
                  lineHeight: "150px",
                }}
              >
                <ModalVideo videoSrc={"deIRy4U6Yn0"} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "30px", color: "white" }}>
                  10k+
                </Typography>
                <Typography sx={{ fontSize: "18px", color: "gray" }}>
                  satisfied customers
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "30px", color: "white" }}>
                  10k+
                </Typography>
                <Typography sx={{ fontSize: "18px", color: "gray" }}>
                  satisfied customers
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={10}
              xs={11}
              sx={{ textAlign: "center" }}
            >
              <Typography sx={{ color: "white" }}>
                Where precision meets passion. We breathe new life into every
                vehicle, ensuring it’s not just repaired, but rejuvenated
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
