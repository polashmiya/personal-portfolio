import eGadgetThumbnail from "./assets/e_gadget_thumbnail.png";
import polashDiaryThumbnail from "./assets/polash_dairy_thumbnail.png";
const heroSectionInfo = {
  name: "Md. Polash Miya",
  designation: "Software Engineer I",
  company: "AKIJ iBOS Limited",
  description:
    "Full-Stack Software Engineer specializing in React JS and modern web development, with proven experience in building scalable ERP solutions, responsive applications, and integrating RESTful APIs. Adept at collaborating with cross-functional teams, implementing clean architecture, and delivering business-critical features. Passionate about writing reusable, maintainable code and continuously enhancing full-stack development expertise to create impactful software solutions.",
};
  const projects = [
    {
      id: "e-Gadget",
      title: "E-Gadget (E-Commerce Platform)",
      description:
        "Full-featured e-commerce platform with product listings, shopping cart, payment integration, and user authentication.",
      image: eGadgetThumbnail,
      technologies: ["React", "Tailwind CSS", "React Hook Form", "React Router","Redux"],
      github: "https://github.com/polashmiya/eGadget_Ecommerce",
      live: "https://e-gadget-ecommerce.vercel.app/",
      details: [
        "Product catalog with filtering and category browsing",
        "Persistent cart and checkout flow with form validation (React Hook Form)",
        "User authentication and protected routes",
        "Global state management with Redux",
        "Responsive, mobile-first UI with Tailwind CSS",
        "Deployed on Vercel with optimized build via Vite"
      ],
      featured: true,
      category: "frontend",
    },
    {
      id: "blog_site",
      title: "Polash Diary (Blog Platform)",
      description:
        "A personal blog platform built with a focus on simplicity and performance. Where Anyone can share their thoughts and ideas. Anyone can read and comment on posts.",
      image: polashDiaryThumbnail,
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/polashmiya/polashDiary",
      live: "https://polash-diary.vercel.app/",
      details: [
        "Create, list, and read blog posts with a clean UX",
        "Commenting experience and smooth page transitions (Framer Motion)",
        "Client-side routing and lazy UI animations",
        "Responsive layout built with Tailwind CSS",
        "Deployed on Vercel for fast global delivery"
      ],
      featured: true,
      category: "frontend",
    },
  ];
export { heroSectionInfo, projects };
