export const metadata = {
  title: 'Mission Control',
  description: 'Projects, approvals, heartbeats, and cron calendar'
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
