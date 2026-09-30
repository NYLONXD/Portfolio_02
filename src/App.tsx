import About from "./components/About";
import Boot from "./components/Boot";
import Console from "./components/Console";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Log from "./components/Log";
import Stack from "./components/Stack";
import StatusBar from "./components/StatusBar";
import Work from "./components/Work";
import { TerminalProvider } from "./terminal/TerminalProvider";

const App = () => (
  <TerminalProvider>
    <a className="skip" href="#main">
      Skip to content
    </a>
    <Boot />
    <StatusBar />
    <Console />
    <main id="main">
      <Hero />
      <About />
      <Work />
      <Stack />
      <Log />
      <Contact />
    </main>
    <Footer />
  </TerminalProvider>
);

export default App;
