import { useEffect, useState } from "react";
import { RiCopperCoinFill } from "react-icons/ri";
import "./style.css";

export default function Melhoria({ melhoria, atualizarMelhoria, saldo, comprar}) {
  const [mostrarDescricao, setMostrarDescricao] = useState(false);
  const [corPreco, setCorPreco] = useState("#963541")
  const [compraNegada, setCompraNegada] = useState(false)

  useEffect(() => {
    if (saldo >= melhoria.preco) {
      setCorPreco("#3fbc52");
    } else {
      setCorPreco("#963541");
    }
  }, [saldo, melhoria.preco]);

  const handleClick = ()=>{
    if (saldo >= melhoria.preco){
      comprar(melhoria.preco)
      atualizarMelhoria()
    }
    else{
      setCompraNegada(true)
      setTimeout(() => {
        setCompraNegada(false)
      }, 500);
    }
  }
  
  return (
    <div className="melhoria">
      <button
        onMouseEnter={() => setMostrarDescricao(true)}
        onMouseLeave={() => setMostrarDescricao(false)}
        onClick={handleClick}
        className={compraNegada ? "animacao-compra" : ""}
      >
        {melhoria.icone}
        <div>
        <p>Nível {melhoria.nivel}</p>
        <div className="preco" style={{color: `${corPreco}`}}>
          <RiCopperCoinFill/>
          {melhoria.preco}
        </div>
        </div>
      </button>
      {mostrarDescricao && <p className="descricao">{melhoria.descricao}</p>}
    </div>
  );
}
