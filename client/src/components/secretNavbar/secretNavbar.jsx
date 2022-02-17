import styled from "styled-components";
import { COLOR } from "../../utils/constants";

import { Link } from "react-router-dom";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 6.4rem;
  align-items: center;
  width: 100%;
  background-color: black;
`;

const NavbarLeft = styled.div`
  display: flex;
`;

const NavbarImg = styled.img`
  margin-left: 1.4rem;
  cursor: pointer;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  display: flex;
`;

const NavbarTitle = styled.h1`
  position: relative;
  font-size: 3.2rem;
  color: ${COLOR.BACKGROUND};
  margin-left: 0.8rem;
`;

const NavbarConfig = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1.4rem;
  cursor: pointer;
`;

const SecretNavbar = () => {
  return (
    <Navbar>
      <NavbarLeft>
        <NavbarLink to="/">
          <NavbarImg src="/eye.png" />
          <NavbarTitle>reveal.io</NavbarTitle>
        </NavbarLink>
      </NavbarLeft>
      <NavbarLink to="/one-time-secret/config">
        <NavbarConfig src="/config.png"></NavbarConfig>
      </NavbarLink>
    </Navbar>
  );
};

export default SecretNavbar;
