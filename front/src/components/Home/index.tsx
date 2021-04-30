import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background-color: ${(props) => props.theme.background.white};
`;

const Home = () => {
  return <Box>home</Box>;
};
export default Home;
