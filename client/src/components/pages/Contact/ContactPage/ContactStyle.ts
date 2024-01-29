import styled from '@_settings/styled';

export const FORM = {} as any;

FORM.ContactForm = styled.form`
  // border: 1px solid black;
  max-width: 700px;
  width: 100%;

  & > div {
    // border: 1px solid black;
    margin-bottom: 40px;

    & > input {
      // border: 1px solid black;
      background-color: ${({ theme }) => theme.INITIAL_BG_C};
      margin-top: 10px;
      border-radius: 10px;
    }
  }

  & > label {
    color: ${({ theme }) => theme.FONT_C};
    letter-spacing: 0.5px;
    font-weight: bold;
  }

  & > textarea {
    border: none;
    background-color: ${({ theme }) => theme.INITIAL_BG_C};
    width: 100%;
    height: 150px;
    margin: 10px 0 20px 0;
    padding: 15px 20px;
    border-radius: 10px;
    overflow: hidden;
    resize: none;
  }
`;
