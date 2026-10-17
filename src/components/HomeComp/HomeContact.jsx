import { Box, Button } from "@mui/material";
import React from "react";
import automotive from "../../localization/company";

import BackgroundContact from "../../images/HomePage/HomeContact/background.png";

export default function HomeContact({ lang = 'uz', compact = false }) {
  const text = automotive[lang] || automotive.uz;
  if (compact) return (
    <form className="auto-contact-form" onSubmit={event => {
      event.preventDefault();
      const values = new FormData(event.currentTarget);
      const body = `${text.name}: ${values.get('name') || ''}\n${text.email}: ${values.get('email') || ''}\n${text.phone}: ${values.get('phone') || ''}`;
      window.location.href = `mailto:info@carpaint.uz?subject=CarPaint&body=${encodeURIComponent(body)}`;
    }}>
      <div className="auto-field"><label htmlFor="home-name">{text.name}</label><input id="home-name" name="name" type="text" autoComplete="name" placeholder={text.name} /></div>
      <div className="auto-field"><label htmlFor="home-email">{text.email}</label><input id="home-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /></div>
      <div className="auto-field"><label htmlFor="home-phone">{text.phone}</label><input id="home-phone" name="phone" type="tel" autoComplete="tel" placeholder="+998" /></div>
      <p className="company-form-note">{text.formNote}</p>
      <button className="auto-button company-form-action" type="submit">{text.emailAction} ↗</button>
    </form>
  );
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundContact})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        backgroundPosition: "center",
        pt: { xs: 5, sm: 8, md: 10, lg: 20 },
        pb: { xs: 5, sm: 8, md: 10, lg: 20 },
      }}
    >
      <Box
        sx={{
          p: 2,
          background: "#1F1F1F",
          opacity: "60%",
          width: { xs: "200px", sm: "400px", md: "500px" },
        }}
        className="globalContainer"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label style={{ color: "white" }}>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            style={{
              border: "1px solid gray",
              outline: "none",
              padding: "14px 16px",
              background: "none",
              marginTop: "15px",
              color: "#ffff",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
          <label style={{ color: "white" }}>Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              border: "1px solid gray",
              outline: "none",
              padding: "14px 16px",

              background: "none",
              marginTop: "15px",
              color: "#ffff",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
          <label style={{ color: "white" }}>Your Number</label>
          <input
            type="text"
            placeholder="Enter your number"
            style={{
              border: "1px solid gray",
              outline: "none",
              padding: "14px 16px",

              background: "none",
              marginTop: "15px",
              color: "#ffff",
            }}
          />
        </Box>

        <Button fullWidth color="error" variant="contained" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
