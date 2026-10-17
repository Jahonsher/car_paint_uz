import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import {  useNavigate } from "react-router-dom";

import Logo from "../../logoBlack.png";
import content from "../../localization/content";

export default function Footer({lang}) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: "#891111",
        p: 3,
      }}
    >
      <Box className="globalContainer" sx={{ background: "#1F1F20", p: 2 }}>
        <Grid container justifyContent={"center"} gap={3}>
          <Grid item lg={3}>
            <img
              style={{
                width: "200px",
                height: "100px",
                cursor: "pointer",
                objectFit: "cover",
              }}
              src={Logo}
              onClick={() => navigate("/")}
              alt=""
            />
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ color: "gray" }}>
                Sunset Road No 11 Denpasar, Bali​ - Indonesia
              </Typography>
              <Typography sx={{ color: "gray" }}>info@carpaint.uz</Typography>
              <a
                href="tel:+998909557555"
                style={{ color: "gray", textDecoration: "none" }}
              >
                Phone: 909557555
              </a>
            </Box>
          </Grid>
          <Grid item lg={2.5}>
            <Typography
              sx={{ fontSize: "20px", color: "#fff", textAlign: "center" }}
            >
              Other Page
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
              {content[lang]?.headerMenuData?.links?.map((item, i) => (
                <Button
                  key={i}
                  sx={{
                    color: "white",
                    fontWeight: "500",
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          </Grid>

          <Grid item lg={5}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11977.516587544587!2d69.22619796826174!3d41.36584658365923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c4f07809581%3A0x110498511f463d1d!2z0JzQsNGF0LDQu9C70Y8g0K_QvdCz0Lgg0KLQsNGI0LrQtdC90YI!5e0!3m2!1sru!2s!4v1701362580038!5m2!1sru!2s"
              width="100%"
              height="250"
            ></iframe>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
