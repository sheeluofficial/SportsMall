import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MetaData from "../layouts/MataData/MataData";
import TermsImage from "../../Image/about/tc.jpg";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  about_us: {
    paddingTop: "8rem",
    paddingBottom: "4rem",
    backgroundColor: "white !important",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  container_12: {
    padding: "2rem",
    textAlign: "center",

    backgroundColor: "white !important",
    maxWidth: "100%",
  },
  image_about: {
    width: "100%",
    height: "auto",
    marginTop: "3rem",
    marginBottom: "2rem",
  },
  title_about: {
    color: "#414141",
    fontSize: "14px",
    padding: "2rem 1rem 2rem",
    fontFamily: "Roboto",
    fontWeight: "500 !important",
  },
  heading12_about: {
    fontSize: "1rem",
    padding: "2rem 1rem 2rem",
    fontWeight: "400 !important",
    color: "#414141",
    textAlign: "center",
  },
  introText_about: {
    maxWidth: "800px",

    lineHeight: "1.5",
    margin: "1.5rem 0",
    color: "#292929",
    fontSize: "1.2rem",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.8rem 1rem",
  },
  infoText_about: {
    lineHeight: "1.5",
    margin: "2rem 0",
    color: "#292929",
    fontSize: "1rem",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.8rem 1rem",
  },
  buttonContainer_about: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 0",
    width: "100%",
    marginTop: "1rem",
  },
  button1_about: {
    backgroundColor: "#000000 !important",
    color: "white !important",
    width: "fit-content !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "3.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      color: "white !important",
    },
  },
  button2_about: {
    backgroundColor: "#292929 !important",
    color: "white   !important",
    width: "fit-content     !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "1.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      color: "white !important",
    },
  },
}));

const About_UsPage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.about_us}>
        <MetaData title={"About Us"} />
        <Container className={classes.container_12}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <img
                src={TermsImage}
                alt="SportsMall"
                className={classes.image_about}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h2"
                component="h1"
                className={classes.title_about}
              >
                About Us
              </Typography>
              <Typography variant="body1" className={classes.introText_about}>
                Our company, established in 2019, is a flourishing online sports
                retail startup. We have built a strong presence in the market,
                serving over 20,000 customers across various online platforms
                and social media channels. Our diverse range of sports products
                caters to athletes and sports enthusiasts of all kinds. We take
                pride in offering high-quality sporting goods under our
                exclusive brand, ensuring that our customers have access to
                top-notch equipment for their favorite sports and activities".
              </Typography>
              <Typography variant="body1" className={classes.introText_about}>
                Our company was founded by a passionate athlete with experience
                representing Under 16 and Under 19 teams. The business was
                initiated to cover expenses and quickly gained popularity,
                serving over 20,000 customers to date. Now, our focus is on
                expanding internationally by launching a dedicated website. We
                are introducing a diverse range of authentic sports products at
                competitive prices, aiming to cater to athletes and sports
                enthusiasts worldwide.
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.container_12}>
          <Typography
            variant="h3"
            component="h1"
            className={classes.heading12_about}
          >
            Who We Are
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
          
Our company is dedicated to delivering superior sports equipment and accessories to enthusiasts worldwide. Our mission revolves around empowering athletes with top-quality tools to elevate their performance in their respective sports. Centered on innovation, craftsmanship, and unwavering customer satisfaction, we have earned a reputation as a reliable and trusted brand within the sports community.
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
            Since our inception in 2019, we have built a strong customer base
            and expanded our product range to cater to the diverse needs of
            players at every level. We take pride in offering genuine Sports
            products that are carefully curated and tested for quality and
            performance. Our team of experts works closely with manufacturers to
            ensure that our customers receive top-notch products.
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
          Since our establishment in 2019, we have cultivated a robust customer base and broadened our product selection to meet the varied requirements of players at all levels. We take great pride in providing authentic sports products, meticulously curated and rigorously tested for quality and performance. Our dedicated team of experts collaborates closely with manufacturers to guarantee that our customers receive unparalleled, top-quality products.
          </Typography>
        </Container>
        <Container className={classes.container_12}>
          <Typography
            variant="h3"
            component="h1"
            className={classes.heading12_about}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
           
Our mission at SportsMall is to deliver superior Sports equipment and accessories at affordable prices, making the sport accessible to players across the globe while nurturing their passion for the game. We are committed to offering an extensive selection of Sports gear, ranging from bats and balls to protective equipment and accessories, all meticulously designed to meet the highest standards of quality and performance.
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
            We are committed to continuously innovating and improving our
            product range to meet the evolving needs of Sporters. Our team of
            experts works closely with manufacturers and conducts rigorous
            quality testing to ensure that every product we offer delivers
            exceptional performance on the field. We believe that every player
            deserves the best tools to enhance their skills and achieve their
            sports goals.
          </Typography>

          <div className={classes.buttonContainer_about}>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className={classes.button1_about}>
                Our Products
              </Button>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className={classes.button2_about}>
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About_UsPage;
