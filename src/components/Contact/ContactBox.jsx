import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { ContactData } from "../../data";

export default function ContactBox() {
  return (
    <Box sx={{ background: "black", pt: 10, pb: 10 }}>
      <Box className="globalContainer">
        <Grid container justifyContent={"center"} gap={4}>
          {ContactData.map((v, i) => (
            <Grid
              item
              lg={3}
              sx={{ border: "1px solid #891111", p: 2, borderRadius: "6px" }}
            >
              <a
                href={v.link}
                target="blank_"
                style={{ textDecoration: "none" }}
              >
                <IconButton
                  sx={{
                    background: "#891111",
                    "&:hover": {
                      background: "#891111",
                    },
                  }}
                >
                  {v.img}
                </IconButton>

                <Typography sx={{ color: "white", fontSize: "18px", mt: 2 }}>
                  {v.title}
                </Typography>
                <Typography sx={{ color: "white", fontSize: "16px", mt: 2 }}>
                  {v.text}
                </Typography>
              </a>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
