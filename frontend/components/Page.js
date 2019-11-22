import { useEffect, useState } from "react";
import { ScrapeProvider } from "./ScrapeContext";

// Custom Hook
function useScrapes() {
  const [scrapes, setScrapes] = useState({ olxScrape: [] });
  useEffect(function() {
    (async () => {
      const res = await fetch("http://localhost:2094/data");
      const data = await res.json();

      setScrapes({ olxScrape: data });
    })();
  }, []);

  return scrapes;
}

export default function Page({ children }) {
  const scrapes = useScrapes();
  return (
    <ScrapeProvider
      value={{
        scrapes
      }}
    >
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
