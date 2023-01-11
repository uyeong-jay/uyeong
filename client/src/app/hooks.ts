import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

//Thunk 사용을 쉽게 해줌
export const useAppDispatch: () => AppDispatch = useDispatch;

//useSelector 사용시 state 뒤에 붙여야 하는 RootState를 안붙여도 되도록 해줌
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 타입스크립트에서 useSelector와 useDisaptch 를 편하게 사용하게 해주는 커스텀 훅
// Use throughout your app instead of plain `useDispatch` and `useSelector`
