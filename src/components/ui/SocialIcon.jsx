import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { LuMail, LuGlobe } from 'react-icons/lu';

const ICONS = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedinIn,
  Email: LuMail,
};

export default function SocialIcon({ label, className = '' }) {
  const Icon = ICONS[label] ?? LuGlobe;
  return <Icon className={className} aria-hidden="true" />;
}
