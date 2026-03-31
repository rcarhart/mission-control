export const metadata = {
  title: 'Mission Control',
  description: 'Tasks, project ownership, agent activity, and cron calendar in one premium dark operating surface'
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
