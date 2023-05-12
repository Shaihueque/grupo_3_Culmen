import { styled } from "styled-components";

export const LastProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  margin: 15px auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }

  img {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }
  span {
    font-weight: bold;
    color: #FF6600; /* puedes cambiar este color a uno que te guste más */
  }
`;