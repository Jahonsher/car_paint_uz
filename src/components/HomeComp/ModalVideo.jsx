import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(800px, calc(100% - 32px))",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  height: "400px",
};

export default function ModalVideo({ videoSrc, label = 'Play video', closeLabel = 'Close video' }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <IconButton
        aria-label={label}
        sx={{
          background: "red",
          p: 1,
          "&:hover": {
            background: "red",
          },
        }}
        onClick={handleOpen}
      >
        <PlayArrow sx={{ color: "white", fontSize: "30px" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
          <IconButton aria-label={closeLabel} onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, background: '#242522', color: '#fff', zIndex: 1 }}>×</IconButton>
          <iframe
            title={label}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoSrc}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </div>
  );
}
