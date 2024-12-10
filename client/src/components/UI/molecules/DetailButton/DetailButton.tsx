import React from 'react';
import styled from '@_settings/styled';
import Link from 'next/link';
import ArrowRightIcon from '@icons/ArrowRightIcon';

interface Props {
  text?: string;
  link: string;
  passHref?: boolean;
  target?: string;
  rel?: string;
}

const StyledDetailButton = styled.button`
  // border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100px; //모바일환경의 실제 width가 다르게 적용되어 추가
  height: 30px;
  position: relative;

  & > a {
    // border: 1px solid red;
    color: ${({ theme }) => theme.FONT_C};
  }

  & .arrow-right-icon {
    // border: 1px solid blue;
    position: absolute; //모바일환경의 실제 width가 다르게 적용되어 추가
    top: 9px;
    right: 5px;
    width: 7px;
    fill: ${({ theme }) => theme.FONT_C};
    transition: transform 0.3s;
  }

  &:hover {
    & .arrow-right-icon {
      transform: translateX(100%);
    }
  }
`;

const DetailButton = ({ text = 'See more', link = '', passHref, target, rel }: Props) => {
  return (
    <StyledDetailButton>
      <Link href={link} passHref={passHref ? true : false}>
        <a
          target={target}
          rel={rel} //rel="noopener noreferrer"??
        >
          {text}
        </a>
      </Link>
      <ArrowRightIcon />
    </StyledDetailButton>
  );
};

export default DetailButton;
