import { useEffect, useState } from "react";
import "./App.css";
import { RiCopperCoinFill } from "react-icons/ri";
import { GiTwoCoins, GiSwordArray, GiPointySword } from "react-icons/gi";
import Melhoria from "./components/Melhoria"
import girassolLaranja from "./assets/girassol-laranja.png";
import bagulhoLaranja from "./assets/bagulho-laranja.png";
import maoRoxa from "./assets/mao-roxa.png";
import girassolVerde from "./assets/girassol-verde.png";
import maoVerde from "./assets/mao-verde.png";
import olhoVerde from "./assets/olho-verde.png";
import olhosLaranja from "./assets/olhos-laranja.png";
import planetaVerde from "./assets/planeta-verde.png";
import tv from "./assets/tv.png";

function App() {
  const [moedas, setMoedas] = useState(0)
  const [ataque, setAtaque] = useState(1)
  const [ataqueAuto, setAtaqueAuto] = useState(false)
  const [multiplicadorRecompensa, setMultiplicadorRecompensa] = useState(1)
  const [intervalo, setIntervalo] = useState(2000)

  const monstros = [
    girassolLaranja,
    bagulhoLaranja,
    maoRoxa,
    girassolVerde,
    maoVerde,
    olhoVerde,
    olhosLaranja,
    planetaVerde,
    tv,
  ];
  
  const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [vida, setVida] = useState(randomNumber(30,50))
  const [vidaInicial, setVidaInicial] = useState(vida)
  const [morto, setMorto] = useState("")
  const [monstroAtual, setMonstroAtual] = useState(monstros[randomNumber(8,0)])

const atacar = (ataque) => {
  setMorto("");
  setVida((prevVida) => {
    const vidaAtualizada = prevVida - ataque;
    if (vidaAtualizada <= 0) {
      const novaVida = randomNumber(30,50)
      setVida(novaVida);
      setVidaInicial(novaVida)
      setMonstroAtual(monstros[randomNumber(8, 0)]);
      setMorto("morto");
      const recompensa = randomNumber(2,100)
      const novoSaldo = moedas + (recompensa * multiplicadorRecompensa)
      setMoedas(Math.floor(novoSaldo))
    }
    return vidaAtualizada;
  });
};

  const [melhorias,setMelhorias] = useState([
    {icone: <GiPointySword style={{color: "#219393"}} className="icone-melhoria"/>, nivel: 0,descricao: "Aumenta o dano causado aos monstros", preco: 100},
    {icone: <GiTwoCoins style={{color: "#dda357"}}  className="icone-melhoria"/>, nivel: 0,descricao: "Aumenta a quantidade de moedas recebidas por monstro", preco: 250},
    {icone: <GiSwordArray style={{color: "#219393"}} className="icone-melhoria"/>, nivel: 0,descricao: "Nivel 1 habilita o ataque automático, que causa 50% do dano do ataque principal. A partir do nivel 2 aumenta a velocidade do ataque", preco: 400}
  ])

 const comprar = (preco) =>{
  const novoSaldo = moedas - preco
  setMoedas(novoSaldo)
 }

 const atualizarMelhoria = (index) => {
  const novasMelhorias = [...melhorias];
  novasMelhorias[index].nivel += 1;
  novasMelhorias[index].preco += novasMelhorias[index].preco * novasMelhorias[index].nivel
  setMelhorias(novasMelhorias);

  if (index === 0) {
    const novoDano = ataque * 1.8
    setAtaque(novoDano)
  }else if(index === 1){
    const novoMultiplicador = multiplicadorRecompensa * 1.8
    setMultiplicadorRecompensa(novoMultiplicador)
  }else if (index === 2) {
    const novoIntervalo = intervalo - intervalo/2
    setIntervalo(novoIntervalo)
    novasMelhorias[index].nivel == 1 ? setAtaqueAuto(true) : setIntervalo(novoIntervalo)
  }
}
 
  return (
    <main>
      <section id="loja">
        <div className="saldo">
          <RiCopperCoinFill/>
          <p>{Math.floor(moedas)}</p>
        </div>
        {melhorias.map((melhoria, index) => (
          <Melhoria
            key={index}
            comprar={comprar}
            saldo={moedas}
            melhoria={melhoria}
            atualizarMelhoria={() => atualizarMelhoria(index)}
          />
        ))}
      </section>

      <section id="section-monstro">
      <p>Monstro</p>
      <button className="monstro-container" onClick={()=>atacar(ataque)}>
        <img className={`monstro ${morto}`} style={{pointerEvents: "none"}} src={monstroAtual} alt="" />
      </button>
      <div className="barra-vida">
        <div className="vida" style={{width: `${(100 * vida)/vidaInicial}%`, backgroundColor: "#3fbc52"}}>{Math.floor(vida)}</div>
      </div>
    </section>

    </main>
  )
}

export default App;
