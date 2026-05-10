import { useState } from "react";
import { useNavController } from "./controllers/controllers";
import { Navbar } from "./components/Navbar";
import { PaginaInicio } from "./views/Views";
import { PaginaInfraestrutura } from "./views/InfrastructurePage";
import { PaginaIndustrias } from "./views/IndustriesPage";
import { PaginaPID } from "./views/PagePID";
import { PaginaSaibaMais } from "./views/PageLearnMore";
import { PaginaDecisao } from "./views/PaginaDecisao";
import ChatBot from "./components/ChatBot";

export default function App() {
  const { pagina, setPagina } = useNavController();
  const [persona, setPersona] = useState(null);

  const PAGINAS = {
    inicio:         <PaginaInicio setPagina={setPagina} persona={persona} setPersona={setPersona} />,
    infraestrutura: <PaginaInfraestrutura persona={persona} />,
    industrias:     <PaginaIndustrias persona={persona} />,
    pid:            <PaginaPID persona={persona} />,
    decisao:        <PaginaDecisao persona={persona} />,
    saiba:          <PaginaSaibaMais />,
  };

  return (
    <div className="font-sans min-h-screen bg-[#F7F8FA]">
      <Navbar pagina={pagina} setPagina={setPagina} persona={persona} />
      {PAGINAS[pagina]}
      <ChatBot />
    </div>
  );
}