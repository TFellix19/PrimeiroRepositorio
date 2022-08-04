export function DropDownServico({ servico, onServicoChange, indexServico }) {

    return (
        <div className="dropdown">
            <button className="btn btn-warning  dropdown-toggle d-flex align-items-center justify-content-center"
                type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                      <span style={{ position: "absolute", top: '85%' , left: '35%', color:'white', fontWeight: 'bold' }}>{servico.nome}</span>
                <img src={servico.imagem} class="img-fluid rounded w-75" alt=""></img>
              
            </button>
            <input className="form-check-input" style={{ position: "absolute", top: '50%', right: '5%' }}  type="checkbox"
                value={servico.ativo}
                onClick={(e) => {
                    onServicoChange({ ...servico, ativo: e.currentTarget.checked },indexServico)
                }}

                id="flexCheckDefault"></input>

            <ul className="dropdown-menu bg-warning text-white" style={{zIndex: 9000, width:'100%'}} aria-labelledby="dropdownMenuButton2">
                {servico.subservicos.map((serv,index) => {
                    
                    return (
                        <li key={index}>
                        <button className="btn d-flex align-items-center justify-content-between px-2 w-100 text-white">  
                            <span>{serv.nome}</span>
                            <input className="form-check-input" type="checkbox" 
                                id={serv.idsubservico}
                                value={serv.ativo}
                                onClick={(e) => {
                                    var newArray = servico.subservicos;
                                    newArray[index] = {
                                        nome: serv.nome,
                                        id:serv.id,
                                        ativo: e.currentTarget.checked
                                    }
                                    onServicoChange({
                                        ...servico,
                                        subservicos: newArray
                                    },indexServico)
                                }} ></input>
                        </button>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}