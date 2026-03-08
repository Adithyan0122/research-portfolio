import './globals.css';
import MathBackground from '@/components/MathBackground';

export const metadata = {
  title: 'Adithyan — AI Research Portfolio',
  description: 'Building AI systems. Documenting every step. A researcher\'s portfolio showcasing versioned deep-dives into RAG, agents, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MathBackground />
        {children}
      </body>
    </html>
  );
}
