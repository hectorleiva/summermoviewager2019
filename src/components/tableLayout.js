import React from 'react';
import styled from 'styled-components';

const ParentTableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TableLayout = ({ children }) => (
  <ParentTableContainer>
    {children}
  </ParentTableContainer>
);

export default TableLayout;
