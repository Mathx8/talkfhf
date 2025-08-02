import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "FHF",
  "/login": "FHF - Login",
  "/gerenciador": "FHF - Gerenciador",
  "/plantel": "FHF - Plantel",
  "/museu": "FHF - Museu",
  "/libertadores": "FHF - Libertadores",
  "/draft-cup": "FHF - Draft Cup",
};

export default function useTitleFromRoute() {
  const location = useLocation();

  useEffect(() => {
    const basePath = location.pathname.split("/")[1];
    const path = location.pathname.startsWith("/plantel/") ? "/plantel" : `/${basePath}`;
    document.title = titles[path] || "FHF";
  }, [location]);
}