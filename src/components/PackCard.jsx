import React, { useState, useEffect } from "react";

export function PackCard(pack, ) {

        return (
            <div className="card">
                <div className="card-body">
                    <h4 style={{ color: '#ffcc00' }}><b>{pack.nome}</b></h4>
                    <ul>
                        <li>{pack.redessociais}{" "}redes sociais</li>
                        <li>{pack.postssemana}{" "}posts/semana</li>
                        <li>{pack.storiessemana}{" "}stories/semana</li>
                        <li>{pack.covercapa}{" "}cover/capa</li>
                        <li>Design Gráfico</li>
                        <li>Copywriting</li>
                        <li>{pack.planificacaoeditorial}{" "}Planificação Editorial</li>
                        <li>{pack.consultoriadigital}{" "}Consultoria Digital</li>
                        <li>{pack.gestaocampanhas}{" "}Gestão de Campanhas</li>
                        <li>{pack.relatorioestatistico}{" "}Relatório Estatístico</li>
                    </ul>
                </div>
                <button className="btnPacks">Saber mais</button>
            </div>
        )
    }
