import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";

export default function Home() {
  document.title = "TalkFlow - Modern Messaging Made Simple";
  return (
    <>
      <Hero />
      <Stats />
      <Features />
    </>
  );
}
