import "@styles/globals.css";

import Navigation from "@components/Navigation";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts"
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {/* Navigation component placed here so is visible on all pages */}
            <Navigation />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
