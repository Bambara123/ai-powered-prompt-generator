import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// For SEO
export const metadata = {
  title: "PromptCraft",
  description: "Generate and Share prompts with your collegues",
};

// this used to wrap all other components.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>

        <div className="w-full mt-5 mb-3">
          <p className="text-center">This is the footer</p>
        </div>
      </body>
    </html>
  );
}
