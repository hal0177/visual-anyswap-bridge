
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import anyswap from "./icons/anyswap.png";

import fusion from "./icons/fusion.png";
import bsc from "./icons/bsc.png";
import ethereum from "./icons/ethereum.png";
import fantom from "./icons/fantom.png";
import huobi from "./icons/huobi.png";
import polygon from "./icons/polygon.png";
import xdai from "./icons/xdai.png";
import avalanche from "./icons/avalanche.png";
import harmony from "./icons/harmony.png";
import bitcoin from "./icons/bitcoin.png";
import litecoin from "./icons/litecoin.png";
import blocknet from "./icons/blocknet.png";
import colossusxt from "./icons/colossusxt.png";

import any from "./icons/tokens/any.svg";
import anybtc from "./icons/tokens/anybtc.png";
import anyfsn from "./icons/tokens/anyfsn.png";
import anyusdt from "./icons/tokens/anyusdt.png";

const ChainsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const Chains = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: rgb(38, 38, 38);
  // box-shadow: 0px 0px 15px rgb(30, 144, 255);
`

const Crypto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: ${props => props.r}px;
  height: ${props => props.r}px;
  margin: 0;
  border-radius: 50%;
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 12px rgb(100, 98, 244);
`

const Icon = styled.img`
  // width: ${props => props.r}px;
  // height: ${props => props.r}px;
  width: 70%;
  height: 70%;
`

const Bridge = styled.img`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: 50px;
  height: 50px;
  box-shadow: 0px 0px 12px rgb(100, 98, 244);
  border-radius: 35%;
`

const Payload = styled(motion.img)`
  position: relative;
  width: 40px;
  height: 40px;
  z-index: 2;
`


const InterChains = () => {

  const R = 300;
  const N = 13;
  const RESIZE = 0.5;
  const r = Math.PI * R / N * RESIZE;
  const BRIDGE = (R + r / 2) + 5;

  const CHAINS = [
    fusion,
    bsc,
    ethereum,
    fantom,
    huobi,
    polygon,
    xdai,
    avalanche,
    harmony,
    bitcoin,
    litecoin,
    blocknet,
    colossusxt
  ]

  const TOKENS = [
    any,
    anybtc,
    anyfsn,
    anyusdt
  ]

  const [ coordinates, setCoordinates ] = useState(() => {
    return CHAINS.map(() => {
      return {
        x: 0,
        y: 0,
        centreX: 0,
        centreY: 0
      }
    });
  });
  const [ payload, setPayload ] = useState({
    from: CHAINS[0],
    to: CHAINS[0],
    token: TOKENS[0],
    amount: 0
  });



  const randomTransfer = () => {
    setInterval(() => {
      let from = Math.floor(Math.random() * N);
      let to = Math.floor(Math.random() * N);
      let token = TOKENS[Math.floor(Math.random() * TOKENS.length)];
      let amount = 0;
      while(from === to) {
        from = Math.floor(Math.random() * N);
      }
      
      setPayload({from, to, token, amount});
    }, 5000);
  }



  useEffect(() => {
    if(coordinates[payload.from] && coordinates[payload.to] && payload.token) {
      controls.start({
        x: [ coordinates[payload.from].centreX, BRIDGE, coordinates[payload.to].centreX ],
        y: [ coordinates[payload.from].centreY, BRIDGE, coordinates[payload.to].centreY ],
        opacity: [ 0, 1, 0 ]
      });
    }
  }, [ payload ]);



  // On Page Load ...
  useEffect(() => {
    let loadCoordinates = [];

    for(let ii = 0; ii < N; ii++) {
      let theta = ii * 2 * Math.PI / N;

      let X = R + r + (R * Math.sin(theta) - r);
      let Y = R + r - (R * Math.cos(theta) + r);

      loadCoordinates.push({
        x: X,
        y: Y,
        centreX: X + r / 2,
        centreY: Y + r / 2
      });
    }

    setCoordinates(loadCoordinates);

  }, []);


  const controls = useAnimation();

  return (
    <ChainsContainer>

      <Chains size={2 * (R + r)}>

        <Bridge top={R + r / 2} left={R + r / 2} src={anyswap} />

        {
          CHAINS.map((chain, index) => {
            return (
              <Crypto top={coordinates[index].y} left={coordinates[index].x} r={2 * r}>
                <Icon src={chain} r={2 * r}/>
              </Crypto>
            );
          })
        }

        <Payload
          initial={{opacity: 0}}
          animate={controls}
          transition={{ease: "easeOut", duration: 5}}
          src={payload.token}
        />

      </Chains>
      <button onClick={() => randomTransfer()} style={{width: "50px", height: "50px"}} />

    </ChainsContainer>
  );
}

export default InterChains;