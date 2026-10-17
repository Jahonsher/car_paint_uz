import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSingleProduct } from "../../dataQuery/data.service";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function SingleContainer({ lang, }) {
  const [imgUrl, setImgUrl] = useState("");

  const { id } = useParams();

  const { data: singleProduct, isLoading } = useSingleProduct(id);

  useEffect(() => {
    if (singleProduct) {
      setImgUrl(singleProduct?.data?.product_image_url[0]);
    }
  }, [singleProduct]);

  return isLoading ? (
    <Loading />
  ) : (
    <Box sx={{ background: "black", pt: 6, pb: 6 }}>
      <Box className="globalContainer">
        <Grid container gap={3} justifyContent={"center"} sx={{ p: 2 }}>
          <Grid item lg={5} md={5} sm={8} xs={12}>
            {singleProduct?.data?.product_image_url?.map((v, i) => (
              <img
                key={i}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  display: v === imgUrl ? "block" : "none",
                }}
                src={v}
                alt=""
              />
            ))}

            <Box sx={{ display: "flex", gap: "15px", flexWrap: "wrap", mt: 3 }}>
              {singleProduct?.data?.product_image_url?.map((v, i) => (
                <button
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => setImgUrl(v)}
                >
                  <img
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "3px",
                    }}
                    src={v}
                    alt=""
                  />
                </button>
              ))}
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={8} xs={12}>
            <Typography sx={{ fontSize: "44px", color: "white" }}>
              {lang === "ru"
                ? singleProduct?.data?.product_title_ru
                : lang === "uz"
                ? singleProduct?.data?.product_title_uz
                : singleProduct?.data?.product_title_en}
            </Typography>
            <p
              style={{ color: "white", fontSize: "16px", mt: 2 }}
              dangerouslySetInnerHTML={{
                __html:
                  lang === "ru"
                    ? singleProduct?.data?.product_description_ru
                    : lang === "uz"
                    ? singleProduct?.data?.product_description_uz
                    : singleProduct?.data?.product_description_en,
              }}
            >
              {}
            </p>

            <Typography sx={{ fontSize: "34px", color: "#ffff", mt: 2 }}>
              30 000 so'm
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
