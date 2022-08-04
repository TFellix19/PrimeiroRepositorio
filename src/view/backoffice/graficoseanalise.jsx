import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../CSS/dashboard.css";
import { Navbar } from "../../components/Navbar";
import { Chart } from "react-google-charts";

export const data = [
  [
    "Element",
    "Density",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["Janeiro", 250, "color: #ffc107", null],
  ["Fevereiro", 300, "color: #ffc107", null],
  ["Março", 220, "color: #ffc107", null],
  ["Abril", 250, "color: #ffc107", null],
  ["Maio", 300, "color: #ffc107", null],
  ["Junho", 220, "color: #ffc107", null],
  ["Julho", 250, "color: #ffc107", null],
  ["Agosto", 300, "color: #ffc107", null],
  ["Setembro", 220, "color: #ffc107", null],
  ["Outubro", 250, "color: #ffc107", null],
  ["Novembro", 300, "color: #ffc107", null],
  ["Dezembro", 220, "color: #ffc107", null],
];

export const options = {
  title: "Número de pedidos por mês",
  width: "auto",
  height: 400,
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

//segundo grafico

export const infooo = [
  [
    "Year",
    "Marketing Digital",
    "Design Gráfico",
    "Web & Lojas",
    "Com. & Consult.",
  ],
  ["2019", 800, 400, 1000, 400],
  ["2020", 700, 460, 1034, 600],
  ["2021", 760, 800, 1200, 500],
  ["2022", 630, 540, 800, 200],
];

export const opcoes = {
  title: "Número de pedidos de serviço por ano",
  width: "auto",
  height: 400,
  curveType: "function",
  legend: { position: "bottom" },
};


export const data1 = [
  ["Mês", "Clientes"],
  ["Janeiro", 1000 ],
  ["Fevereiro", 1170],
  ["Março", 660],
  ["Abril", 1030],
  ["Maio", 800],
  ["Junho", 330],
  ["Julho", 530],
  ["Agosto", 390],
  ["Setembro", 700],
  ["Outubro", 800],
  ["Novembro", 1030],
  ["Dezembro", 400],
];

export const options1 = {
  title: "Numero de clientes por mês",
  hAxis: { title: "mês", titleTextStyle: { color: "#ffc107" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%"},
  colors: ["#ffc107"],
};


function App() {
  return (
    <>
      <Navbar page="Graficoseanalise" />

      <div className="container" style={{marginTop:'10em', marginLeft:'35em'}}>
        <div className="row">
          <div className="col-9">
            <div className="card w-auto h-auto me-5">
              <div className="card-body">
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="400px"
                  data={data}
                  options={options}
                />
              </div>
              
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="card w-auto h-auto">
              <div className="card-body">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="400px"
                  data={infooo}
                  options={opcoes}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card w-auto h-auto">
              <div className="card-body">
              <Chart
                chartType="AreaChart"
                width="100%"
                height="400px"
                data={data1}
                options={options1}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
