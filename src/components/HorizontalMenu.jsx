import { Link } from "react-router-dom";
import { Comunicacaoeconsultoria } from "./servicos/Comunicacaoeconsultoria";
import { Designgrafico } from "./servicos/DesignGrafico";
import { Marketingdigital } from "./servicos/MarketingDigital";
import { Websiteselojas } from "./servicos/Websiteselojas";
import {useState} from 'react';

const navegacao = {
  Marketingdigital: {
    header: "Marketing Digital",
    component: Marketingdigital,
  },
  Designgrafico: {
    header: "Design Gráfico",
    component: Designgrafico,
  },
  Websiteselojas: {
    header: "Websites & Lojas online",
    component: Websiteselojas,
  },
  Comunicacaoeconsultoria: {
    header: "Comunicação e Consultoria",
    component: Comunicacaoeconsultoria,
  },
};

export function HorizontalMenu(servicos) {
  const [page, setPage] = useState("Marketingdigital");

  const pageInfo = navegacao[page];

  return (
    <div className="container" style={{marginTop:'5em'}}>
      <div className="row">
      <ul className="horizontalMenu p-5">
        {Object.entries(navegacao).map(([key, item]) => (
          <li
            className={
              key == page ? "menuSection menuSectionActive" : "menuSection"
            }
            style={{ cursor: "pointer" }}
            onClick={() => {setPage(key)}}
          >
            {item.header}
          </li>
        ))}
      </ul>
      {<pageInfo.component servicos={servicos} />}
    </div>
    </div>
  );
}
