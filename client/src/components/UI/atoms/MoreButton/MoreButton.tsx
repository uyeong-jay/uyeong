import React from 'react';
import styled from '@_settings/styled';

interface Props {
  text: string;
}

const StyledMoreButton = styled.button`
  border: 1px solid #dadada;
  background-color: #efe9e0;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  margin: 10px 0 10px 0;
`;

const MoreButton = ({ text }: Props) => {
  return <StyledMoreButton>{text}</StyledMoreButton>;
};

export default MoreButton;
