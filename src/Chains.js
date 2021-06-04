
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

const demoTransfers = require("./demoTransfers");

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
  width: ${props => props.r}px;
  height: ${props => props.r}px;
  z-index: 2;
`


const InterChains = () => {

  const R = 300;
  const N = 13;
  const RESIZE = 0.5;
  const r = Math.PI * R / N * RESIZE;
  const BRIDGE = (R + r / 2) + 25;

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
    blocknet,
    colossusxt,
    bitcoin,
    litecoin
  ]

  const TOKENS = [
    any,
    anybtc,
    anyfsn,
    anyusdt
  ]

  const [ active, setActive ] = useState(false);
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
    if(!active) {
      setActive(setInterval(() => {
        let { from, to, tokenId } = demoTransfers[Math.floor(Math.random() * demoTransfers.length)];
        let token = TOKENS[tokenId];
        let amount = Math.floor(Math.random() * 50) + 30;
        
        setPayload({from, to, token, amount});
      }, 5000));
    }
    else {
      clearInterval(active);
      setActive(false);
    }
  }



  useEffect(() => {
    if(coordinates[payload.from] && coordinates[payload.to] && payload.token) {
      let offset = payload.amount / 4;
      controls.start({
        x: [ coordinates[payload.from].centreX - offset, BRIDGE - (payload.amount / 2), coordinates[payload.to].centreX - offset ],
        y: [ coordinates[payload.from].centreY - offset, BRIDGE - (payload.amount / 2), coordinates[payload.to].centreY - offset ],
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
          r={payload.amount}
        />

      </Chains>
      <button onClick={() => randomTransfer()} style={{width: "50px", height: "50px"}} />

    </ChainsContainer>
  );
}

export default InterChains;