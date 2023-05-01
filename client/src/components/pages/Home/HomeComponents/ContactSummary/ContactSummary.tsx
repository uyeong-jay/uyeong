import React from 'react';
import styled from '@_settings/styled';

const StyledContactSummary = styled.section`
  border: 1px solid #dadada;
  background-color: silver;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 30px;
`;

const ContactSummary = () => {
  return <StyledContactSummary>contact</StyledContactSummary>;
};

export default ContactSummary;
