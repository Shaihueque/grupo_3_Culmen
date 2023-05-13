import { styled } from "styled-components";


export const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background-color: #222;
  color: white;
  text-align: left;
  padding: 12px;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  text-align: left;
  padding: 12px;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const DetailLink = styled.a`
  color: #007bff;
  text-decoration: none;
`;