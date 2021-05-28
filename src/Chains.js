
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import fusion from "./icons/fusion.png";
import bsc from "./icons/bsc.png";
import polygon from "./icons/polygon.png";
import ethereum from "./icons/ethereum.png";

const ChainsContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin: 5% auto;
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
  width: 100px;
  height: 100px;
  margin: 0;
  border-radius: 50%;
  background: #222;
  box-shadow: 2px 2px 5px rgb(30, 144, 255);
`

const Icon = styled.img`
  width: 100px;
  height: 100px;
`

const Bridge = styled.div`
  position: absolute;
  top: 275px;
  left: 275px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgb(30, 144, 255);
`

const Payload = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: gold;
  z-index: 2;
`

const Example = styled.button`
  display: inline-block;
  position: relative;
  top: 650px;
  left: ${props => props.left}px;
  width: 150px;
  height: 70px;
  outline: none;
  border: 1px solid dodgerblue;
  border-radius: 5px;
  background: rgb(38, 38, 38);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(255, 255, 255, 0.8);
`


const Chains = () => {

  const [ transfer, setTransfer ] = useState();
  const [ payload, setPayload ] = useState();

  const networkPos = {
    fusion: {
      top: 35,
      left: 280
    },
    bsc: {
      top: 280,
      left: 35
    },
    polygon: {
      top: 280,
      left: 525
    },
    ethereum: {
      top: 525,
      left: 280
    }
  }

  const bridgePos = {
    top: 280,
    left: 280
  }

  const setNewTransfer = (from, to) => {

    switch (from) {
      case "fusion":
        from = networkPos.fusion;
        break;
      case "bsc":
        from = networkPos.bsc;
        break;
      case "polygon":
        from = networkPos.polygon;
        break;
      case "ethereum":
        from = networkPos.ethereum;
        break;
      default:
        console.error("No \"from\" chain specified.");
    }

    switch (to) {
      case "fusion":
        to = networkPos.fusion;
        break;
      case "bsc":
        to = networkPos.bsc;
        break;
      case "polygon":
        to = networkPos.polygon;
        break;
      case "ethereum":
        to = networkPos.ethereum;
        break;
      default:
        console.error("No \"to\" chain specified.");
    }

    controls.start({
      x: [ from.left, bridgePos.left, to.left ],
      y: [ from.top, bridgePos.top, to.top ],
      opacity: [ 0, 1, 0 ]
    });
  }

  const controls = useAnimation();

  return (
    <ChainsContainer>
      
      <Bridge />

      <Payload initial={{opacity: 0}} animate={controls} transition={{ease: "easeOut", duration: 10}} />

      <Crypto top={5} left={250}>
        <Icon src={fusion} alt="fusion" />
      </Crypto>
      <Crypto top={250} left={5}>
        <Icon src={bsc} alt="bsc" />
      </Crypto>
      <Crypto top={250} left={495}>
        <Icon src={polygon} alt="polygon" />
      </Crypto>
      <Crypto top={495} left={250}>
        <Icon src={ethereum} alt="ethereum" />
      </Crypto>

      <Example onClick={() => setNewTransfer("fusion", "bsc")}>
        FSN {"<>"} BSC
      </Example>
      <Example onClick={() => setNewTransfer("polygon", "fusion")}>
        Polygon {"<>"} FSN
      </Example>
      <Example onClick={() => setNewTransfer("ethereum", "polygon")}>
        ETH {"<>"} Polygon
      </Example>
      <Example onClick={() => setNewTransfer("bsc", "fusion")}>
        BSC {"<>"} FSN
      </Example>

    </ChainsContainer>
  );
}

export default Chains;