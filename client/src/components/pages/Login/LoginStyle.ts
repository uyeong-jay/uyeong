import styled from '@_settings/styled';

export const StyledSection = styled.section`
  border: 2px dotted lightslategray;
  width: 750px;
  border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 100px;
  margin: 50px 0 50px 0;

  & form {
    & > div:nth-of-type(1) input {
      border-radius: 50px 80px 50px 80px;
    }
    & > div:nth-of-type(2) input {
      border-radius: 90px 55px 80px 50px;
    }
  }

  & p a {
    color: blue;
  }
`;
