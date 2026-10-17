import React, { useEffect, useState } from "react";
import Products from "./products";
import { Box, Typography } from "@mui/material";
import { getProducts } from "../../dataQuery/data.fn";

export default function HomeProducts({ lang, setLang }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function getData() {
      const query = {
        params: {
          limit: 15,
          page: 1,
        },
      };
      const res = await getProducts(query);
      // console.log(res);
      if (mounted) {
        setData(Array.isArray(res?.data) ? res.data : []);
        setLoading(false);
      }
    }

    getData();
    return () => { mounted = false; };
  }, []);

  return (
    <Box sx={{ background: "black", p: 4 }}>
      <Box className="globalContainer">
        <Typography
          sx={{
            fontSize: { xs: "28px", sm: "36px", md: "44px", lg: "54px" },
            color: "white",
            textAlign: "center",
          }}
        >
          {lang === 'ru' ? 'Наша продукция' : lang === 'en' ? 'Our products' : 'Mahsulotlarimiz'}
        </Typography>
        {data.length ? <Products data={data} lang={lang} setLang={setLang} /> : <p className="auto-product-status" role="status">{loading
          ? (lang === 'ru' ? 'Загрузка продукции…' : lang === 'en' ? 'Loading products…' : 'Mahsulotlar yuklanmoqda…')
          : (lang === 'ru' ? 'Уточните ассортимент и наличие по телефону или откройте каталог.' : lang === 'en' ? 'Ask us about products and availability, or open the catalog.' : 'Assortiment va mavjudlikni telefon orqali aniqlashtiring yoki katalogni oching.')}</p>}
      </Box>
    </Box>
  );
}
