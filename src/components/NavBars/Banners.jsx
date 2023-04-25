
import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const tutorialSteps = [
  {
    imgPath: "https://c.wallhere.com/photos/72/81/AI_art_rabbits-2223182.jpg!d",
    label: "Banner Image 1",
  },
  {
    imgPath:
      "https://c.wallhere.com/photos/3c/0c/grass_ears_rabbits_three_eyes-1014879.jpg!d",
    label: "Banner Image 2",
  },
  {
    imgPath:
      "https://cdn.shopify.com/s/files/1/0503/9485/7670/files/1_05f5d4c3-a6a1-4cbf-8b35-d08a028f3d59.png?v=1678447354&width=3840",
    label: "Banner Image 3",
  },
];

export default function Carousel() {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

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
          height: "50vh",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "transparent",
          boxShadow: "none", // Remove the box shadow
          margin: 0, // Remove the margin
        }}
      >
        <Typography>{tutorialSteps[activeStep].label}</Typography>
        <img
          src={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
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
