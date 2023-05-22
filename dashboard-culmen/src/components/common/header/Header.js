import { styled } from "styled-components";
const colors = {
    primaryGreen: '#85cf7e',
    secondaryLightBlue: '#1e96fc',
    bgBlueOscuro: '#0b0033',
    darkGrey: '#616163',
    lightGrey: '#e1e6e1'
  };


export const HeaderContainer = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${colors.primaryGreen};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: ${colors.lightGrey};
  font-size: 2rem;
  margin-bottom: 15px;
  padding: 10px;

  @media (max-width: 425px) {
    flex-direction: row;
    height: auto;
    font-size: 1.5rem;
  }
`;

export const Nav = styled.nav`
  width: 100%;
`


export const Li = styled.li`
  list-style-type: none;
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const LogoImage = styled.img`
  height: 100%;
  max-width: 100%;
`;

export const PictureImg = styled.picture`
  width: 25%;
  @media (max-width: 425px) {
    width: 50%;
  }

`