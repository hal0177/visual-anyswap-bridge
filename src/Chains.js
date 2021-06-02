
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import fusion from "./icons/fusion.png";
import bsc from "./icons/bsc.png";
import polygon from "./icons/polygon.png";
import ethereum from "./icons/ethereum.png";

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
  box-shadow: 0px 0px 15px rgb(30, 144, 255);
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
  background: #222;
  box-shadow: 1px 1px 5px rgb(30, 144, 255);
`

const Icon = styled.img`
  width: ${props => props.r}px;
  height: ${props => props.r}px;
`

const Bridge = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  box-shadow: 0.5px 0.5px 5px rgb(30, 144, 255);
`

const Payload = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: gold;
  z-index: 2;
`


const InterChains = () => {

  const [ layout, setLayout ] = useState([]);
  const [ bridgeTarget, setBridgeTarget ] = useState();
  const [ targets, setTargets ] = useState([]);


  const chains = [
    fusion,
    polygon,
    ethereum,
    bsc,
    fusion,
    polygon,
    ethereum,
    bsc
  ]

  useEffect(() => {
    const amount = 8;
    const [ coordinates, R, r ] = drawCircles(300, amount, 0.4);
    setBridgeTarget((R + r / 2) + 5);
    setLayout(
      <Chains size={2 * (R + r)}>
        <Payload initial={{opacity: 0}} animate={controls} transition={{ease: "easeOut", duration: 2.5}} />
        <Bridge top={R + r / 2} left={R + r / 2} />
        {chains.map((chain, index) => {
          return (
            <Crypto
              top={coordinates[index].y}
              left={coordinates[index].x}
              r={2 * r}
              onClick={() => {
                const randomChain = Math.floor(Math.random() * amount);
                setNewTransfer(index, randomChain);
              }}>
              <Icon src={chain} r={2 * r}/>
            </Crypto>
          );
        })}
      </Chains>
    );
  }, []);

  const drawCircles = (R, n, resize) => {
    let coordinates = [];
    let makeTargets = [];
    let r = Math.PI * R / n * resize;

    for(let ii = 0; ii < n; ii++) {
      let theta = ii * 2 * Math.PI / n;
      let x = R * Math.sin(theta) - r;
      let y = R * Math.cos(theta) + r;

      let X = R + r + x;
      let Y = R + r - y;

      coordinates.push({
        x: X,
        y: Y,
      });

      makeTargets.push({
        x: X + r / 2,
        y: Y + r / 2
      });
    }

    setTargets(makeTargets);

    return [ coordinates, R, r ];
  }

  const setNewTransfer = (from, to) => {
    controls.start({
      x: [ targets[from].x, bridgeTarget, targets[to].x ],
      y: [ targets[from].y, bridgeTarget, targets[to].y ],
      opacity: [ 0, 1, 0 ]
    });
  }


  const controls = useAnimation();

  return (
    <ChainsContainer>
      {layout}
    </ChainsContainer>
  );
}

export default InterChains;