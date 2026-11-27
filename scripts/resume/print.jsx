// Print page for the PDF: renders only the resume, then signals once its fonts have loaded.
import { createRoot } from 'react-dom/client';
import Resume from '../../src/components/Resume.jsx';

createRoot(document.getElementById('root')).render(<Resume print />);

Promise.all([document.fonts.load('10.5pt Carlito'), document.fonts.load('bold 10.5pt Carlito')])
  .then(() => document.fonts.ready)
  .then(() => {
    document.body.dataset.ready = '1';
  });
