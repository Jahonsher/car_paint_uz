import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { checkboxClasses } from "@mui/material/Checkbox";

import "./styles/ProductContainer.scss";
import ProductCard from "./ProductCard";
import {
  useBrands,
  useCategories,
  useSubCategories,
} from "../../dataQuery/data.service";
import { getProducts } from "../../dataQuery/data.fn";



export default function ProductContainer({ lang, setLang }) {
  const { data: category } = useCategories();

  const { data: brands } = useBrands({ limit: 40, page: 1 });

  const [data, setData] = useState([]);

  const [currentCategory, setCurrentCategory] = useState(null);

  const { data: subCategory, refetch: refetchsubCategory } = useSubCategories(
    currentCategory ? currentCategory?.category_id : null
  );

  const [currentSubcategory, setCurrentSubCategory] = useState(null);

  const [search, setSearch] = useState("");

  const [brand, setBrand] = useState([]);

  useEffect(() => {
    async function getData() {
      const query = {
        params: {
          limit: 15,
          page: 1,
        },
        body: {
          brand_id: brand,
          category_id: currentCategory ? currentCategory?.category_id : null,
          sub_category_id: currentSubcategory
            ? currentSubcategory?.sub_category_id
            : null,
          search_uz: search,
        },
      };
      const res = await getProducts(query);
      // console.log(res);
      setData(res?.data);
    }

    getData();
  }, [brand, currentCategory, currentSubcategory, search]);

  return (
    <Box
      sx={{
        background: "black",
        pt: 10,
        pb: 6,
      }}
    >
      <Box className="globalContainer">
        <Grid
          container
          justifyContent={{
            xs: "center",
            sm: "center",
            md: "space-between",
            lg: "space-between",
          }}
          gap={4}
          sx={{ p: 2 }}
        >
          <Grid item lg={3} md={3} sm={10} xs={11}>
            <Box
              sx={{
                p: 2,
                borderRadius: "20px 0px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.4) 0px 3px 7px -3px",
                background: "#891111",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "24px", color: "white" }}>
                  {lang === "ru"
                    ? currentSubcategory
                      ? currentSubcategory?.sub_category_name_ru
                      : currentCategory
                      ? currentCategory?.category_name_ru
                      : "Categories"
                    : lang === "uz"
                    ? currentSubcategory
                      ? currentSubcategory?.sub_category_name_uz
                      : currentCategory
                      ? currentCategory?.category_name_uz
                      : "Categories"
                    : currentSubcategory
                    ? currentSubcategory?.sub_category_name_en
                    : currentCategory
                    ? currentCategory?.category_name_en
                    : "Categories"}
                </Typography>
                <Button
                  sx={{ display: currentCategory ? "block" : "none" }}
                  onClick={() => {
                    if (currentSubcategory) {
                      setCurrentSubCategory(null);
                    } else if (currentCategory) {
                      setCurrentCategory(null);
                    }
                  }}
                >
                  back
                </Button>
              </Box>

              <Box
                sx={{
                  mt: 2,
                  display: currentCategory ? "none" : "flex",
                  flexDirection: "column",
                }}
              >
                {category?.data?.map((v, i) => (
                  <Button
                    key={i}
                    sx={{
                      background: "#893333",
                      color: "white",
                      "&:hover": {
                        background: "white",
                        color: "black",
                      },
                      mt: 2,
                      textAlign: "start !important",
                    }}
                    onClick={() => {
                      setCurrentCategory(v);
                      setTimeout(() => {
                        refetchsubCategory();
                      }, 0);
                    }}
                  >
                    {lang === "ru"
                      ? v.category_name_ru
                      : lang === "uz"
                      ? v.category_name_uz
                      : v.category_name_en}
                  </Button>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 2,
                  display: currentCategory ? "flex" : "none",
                  flexDirection: "column",
                }}
              >
                {subCategory?.data?.map((v, i) => (
                  <Button
                    key={i}
                    sx={{
                      background: "black",
                      color: "white",
                      "&:hover": {
                        background: "white",
                        color: "black",
                      },
                      mt: 2,
                    }}
                    onClick={() => {
                      setCurrentSubCategory(v);
                    }}
                  >
                    {lang === "ru"
                      ? v.sub_category_name_ru
                      : lang === "uz"
                      ? v.sub_category_name_uz
                      : v.sub_category_name_en}
                  </Button>
                ))}
              </Box>

              <Typography sx={{ fontSize: "24px", color: "white", mt: 3 }}>
                Brand
              </Typography>

              <Box sx={{ mt: 2 }}>
                {brands?.data.map((v, i) => (
                  <Box key={i}>
                    <FormControlLabel
                      sx={{
                        color: "white",
                        mt: 2,
                      }}
                      control={
                        <Checkbox
                          value={v.title}
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "white",
                            },
                          }}
                          className="check"
                          checked={brand.includes(v.brand_id)}
                          onChange={() => {
                            if (brand.includes(v.brand_id)) {
                              setBrand((prev) =>
                                prev.filter((e) => e !== v.brand_id)
                              );
                            } else {
                              setBrand((prev) => [...prev, v.brand_id]);
                            }
                          }}
                        />
                      }
                      label={v.brand_name}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item lg={8} md={8} sm={10} xs={11}>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{
                width: "90%",
                padding: "13px 20px",
                outline: "none",
                borderBottom: "1px solid white",
                color: "white",
                background: "none",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                fontSize: "16px",

                "&:placeholder": {
                  color: "white",
                },
              }}
              placeholder="Search..."
            />
            <ProductCard data={data} lang={lang} setLang={setLang} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
