# Software Engineer Portfolio

A beautiful, responsive portfolio website built with React.js and Tailwind CSS, showcasing professional experience, skills, and projects.

## ✨ Features

- **Fully Responsive Design** - Optimized for all devices and screen sizes
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Sections** - Home, About, Experience, Skills, Projects, Contact
- **Smooth Scrolling** - Navigation with smooth scroll to sections
- **Contact Form** - Functional contact form for inquiries
- **Social Links** - Integration with GitHub, LinkedIn, and other platforms

## 🛠️ Built With

- **React.js** - Frontend framework
- **Vite** - Build tool for fast development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero/landing section
│   ├── About.jsx       # About section
│   ├── Experience.jsx  # Work experience
│   ├── Skills.jsx      # Skills and technologies
│   ├── Projects.jsx    # Project showcase
│   ├── Contact.jsx     # Contact form
│   └── Footer.jsx      # Footer component
├── App.jsx             # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles with Tailwind
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`. The primary color palette uses blue tones:
- `primary-500`: Main brand color
- `primary-600`: Hover states
- `gray-*`: Text and background variations

### Content
Update the content in each component file:
- Personal information in `Hero.jsx`
- Work experience in `Experience.jsx`
- Skills and technologies in `Skills.jsx`
- Projects in `Projects.jsx`
- Contact information in `Contact.jsx`

### Styling
- Tailwind CSS classes are used throughout
- Custom animations defined in `tailwind.config.js`
- Component-specific styles in `index.css`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy
The `dist` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

Md Polash Miya - [polashmiya2015@gmail.com](mailto:polashmiya2015@gmail.com)

Project Link: [https://github.com/polashmiya/personal-portfolio](https://github.com/polashmiya/personal-portfolio)
