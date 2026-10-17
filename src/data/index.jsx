import Product1 from "../images/HomePage/HomeCustomers/product1.jpg";
import Product2 from "../images/HomePage/HomeCustomers/product2.jpg";
import Product3 from "../images/HomePage/HomeCustomers/product3.jpg";
import Product4 from "../images/HomePage/HomeCustomers/product4.png";
import Product5 from "../images/HomePage/HomeCustomers/product5.png";
import Product6 from "../images/HomePage/HomeCustomers/product6.jpg";

import Brand1 from "../images/HomePage/HomeCustomers/logo1.png";
import Brand2 from "../images/HomePage/HomeCustomers/logo2.png";
import Brand3 from "../images/HomePage/HomeCustomers/logo3.webp";
import { Call, Email, LocationCity } from "@mui/icons-material";

export const MenuData = [
  {
    title: "home",
    path: "/",
  },
  {
    title: "about",
    path: "/about",
  },
  {
    title: "products",
    path: "/product",
  },

  {
    title: "news",
    path: "/news",
  },
  {
    title: "contact",
    path: "/contact",
  },
];

export const HomeProducts = [
  {
    img: Product1,
    title: "Orday",
  },
  {
    img: Product4,
    title: "Multi Fill",
  },
  {
    img: Product2,
    title: "Nargil",
  },
  {
    img: Product5,
    title: "Uni Fill",
  },
  {
    img: Product3,
    title: "Axalta",
  },
  {
    img: Product6,
    title: "Calva",
  },
  // {
  //   img: Product7,
  //   title: "Orday",
  // },
];

export const CategoryProduct = [
  {
    title: "Wooden Surface Product",
  },
  {
    title: "Concrete Surface Product",
  },
  {
    title: "Metal Surface Product",
  },
];

export const BrandProduct = [
  {
    title: "PPG",
    img: Brand1,
  },
  {
    title: "Duxone",
    img: Brand2,
  },
  {
    title: "Akzo Nobel Akripol",
    img: Brand3,
  },
  {
    title: "Polaron boya",
    img: Brand3,
  },
  {
    title: "Orbay",
    img: Brand3,
  },
  {
    title: "Befar",
    img: Brand3,
  },
  {
    title: "Terason(Henkel)",
    img: Brand3,
  },
  {
    title: "CST kimya",
    img: Brand3,
  },
  
];

export const NewsData = [
  {
    img: "https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/08/News-1.jpg",
    title: "What Are the Benefits of Electric Vehicles for Climate?",
    text: "Commodo consequat aute irure dolor in reprehenderit",
  },
  {
    img: "https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/08/News-6.jpg",
    title: "Blanket for electric cars helps preserve battery",
    text: "Commodo consequat aute irure dolor in reprehenderit",
  },
  {
    img: "https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/08/News-5.jpg",
    title: "Could fill electric car batteries 90% in 10 mins",
    text: "Commodo consequat aute irure dolor in reprehenderit",
  },

  {
    img: "https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/08/News-4.jpg",
    title: "The greatelectric car raceis just beginning",
    text: "Commodo consequat aute irure dolor in reprehenderit",
  },
  {
    img: "https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/08/News-3.jpg",
    title: "The greatelectric car raceis just beginning",
    text: "Commodo consequat aute irure dolor in reprehenderit",
  },
  {
    img: "https://kit.nirmanavisual.com/autobest/wp-content/uploads/sites/39/2023/08/News-2.jpg",
    title: "The greatelectric car raceis just beginning",
    text: "Commodo consequat aute irure dolor in reprehenderit",
  },
];

export const ContactData = [
  {
    img: <Email sx={{ color: "white", fontSize: "30px" }} />,
    title: "jasur03@gmail.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    link: "mailto:jasur03@gmail.com",
  },
  {
    img: <Call sx={{ color: "white", fontSize: "30px" }} />,
    title: "90-933-78-72",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    link: "tel:+99890-933-78-72",
  },
  {
    img: <LocationCity sx={{ color: "white", fontSize: "30px" }} />,
    title: "Янгихаётский район, Ташкен",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    link: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11977.516587544587!2d69.22619796826174!3d41.36584658365923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c4f07809581%3A0x110498511f463d1d!2z0JzQsNGF0LDQu9C70Y8g0K_QvdCz0Lgg0KLQsNGI0LrQtdC90YI!5e0!3m2!1sru!2s!4v1701362580038!5m2!1sru!2s",
  },
];
