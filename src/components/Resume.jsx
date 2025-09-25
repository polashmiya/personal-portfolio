import React from "react";

const resumeData = {
  name: "Md. Polash Miya",
  contact: {
    phone: "+88 01719623984",
    email: "polashmiya2015@gmail.com",
    github: "https://github.com/polashmiya",
    address: "Uttarkhan, Uttara, Dhaka-1230"
  },
  experiences: [
    {
      title: "Software Engineer I",
      org: "AKIJ iBOS Limited | An AKIJ Company",
      date: "June 2024 – Present",
      location: "Dhaka, Bangladesh",
      responsibilities: [
        "Created/maintained responsive React JS apps for cross-browser suitability.",
        "Integrated front-end with RESTful APIs for seamless data flow.",
        "Collaborated with UX designers for consistent user experience on all devices."
      ]
    },
    {
      title: "Junior Software Engineer",
      org: "AKIJ iBOS Limited | An AKIJ Company",
      date: "April 2022 – June 2024",
      location: "Dhaka, Bangladesh",
      responsibilities: [
        "Building responsive web interface using HTML, CSS, JavaScript, React JS.",
        "Assisting in debugging, issue resolution, and performance optimization."
      ]
    }
  ],
  projects: [
    {
      name: "MANAGERIUM, An ERP Based Solution",
      description: [
        "Significantly contributed as Managerium's lead front-end developer in shaping the ERP solution.",
        "Played a pivotal role in developing essential features including sales, purchase, accounts, and HR.",
        "Utilized broad business module expertise to ensure exceptional solution delivery."
      ]
    },
    {
      name: "APON ERP, An ERP Based Solution for Apon Wellbeing Ltd",
      description: [
        "Led the Promotion Management module's creation, ensuring seamless promotions.",
        "Developed crucial features for the Insurance Management module and played a role in enhancing various project aspects."
      ]
    },
    {
      name: "AKIJ ERP, An ERP Based Solution for AKIJ",
      description: [
        "Actively contributed during my tenure at Akij ERP by developing and implementing critical features such as Internal Expense, Advance in Payment, and Internal Control within the ERP system."
      ]
    }
  ],
  skills: {
    expertise: ["JavaScript", "ES6", "React.js", "Redux", "React Router", "React Hook", "Material UI"],
    comfortable: ["Rtk Query", "Node JS", "Express.js", "SQL", "C#", "Ant Design", "Tailwind"],
    tools: ["GitHub", "GitLab", "Heroku", "Netlify", "Terminal"]
  },
  education: {
    institute: "Dhaka Polytechnic Institute (DPI)",
    degree: "Diploma in Engineering (CMT)"
  }
};

const Resume = (props) => {
  const pdfMode = props.pdfMode || false;
  return (
    <section
      className={
        pdfMode
          ? "pdf-export text-black !p-0 !m-0 !shadow-none !rounded-none !max-w-none !mx-0 !text-xs"
          : "max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 text-gray-900"
      }
      style={
        pdfMode
          ? {
              fontSize: "11px",
              lineHeight: "1.3",
              width: "210mm",
              minHeight: "297mm",
              maxHeight: "297mm",
              padding: "12mm",
              margin: 0,
              boxSizing: "border-box",
              overflow: "hidden"
            }
          : {}
      }
    >
      {/* Header */}
      <header className={pdfMode ? "border-b pb-2 mb-3" : "border-b pb-4 mb-6"}>
        <h1 className={pdfMode ? "text-lg font-bold text-primary-600" : "text-3xl font-bold text-primary-600"}>{resumeData.name}</h1>
        <div className={pdfMode ? "mt-1 text-xs space-y-0.5" : "mt-2 text-sm space-y-1"}>
          <div><span className="font-semibold">Phone:</span> {resumeData.contact.phone}</div>
          <div><span className="font-semibold">Gmail:</span> {resumeData.contact.email}</div>
          <div><span className="font-semibold">GitHub:</span> <a href={resumeData.contact.github} className="text-primary-500 underline" target="_blank" rel="noopener noreferrer">{resumeData.contact.github}</a></div>
          <div><span className="font-semibold">Present Address:</span> {resumeData.contact.address}</div>
        </div>
      </header>

      {/* Experiences */}
      <section className={pdfMode ? "mb-3" : "mb-8"}>
        <h2 className={pdfMode ? "text-base font-bold text-primary-500 mb-1" : "text-xl font-bold text-primary-500 mb-2"}>Experiences</h2>
        {resumeData.experiences.map((exp) => (
          <div key={exp.title + exp.date} className={pdfMode ? "mb-2" : "mb-4"}>
            <div className={pdfMode ? "flex flex-col justify-between items-start" : "flex flex-col md:flex-row md:justify-between md:items-center"}>
              <div>
                <span className="font-semibold">{exp.title}</span> <span className="text-gray-600">@ {exp.org}</span>
              </div>
              <div className={pdfMode ? "text-xs text-gray-500" : "text-sm text-gray-500 md:text-right"}>{exp.date} | {exp.location}</div>
            </div>
            <ul className={pdfMode ? "list-disc ml-4 mt-1 text-xs" : "list-disc ml-6 mt-2 text-sm"}>
              {exp.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className={pdfMode ? "mb-3" : "mb-8"}>
        <h2 className={pdfMode ? "text-base font-bold text-primary-500 mb-1" : "text-xl font-bold text-primary-500 mb-2"}>Projects</h2>
        <div className={pdfMode ? "grid grid-cols-1 gap-1" : ""}>
          {resumeData.projects.map((proj) => (
            <div key={proj.name} className={pdfMode ? "mb-1" : "mb-4"}>
              <div className="font-semibold">{proj.name}</div>
              <ul className={pdfMode ? "list-disc ml-4 mt-1 text-xs" : "list-disc ml-6 mt-2 text-sm"}>
                {proj.description.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className={pdfMode ? "mb-3" : "mb-8"}>
        <h2 className={pdfMode ? "text-base font-bold text-primary-500 mb-1" : "text-xl font-bold text-primary-500 mb-2"}>Technical Skills</h2>
        {pdfMode ? (
          <div className="text-xs">
            <div><span className="font-semibold">Expertise:</span> {resumeData.skills.expertise.join(", ")}</div>
            <div><span className="font-semibold">Comfortable:</span> {resumeData.skills.comfortable.join(", ")}</div>
            <div><span className="font-semibold">Tools:</span> {resumeData.skills.tools.join(", ")}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold">Expertise:</div>
              <ul className="list-disc ml-6 mt-1">
                {resumeData.skills.expertise.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div>
              <div className="font-semibold">Comfortable:</div>
              <ul className="list-disc ml-6 mt-1">
                {resumeData.skills.comfortable.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div>
              <div className="font-semibold">Tools:</div>
              <ul className="list-disc ml-6 mt-1">
                {resumeData.skills.tools.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Education */}
      <section>
        <h2 className={pdfMode ? "text-base font-bold text-primary-500 mb-1" : "text-xl font-bold text-primary-500 mb-2"}>Education</h2>
        <div className={pdfMode ? "font-semibold text-xs" : "font-semibold"}>{resumeData.education.institute}</div>
        <div className={pdfMode ? "text-xs" : "text-sm"}>{resumeData.education.degree}</div>
      </section>
    </section>
  );
};

export default Resume;
