import { Check } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import BackgroundBox from "../../images/HomePage/HomeBox/bacground.png";

export default function HomeBox() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundBox})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pt: 10,
      }}
    >
      <Box className="globalContainer">
        <Box sx={{ mt: { xs: 5, sm: 10, md: 20, lg: 90 }, p: 2 }}>
          <Typography
            sx={{
              pb: 2,
              color: "white",
              fontSize: { xs: "34px", sm: "44px", md: "54px" },
              fontWeight: "bold",
            }}
          >
            Why Trust Us?
          </Typography>

          <Grid
            container
            gap={2}
            mt={4}
            sx={{ pt: 4, borderTop: "2px solid gray", p: 2 }}
          >
            <Grid item lg={2.7} md={2.7} sm={5} xs={11}>
              <Check
                sx={{
                  color: "white",
                  p: 1,
                  background: "red",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                }}
              />
              <Typography sx={{ color: "#fff", fontSize: "24px", mt: 2 }}>
                Experienced Professionals
              </Typography>
              <Typography sx={{ color: "gray", fontSize: "18px", mt: 1 }}>
                No hidden charges. Honest service every time.
              </Typography>
            </Grid>
            <Grid item lg={2.7} md={2.7} sm={5} xs={11}>
              <Check
                sx={{
                  color: "white",
                  p: 1,
                  background: "red",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                }}
              />
              <Typography sx={{ color: "#fff", fontSize: "24px", mt: 2 }}>
                Experienced Professionals
              </Typography>
              <Typography sx={{ color: "gray", fontSize: "18px", mt: 1 }}>
                No hidden charges. Honest service every time.
              </Typography>
            </Grid>
            <Grid item lg={2.7} md={2.7} sm={5} xs={11}>
              <Check
                sx={{
                  color: "white",
                  p: 1,
                  background: "red",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                }}
              />
              <Typography sx={{ color: "#fff", fontSize: "24px", mt: 2 }}>
                Experienced Professionals
              </Typography>
              <Typography sx={{ color: "gray", fontSize: "18px", mt: 1 }}>
                No hidden charges. Honest service every time.
              </Typography>
            </Grid>
            <Grid item lg={2.7} md={2.7} sm={5} xs={11}>
              <Check
                sx={{
                  color: "white",
                  p: 1,
                  background: "red",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                }}
              />
              <Typography sx={{ color: "#fff", fontSize: "24px", mt: 2 }}>
                Experienced Professionals
              </Typography>
              <Typography sx={{ color: "gray", fontSize: "18px", mt: 1 }}>
                No hidden charges. Honest service every time.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
