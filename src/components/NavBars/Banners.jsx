import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const tutorialSteps = [
  {
    imgPath: "https://cdn.shopify.com/s/files/1/1149/5008/files/HEKA_Desktop_2.png",
    label: "Banner Image 1",
  },
  {
    imgPath:
      "https://cdn.shopify.com/s/files/1/1149/5008/files/Web_banners_2_-05_5e060261-62a3-459c-b629-8761367d26da.png",
    label: "Banner Image 2",
  },
  {
    imgPath:
      "https://cdn.shopify.com/s/files/1/1149/5008/files/MAG_NEW_UI_MAIN_BANNER_1440_x_300PX_Desktop_151d425b-dd83-46c3-b2c6-dbc824b0959f.png",
    label: "Banner Image 3",
  },
];

export default function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 8000);
    return () => clearInterval(interval);
  }, [maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "35vh",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "transparent",
          boxShadow: "none",
          margin: 0,
        }}
      >
        <Typography>{tutorialSteps[activeStep].label}</Typography>
        <img
          src={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ backgroundColor: "transparent" }}
        nextButton={
          <Button size="small" onClick={handleNext}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
}
