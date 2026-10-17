import { CarCrash, DirectionsCar } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

export default function AboutBox() {
  return (
    <Box
      sx={{
        background: "black",
        pt: 10,
      }}
    >
      <Box className="globalContainer">
        <Grid
          container
          sx={{
            justifyContent: { xs: "center", sm: "center", md: "space-between" },
            alignItems: "center",
          }}
          gap={3}
        >
          <Grid item lg={3} md={3} sm={10} xs={11}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "26px", md: "30px", lg: "44px" },
                color: "white",
                fontWeight: "bold",
              }}
            >
              We Are The Best
            </Typography>

            <Typography
              sx={{
                color: "gray",
                mt: 2,
              }}
            >
              At [Company Name], we believe every car has its unique journey and
              story. Our mission? To ensure that story continues with safety,
              reliability, and renewed vigor. With over [XX years] in the
              automotive industry, our team combines
            </Typography>

            <Button variant="contained" color="error" sx={{ mt: 4 }}>
              Learn More
            </Button>
          </Grid>

          <Grid
            item
            lg={8}
            md={8}
            sm={10}
            xs={11}
            sx={{
              background: "#1F1F20",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "30px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "235px", textAlign: "center" }}>
                <IconButton color="error" sx={{ background: "red" }}>
                  <DirectionsCar sx={{ color: "white", fontSize: "34px" }} />
                </IconButton>

                <Typography sx={{ color: "white", fontSize: "18px", mt: 2 }}>
                  Our Vision
                </Typography>
                <Typography sx={{ color: "gray", mt: 1 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus,.
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "250px",
                  textAlign: "center",
                  background: "red",
                  marginTop: { xs: "0px", sm: "0px", md: "-40px", lg: "-40px" },
                  borderRadius: "5px",
                }}
              >
                <IconButton color="error" sx={{ background: "red" }}>
                  <DirectionsCar sx={{ color: "white", fontSize: "34px" }} />
                </IconButton>

                <Typography sx={{ color: "white", fontSize: "18px", mt: 2 }}>
                  Our Vision
                </Typography>
                <Typography sx={{ color: "white", mt: 1 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus,.
                </Typography>
              </Box>

              <Box sx={{ width: "235px", textAlign: "center" }}>
                <IconButton color="error" sx={{ background: "red" }}>
                  <DirectionsCar sx={{ color: "white", fontSize: "34px" }} />
                </IconButton>

                <Typography sx={{ color: "white", fontSize: "18px", mt: 2 }}>
                  Our Vision
                </Typography>
                <Typography sx={{ color: "gray", mt: 1 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus,.
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ color: "gray", mt: 4 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              tenetur iure perspiciatis exercitationem blanditiis quaerat quas
              reprehenderit ut nihil fuga sapiente vitae vel cum perferendis,
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
