import React, { memo, useCallback, useEffect, useState } from 'react';
import { HeadingType } from './BlogPostTocContainer';
import { LI, NAV } from './BlogPostTocStyle';
import { v4 as uuid } from 'uuid';
import { raiseHeader } from '@pages/Blog/BlogSlice';
import { useAppDispatch } from '@app/hooks';

interface Props {
  headings: HeadingType[];
}

const BlogPostTocPresenter = ({ headings }: Props) => {
  const dispatch = useAppDispatch();
  // 현재 뷰포트의 너비를 상태로 관리

  const [isMarkdownScrolling, setIsMarkdownScrolling] = useState(false);
  const [activeId, setactiveId] = useState('');

  //TOC heaading 추적
  useEffect(() => {
    const handleScroll = () => {
      // 화면 상단에서 헤딩 영역의 상단까지의 거리를 계산
      const headingOffsets = headings.map((heading) => ({
        id: heading.id,
        offsetTop: document.getElementById(heading.id)?.offsetTop,
      }));

      // 현재 스크롤 위치를 가져오기
      const scrollPosition = window.scrollY;

      // 현재 스크롤 위치에 해당하는 헤딩을 찾기
      const currentHeading = headingOffsets.find(
        (offset) => offset.offsetTop && offset.offsetTop > scrollPosition - 370,
      );

      // 제목에 속한 내용의 높이 까지 고려하기
      if (currentHeading) {
        // 찾은 헤딩의 인덱스를 가져오기
        const currentIndex = headingOffsets.indexOf(currentHeading);

        // 이전 헤딩 가져오기 (현재 헤딩이 배열의 첫 번째 요소인지 확인)
        const prevHeading = currentIndex > 0 ? headingOffsets[currentIndex - 1] : null;

        // 찾은 이전 헤딩의 ID를 상태에 업데이트
        setactiveId(prevHeading ? prevHeading.id : currentHeading.id);
      } else {
        setactiveId(headingOffsets[headingOffsets.length - 1]?.id);
      }
    };

    //디바운스 타이머 설정
    const debounceTime = 25;

    // 타이머 ID
    let timerId: NodeJS.Timeout;

    // 스크롤 이벤트 리스너
    const scrollListener = () => {
      // 타이머가 이미 동작 중인 경우 기존 타이머를 제거
      if (timerId) {
        clearTimeout(timerId);
      }

      // 새로운 타이머를 설정하여 일정 시간 후에 handleScroll을 호출
      timerId = setTimeout(() => {
        handleScroll();
      }, debounceTime);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', scrollListener);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [headings]);

  //markdown 내용으로만 heading 한정 짓기
  useEffect(() => {
    const markdownContent = document.getElementById('markdown-content');
    // 스크롤 위치를 기반으로 현재 heading을 결정
    if (markdownContent) {
      const handleScroll = () => {
        // markdown-content 엘리먼트가 화면에 보이는지 확인
        const rect = markdownContent.getBoundingClientRect();

        //markdownContent의 상단이 뷰포트의 상단을 지나가고 하단을 지나갈대까지 isVisible을 true로 설정 아니면 false
        const isVisible = rect.top < 0 && rect.bottom > 0;

        if (isVisible) {
          setIsMarkdownScrolling(true);
        } else {
          setIsMarkdownScrolling(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const onClickheading = useCallback(() => {
    dispatch(raiseHeader());
  }, [dispatch]);

  return (
    <NAV.Frame>
      <ul>
        {headings.map(({ id, text, level }) => (
          <LI.Heading key={uuid()} headingLevel={level} headingId={id} activeId={isMarkdownScrolling ? activeId : ''}>
            <a onClick={onClickheading} href={`#${id?.toLowerCase().replace(/\s+/g, '-')}`}>
              {text}
            </a>
          </LI.Heading>
        ))}
      </ul>
    </NAV.Frame>
  );
};

export default memo(BlogPostTocPresenter);
