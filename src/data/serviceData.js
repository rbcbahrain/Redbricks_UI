import CleaningImg from '../assets/images/Cleaning.png';
import AC_Service from '../assets/images/AC_Service.png';
import Plumber from '../assets/images/Plumber.png';
import Electrician from '../assets/images/Electrician.png';
import AC_Repair from '../assets/images/AC_Repair.png';
import AC_Installation from '../assets/images/Split_AC.png';


export const masterscreenlist = [
  {
    id: 1,
    name: "Category",
    image: CleaningImg,
    link: "/CategoryList",
  },
  {
    id: 21,
    name: "Service Type",
    image: AC_Service,
    link: "/ServiceTypeList",
  },
  {
    id: 3,
    name: "Services",
    image: Plumber,
    link:"/ServiceList",
  },
  {
    id: 4,
    name: "Upcoming",
    image: Electrician,
    link:null,
  },
];



export const categories = [
  {
    id: 1,
    name: "Cleaning",
    image: CleaningImg,
  },
  {
    id: 21,
    name: "AC Service",
    image: AC_Service,
  },
  {
    id: 3,
    name: "Plumbing",
    image: Plumber,
  },
  {
    id: 4,
    name: "Electrical",
    image: Electrician,
  },
];





export const services = {
  1: [
    {
      id: 101,
      name: "Home Cleaning",
      price: 100,
      duration: "2 hours",
      image:
        "https://images.unsplash.com/photo-1581579187745-ec0e49f019ae?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Deep Cleaning",
      price: 180,
      duration: "4 hours",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=200&q=80",
    },
  ],
  2: [
    {
      id: 201,
      name: "AC Repair",
      price: 200,
      duration: "3 hours",
      image: AC_Repair,
    },
    {
      id: 202,
      name: "AC Installation",
      price: 250,
      duration: "2 hours",
      image: AC_Installation,
    },
  ],
  3: [
    {
      id: 301,
      name: "Leak Fix",
      price: 120,
      duration: "1.5 hours",
      image:
        "https://images.unsplash.com/photo-1590080877617-b5fddc1d455b?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 302,
      name: "Pipe Replacement",
      price: 180,
      duration: "3 hours",
      image:
        "https://images.unsplash.com/photo-1590080877288-2a46a9c8e0d6?auto=format&fit=crop&w=200&q=80",
    },
  ],
  4: [
    {
      id: 401,
      name: "Light Installation",
      price: 150,
      duration: "2 hours",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 402,
      name: "Electrical Repairs",
      price: 160,
      duration: "2.5 hours",
      image:
        "https://images.unsplash.com/photo-1512446733611-9099a758e6db?auto=format&fit=crop&w=200&q=80",
    },
  ],



};