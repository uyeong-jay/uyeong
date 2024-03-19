import styled from '@_settings/styled';

export const StyledWriteMDViewer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.LIGHT_BG_C};
  padding: 30px;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  font-size: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 1.1rem;
  }

  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 40px 0 8px 0;
  }

  & > p {
    margin-bottom: 15px;
  }

  & > p > img {
    margin: 1rem auto;
  }
`;
