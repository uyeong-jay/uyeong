import React, { memo, useEffect, useState } from 'react';
import { HeadingType } from './BlogPostTocContainer';
import { LI, NAV } from './BlogPostTocStyle';
// import { v4 as uuid } from 'uuid';

interface Props {
  headings: HeadingType[];
}

const BlogPostTocPresenter = ({ headings }: Props) => {
  const [isMarkdownScrolling, setMarkdownScrolling] = useState(false);
  const [activeId, setActiveId] = useState('');

  //TOC heaading 추적
  useEffect(() => {
    const postHeaderOffestHeight = document.getElementById('blog-post-header-frame')?.offsetHeight; //썸넬 이미지는 높이는 포함이 안되서 고려안해줘도 됨

    const handleScroll = () => {
      // 현재 스크롤 위치를 가져오기
      // 100: 제목 외 여유분
      const currentScroll = window.scrollY - (postHeaderOffestHeight ?? 0) - 100;

      const headingOffsets = headings.map((heading) => {
        const element = document.getElementById(heading.id);

        return {
          id: heading.id,
          offsetTop: element?.offsetTop,
        };
      });

      // 현재 스크롤 위치와 가장 가까운 offsetTop 값을 가진 요소 찾기
      const currentElement = headingOffsets.find((heading, index, array) => {
        const nextHeading = array[index + 1];

        if (nextHeading) {
          // 현재 스크롤 위치가 두 offsetTop 값 사이에 있는지 확인
          return (
            currentScroll && (heading.offsetTop ?? 0) <= currentScroll && currentScroll < (nextHeading.offsetTop ?? 0)
          );
        }

        // 마지막 요소일 경우
        return currentScroll && (heading.offsetTop ?? 0) <= currentScroll;
      });

      if (currentElement) {
        setActiveId(currentElement.id);
      } else {
        setActiveId('');
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

        //markdownContent의 상단이 뷰포트의 상단을 지나가고 하단을 지나갈대까지 markdownVisible을 true로 설정 아니면 false
        const markdownVisible = rect.top < 0 && rect.bottom > 0;

        if (markdownVisible) {
          setMarkdownScrolling(true);
        } else {
          setMarkdownScrolling(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <NAV.Frame>
      <ul>
        {headings.map(({ id, text, level }) => {
          return (
            <LI.Heading key={id} headingLevel={level} headingId={id} activeId={isMarkdownScrolling ? activeId : ''}>
              <a href={`#${id?.toLowerCase().replace(/\s+/g, '-')}`}>{text}</a>
            </LI.Heading>
          );
        })}
      </ul>
    </NAV.Frame>
  );
};

export default memo(BlogPostTocPresenter);
