
export type WeddingCard = {
  id: number;
  image: string;
  title: string;
  desc: string;
  date: string;
  location: string;
  index: string;
  gallery: string[];
};

const cards: WeddingCard[] = [
  {
    id: 1,
    image: "/couple1/hero.png",
    title: "Nithesh and Poojitha",
    desc: "A royal celebration of love in Udaipur.",
    date: "Oct 7, 2024",
    location: "Udaipur",
    index: "01",
    gallery: [
      "/couple1/img1.png",
      "/couple1/img2.png",
      "/couple1/img3.png",
      
      "/couple1/img5.png",
      "/couple1/img6.png",
      "/couple1/img7.png",
      "/couple1/img8.png",
      "/couple1/img9.png",
      "/couple1/img10.png",
      "/couple1/img11.png",
      "/couple1/img12.png",
    ],
  },
  {
    id: 2,
    image: "/couple2/hero.png",
    title: "Prakruthi & Sudarshan",
    desc: "A timeless wedding in Singapore's heritage district.",
    date: "Aug 25, 2024",
    location: "Singapore",
    index: "02",
    gallery: [
      "/couple2/img1.png",
      "/couple2/img2.png",
      "/couple2/img3.png",
      "/couple2/img4.png",
      "/couple2/img5.png",
      "/couple2/img6.png",
      "/couple2/img7.png",
      "/couple2/img8.png",
      "/couple2/img9.png",
    ],
  },
  {
    id: 3,
    image: "/couple3/hero.png",
    title: "Khajukathara & Preetham",
    desc: "Bollywood glamour meets tradition in Mumbai.",
    date: "Aug 8, 2024",
    location: "Mumbai",
    index: "03",
    gallery: [
      "/couple3/img1.png",
      "/couple3/img2.png",
      "/couple3/img3.png",
      "/couple3/img4.png",
      "/couple3/img5.png",
      "/couple3/img6.png",
      "/couple3/img7.png",
      "/couple3/img8.png",
      "/couple3/img9.png",
      "/couple3/img10.png",
    ],
  },
  {
    id: 4,
    image: "/couple4/hero.png",
    title: "Ani & Neha",
    desc: "A vibrant beachside wedding full of joy.",
    date: "Apr 24, 2024",
    location: "Goa",
    index: "04",
    gallery: [
      "/couple4/img1.png",
      "/couple4/img2.png",
      "/couple4/img3.png",
      "/couple4/img4.png",
      "/couple4/img5.png",
      "/couple4/img6.png",
      "/couple4/img7.png",
    ],
  },
  {
    id: 5,
    image: "/couple5/hero.png",
    title: "Sameeksha & Shravan",
    desc: "A colorful destination wedding in Jaipur.",
    date: "Jul 12, 2024",
    location: "Jaipur",
    index: "05",
    gallery: [
      "/couple5/img1.png",
      "/couple5/img2.png",
      "/couple5/img3.png",
      "/couple5/img4.png",
      "/couple5/img5.png",
      "/couple5/img6.png",
      "/couple5/img7.png",
      "/couple5/img8.png",
      "/couple5/img9.png",
      "/couple5/img10.png",
      "/couple5/img11.png",
    ],
  },
  {
    id: 6,
    image: "/couple6/hero.png",
    title: "Shraddha and Neelgriv",
    desc: "A cross-cultural celebration in Goa.",
    date: "Jun 18, 2024",
    location: "Goa",
    index: "06",
    gallery: [
      "/couple6/img1.png",
      "/couple6/img2.png",
      "/couple6/img3.png",
      "/couple6/img4.png",
      "/couple6/img5.png",
      "/couple6/img6.png",
      "/couple6/img7.png",
      "/couple6/img8.png",
      "/couple6/img9.png",
    ],
  },
  {
    id: 7,
    image: "/couple7/img1.png",
    title: "Dheeraj and Sakshi",
    desc: "A classic Indian wedding with modern flair.",
    date: "May 5, 2024",
    location: "Delhi",
    index: "07",
    gallery: [
      
      "/couple7/img2.png",
      "/couple7/img3.png",
      "/couple7/img4.png",
      "/couple7/img5.png",
      "/couple7/img6.png",
      "/couple7/img7.png",
      "/couple7/img8.png",
      "/couple7/img9.png",
      "/couple7/img10.png",
      "/couple7/img11.png",
      "/couple7/img1.png",
    ],
  },
];

export default cards;