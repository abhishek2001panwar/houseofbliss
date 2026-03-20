// lib/films.ts
// One entry per COUPLE. Each couple has a `videos` array.
// FilmsPage   → shows one card per couple  (uses videos[0] as the thumbnail)
// FilmSlugPage → shows ALL videos for that couple

export interface Video {
  slug: string;      // unique URL key  →  /films/[slug]
  category: string;  // e.g. "Haldi Teaser"
  src: string;       // Cloudinary URL
}

export interface Couple {
  coupleSlug: string;   // used for the listing card click  →  /films/couple/[coupleSlug]
  title: string;        // "Nithesh & Poojitha"
  year: string;
  location: string;
  videos: Video[];      // all teasers for this couple
}

const films: Couple[] = [
  {
    coupleSlug: "nithesh-poojitha",
    title: "Nithesh & Poojitha",
    year: "2024",
    location: "Bangalore",
    videos: [
      { slug: "nithesh-poojitha-1", category: "Haldi Teaser",      src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773891856/N_P_haldi_teaser_2_rbwle0.mp4" },
      { slug: "nithesh-poojitha-2", category: "Sangeet Teaser",    src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773891828/N_P_sangeet_teaser_1_rxfzuq.mp4" },
      { slug: "nithesh-poojitha-3", category: "Reception Teaser",  src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773891830/N_P_RECEPTION_TEASER_1_oldjjc.mp4" },
      { slug: "nithesh-poojitha-4", category: "Wedding Teaser",    src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773890779/N_P_WEDDING_TEASER_1_w2tcan.mp4" },
    ],
  },
  {
    coupleSlug: "prakruthi-sudarshan",
    title: "Prakruthi & Sudarshan",
    year: "2023",
    location: "Mysore",
    videos: [
      { slug: "prakruthi-sudarshan-1", category: "Film Teaser",  src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773892626/PRAKRUTHI_SUDARSHAN_2_1_tbzgwy.mp4" },
      { slug: "prakruthi-sudarshan-2", category: "Film Teaser",  src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773892883/PRAKRUTHI_SUDARSHAN_3_1_1_1_tfim5k.mp4" },
    ],
  },
  {
    coupleSlug: "sameeksha-shravan",
    title: "Sameeksha & Shravan",
    year: "2023",
    location: "Mysore",
    videos: [
      { slug: "sameeksha-shravan-1", category: "Reception Teaser",   src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893160/S_S_RECEPTION_TEASER_zsf5kg.mp4" },
      { slug: "sameeksha-shravan-2", category: "Wedding Teaser",     src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893182/S_S_WED_TEASER_4K_ddkmuw.mp4" },
      { slug: "sameeksha-shravan-3", category: "Varapooje Teaser",   src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893184/S_S_varapooje_teaser-_jzg3dh.mp4" },
      { slug: "sameeksha-shravan-4", category: "Film Teaser",        src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893181/SAMEEKSHA_S_M_S_TEASER_ig5yr5.mp4" },
      { slug: "sameeksha-shravan-5", category: "Save The Date",      src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893186/SAMEEKSHA_SHRAVAN_SAVE_THE_DATE_hssstd.mp4" },
      { slug: "sameeksha-shravan-6", category: "Haldi Teaser",       src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893183/SAMEEKASHA_HALDI_TEASER_tphgkt.mov" },
    ],
  },
  {
    coupleSlug: "shraddha-neelgriv",
    title: "Shraddha & Neelgriv",
    year: "2023",
    location: "Mysore",
    videos: [
      { slug: "shraddha-neelgriv-1", category: "Haldi Teaser",   src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893534/S_N_HALDI_TEASER_qwnjfv.mp4" },
      { slug: "shraddha-neelgriv-2", category: "Wedding Teaser", src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893547/S_N_WEDDING_TEASER_wee1jv.mp4" },
      { slug: "shraddha-neelgriv-3", category: "Film Teaser",    src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773893568/S_N_TEASER_1_tzeytd.mp4" },
    ],
  },
  {
    coupleSlug: "dheeraj-sakshi",
    title: "Dheeraj & Sakshi",
    year: "2023",
    location: "Mysore",
    videos: [
      { slug: "dheeraj-sakshi-1", category: "Wedding Teaser",   src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773894618/D_S_WEDDING_TEASER_1_1_ipnrf7.mp4" },
      { slug: "dheeraj-sakshi-2", category: "Save The Date",    src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773894603/S_D_SAVE_THE_DATE_REEL_-_sznuem.mp4" },
      { slug: "dheeraj-sakshi-3", category: "Film Teaser",      src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773894586/SHAKSHI_REEL_TEASER_1_pqclys.mp4" },
      { slug: "dheeraj-sakshi-4", category: "Haldi Teaser",     src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773894581/DHEERAJ_HALDI_TEASER_1_hvaxuo.mp4" },
    ],
  },
  {
    coupleSlug: "nitin-rachana",
    title: "Nitin & Rachana",
    year: "2023",
    location: "Coorg",
    videos: [
      { slug: "nitin-rachana-1", category: "Film Teaser", src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773910130/NITIN_RACHANA_SAVE_THE_DATE-_fcyfmo.mp4" },
      { slug: "nitin-rachana-2", category: "Film Teaser", src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773910646/JISHNA_DANUSH_PRE_WED_TEASER_so1v7d.mp4" },

    ],
  },
  {
    coupleSlug: "vidhya-pavan",
    title: "Vidhya & Pavan",
    year: "2022",
    location: "Goa",
    videos: [
      { slug: "vidhya-pavan-1", category: "Film Teaser", src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773911561/HALDI_TEASER_teaser_m4hqdx.mp4" },
      { slug: "vidhya-pavan-1", category: "Film Teaser", src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773911571/MEHNDI_TEASER_yh0rg1.mp4" },
      { slug: "vidhya-pavan-1", category: "Film Teaser", src: "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773911589/PAVAN_VIDYA_COMBINE_REEL_jll8rz.mp4" },

    ],
  },
];

export default films;