import { styled } from "styled-components";

export const HeaderContainer = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #333;
    font-size: 2rem;
    margin-bottom: 15px;
`; 

export const Li = styled.li`
    list-style-type: none;
`;

export const Ul = styled.ul`
    display:flex; 
    justify-content: space-evenly; 
    align-items: center;
`;