import React from "react";
import { Link } from "react-router-dom";
import {BsArrowReturnLeft} from "react-icons/bs";
const navegacao = {
  Dashboard: {
    header: "Dashboard",
    href: "/dashboard",
    icon: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 55"
        height="37"
        width="37"
    >
        <path d="M25.5 19.5V6H42V19.5ZM6 25.5V6H22.5V25.5ZM25.5 42V22.5H42V42ZM6 42V28.5H22.5V42ZM9 22.5H19.5V9H9ZM28.5 39H39V25.5H28.5ZM28.5 16.5H39V9H28.5ZM9 39H19.5V31.5H9ZM19.5 22.5ZM28.5 16.5ZM28.5 25.5ZM19.5 31.5Z" />
    </svg>`,
  },
  Graficoseanalise: {
    header: " Gráficos e analise",
    href: "/graficoseanalise",
    icon: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 55 55"
        height="37"
        width="37"
    >
        <path d="M8.333 33.333V15H12.792V33.333ZM17.792 33.333V8.333H22.208V33.333ZM27.208 33.333V21.667H31.667V33.333Z" />
    </svg>`,
  },
  Packseservicos: {
    header: "Packs e serviços",
    href: "/packseservicos",
    icon: ` <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 55 55"
        height="37"
        width="37"
    >
        <path d="M5 35V28.292L12.875 20.417L5.75 13.25Q5.333 12.833 5.146 12.313Q4.958 11.792 4.958 11.292Q4.958 10.792 5.146 10.271Q5.333 9.75 5.75 9.333L9.333 5.75Q9.75 5.333 10.25 5.146Q10.75 4.958 11.292 4.958Q11.792 4.958 12.312 5.146Q12.833 5.333 13.25 5.75L20.417 12.917L28.375 4.958Q28.583 4.75 28.833 4.667Q29.083 4.583 29.333 4.583Q29.625 4.583 29.875 4.667Q30.125 4.75 30.333 4.958L35.042 9.667Q35.25 9.875 35.333 10.125Q35.417 10.375 35.417 10.625Q35.417 10.917 35.333 11.167Q35.25 11.417 35.042 11.625L27.083 19.583L34.25 26.75Q34.667 27.167 34.854 27.688Q35.042 28.208 35.042 28.75Q35.042 29.25 34.854 29.75Q34.667 30.25 34.25 30.667L30.667 34.208Q30.25 34.625 29.75 34.833Q29.25 35.042 28.75 35.042Q28.208 35.042 27.708 34.833Q27.208 34.625 26.792 34.208L19.625 27.083L11.708 35ZM14.875 18.417 18.417 14.875 15.75 12.167 13.75 14.167 11.792 12.208 13.792 10.208 11.292 7.75 7.75 11.292ZM28.667 32.25 32.208 28.708 29.75 26.208 27.75 28.208 25.792 26.25 27.792 24.25 25.083 21.583 21.542 25.125ZM7.792 32.208H10.5L27.375 15.375L24.625 12.625L7.792 29.5ZM29.333 13.417 32.042 10.667 29.333 7.958 26.583 10.667Z" />
    </svg>`,
  },
  pedidos: {
    header: "Pedidos",
    href: "/pedidos",
    icon: ` <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 55 55"
        height="37"
        width="37"
    >
        <path
            d="M9.5 36.667Q7.583 36.667 6.25 35.333Q4.917 34 4.917 32.083V26.958H10.125V3.333L12.625 5.833L15.083 3.333L17.583 5.833L20.083 3.333L22.583 5.833L25.083 3.333L27.583 5.833L30.083 3.333L32.583 5.833L35.083 3.333V32.083Q35.083 34 33.75 35.333Q32.417 36.667 30.5 36.667ZM30.5 33.875Q31.292 33.875 31.792 33.375Q32.292 32.875 32.292 32.083V7.792H12.875V26.958H28.708V32.083Q28.708 32.875 29.208 33.375Q29.708 33.875 30.5 33.875ZM14.917 14.375V11.625H24.917V14.375ZM14.917 19.792V17H24.917V19.792ZM28.625 14.375Q28.042 14.375 27.625 13.979Q27.208 13.583 27.208 13Q27.208 12.417 27.625 12.021Q28.042 11.625 28.625 11.625Q29.167 11.625 29.583 12.021Q30 12.417 30 13Q30 13.583 29.583 13.979Q29.167 14.375 28.625 14.375ZM28.625 19.625Q28.042 19.625 27.625 19.229Q27.208 18.833 27.208 18.25Q27.208 17.667 27.625 17.271Q28.042 16.875 28.625 16.875Q29.167 16.875 29.583 17.271Q30 17.667 30 18.25Q30 
    18.833 29.583 19.229Q29.167 19.625 28.625 19.625ZM9.458 33.875H25.917V29.708H7.708V32.083Q7.708 32.875 8.208 33.375Q8.708 33.875 9.458 33.875ZM7.708 33.875Q7.708 33.875 7.708 33.375Q7.708 32.875 7.708 32.083V29.708V33.875Z"
        />
    </svg>`,
  },
};

export function Navbar({ page, hidePageName = false }) {
  const pageInfo = navegacao[page];

  return (
    <>
      <div className="topnavss">
        <img
          className="logo"
          src={"./assets/logoincommun.png"}
          alt="Logótipo da incommun"
          width="240px"
          height="42.26px"
        />
       <Link to="/" ><BsArrowReturnLeft className="float-end" style={{width:'4em', height:'auto', color:'white'}}/> </Link>
      </div>
      <div>
        <ul className="nav-align ulll">
          {Object.entries(navegacao).map(([key, item]) => (
            <li className={key==page?'liii active':'liii'}>
            <Link style={{display:'flex', alignItems:'center'}} to={item.href}>
        <div dangerouslySetInnerHTML={{__html:item.icon}}/> 
            {item.header}
            </Link>
          </li>
          ))}
        </ul>
      </div>
    </>
  );
}
