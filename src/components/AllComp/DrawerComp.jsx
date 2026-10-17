import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { MenuData } from "../../data";
import content from "../../localization/content";
import LanguageComp from "./LanguageComp";

import "./DrawerStyle.scss";

import Logo from "../../logoBlack.png";

export default function DrawerComp({ lang, setLang }) {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Box sx={{ background: "black" }}>
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor="top"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "black",
            }}
          >
            <img
              style={{
                width: "150px",
                height: "100px",
                cursor: "pointer",
                objectFit: "cover",
              }}
              src={Logo}
              onClick={() => navigate("/")}
              alt=""
            />

            <LanguageComp lang={lang} setLang={setLang} />
          </Box>
          <List sx={{ width: "240px", p: 2 }}>
            {content[lang]?.headerMenuData?.links?.map((page, i) => (
              <ListItemButton key={i} onClick={() => setOpenDrawer(false)}>
                <ListItemIcon onClick={() => navigate(page.path)}>
                  <ListItemText sx={{ color: "white !important" }}>
                    {page.title}
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>

      <Box sx={{ marginLeft: "auto" }}>
        <IconButton
          sx={{ color: "white" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <Menu SX={{ color: "white" }} />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
