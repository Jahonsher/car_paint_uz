import {
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

import DrawerComp from "../AllComp/DrawerComp";
import { Call, Email, LocationCity } from "@mui/icons-material";

import LogoWhite from "../../logoBlack.png";
import LanguageComp from "./LanguageComp";
import content from "../../localization/content";

export default function HeaderMenu({ lang, setLang }) {
  const navigate = useNavigate();

  //   Responsive Menu
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
      className="globalContainer"
    >
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
          justifyContent: "space-between",
        }}
      >
        <img
          style={{
            width: "200px",
            cursor: "pointer",
            height: "100px",
            objectFit: "cover",
          }}
          src={LogoWhite}
          onClick={() => navigate("/")}
          alt=""
        />
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Call sx={{ color: "red" }} />
            <Box>
              <Typography sx={{ color: "white" }}>Contact Details</Typography>
              <a
                href="tel:+998909557555"
                style={{ color: "white", textDecoration: "none" }}
              >
                Phone: 909557555
              </a>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Email sx={{ color: "red" }} />
            <Box>
              <Typography sx={{ color: "white" }}>Contact Details</Typography>
              <Typography sx={{ color: "white" }}>info@carpaint.uz</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <LocationCity sx={{ color: "red" }} />
            <Box>
              <Typography sx={{ color: "white" }}>Contact Details</Typography>
              <Typography sx={{ color: "white" }}>Yangi Tashkent</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{}}>
        <Toolbar
          sx={{
            borderBottom: "1px solid white",
            padding: "0px !important",
            zIndex: "100",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {isMatch ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "150px",
                    height: "100px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  src={LogoWhite}
                  onClick={() => navigate("/")}
                  alt=""
                />

                <Box>
                  <DrawerComp lang={lang} setLang={setLang} />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#891111",
                  p: 2,
                  borderRadius: "2px",
                }}
              >
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                      lg: "block",
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: "20px", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        display: { xs: "none", sm: "block" },
                      }}
                    >
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
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      background: "#343434",
                      "&:hover": { background: "#343434" },
                    }}
                  >
                    Contact
                  </Button>
                  <LanguageComp lang={lang} setLang={setLang} />
                </Box>
              </Box>
            </>
          )}
        </Toolbar>
      </Box>
    </Box>
  );
}
