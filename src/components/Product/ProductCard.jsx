import { Box, Typography } from "@mui/material";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { HomeProducts } from "../../data";

import "./styles/ProductCard.scss";
import { Link } from "react-router-dom";

export default function ProductCard({ data, lang, setLang }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: { xs: "center", sm: "center", md: "start" },
        mt: 3,
      }}
    >
      {data?.map((v, i) => (
        <Link key={i} to={`/single/${v.product_id}`}>
          <Box
            sx={{
              width: "250px",
              position: "relative",
              height: "300px",
              borderTopLeftRadius: "20px",
              border: "1px solid white",
            }}
            className="productBox"
          >
            <img
              style={{
                width: "150px",
                position: "absolute",
                bottom: "0%",
                right: "0%",
              }}
              className="productImage"
              src={v.product_image_url[0]}
              alt=""
            />
            <Typography
              sx={{
                color: "white",
                fontSize: "20px",
                textAlign: "center",
                mt: 3,
              }}
              className="productText"
            >
              {lang === "ru"
                ? v.product_title_ru
                : lang === "uz"
                ? v.product_title_uz
                : v.product_title_en}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
