import { useNavController } from "./controllers/controllers";
import { Navbar } from "./components/Navbar";
import { PaginaInicio } from "./views/Views";
import { PaginaInfraestrutura } from "./views/InfrastructurePage";
import { PaginaIndustrias } from "./views/IndustriesPage";
import { PaginaPID } from "./views/PagePID";
import { PaginaSaibaMais } from "./views/PageLearnMore";

export default function App() {
  const { pagina, setPagina } = useNavController();

  const PAGINAS = {
    inicio:         <PaginaInicio setPagina={setPagina} />,
    infraestrutura: <PaginaInfraestrutura />,
    industrias:     <PaginaIndustrias />,
    pid:            <PaginaPID />,
    saiba:          <PaginaSaibaMais />,
  };

  return (
    <div className="font-sans min-h-screen bg-[#F7F8FA]">
      <Navbar pagina={pagina} setPagina={setPagina} />
      {PAGINAS[pagina]}
    </div>
  );
}
