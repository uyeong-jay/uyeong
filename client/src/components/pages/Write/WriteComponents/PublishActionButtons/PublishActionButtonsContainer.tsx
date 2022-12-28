import React, { useCallback } from 'react';
import PublishActionButtonsPresenter from './PublishActionButtonsPresenter';
import { useAppDispatch } from '@app/hooks';
import { cancel } from '@pages/Write/WriteSlice';

const PublishActionButtons = () => {
  const dispatch = useAppDispatch();

  const onClickCancel = useCallback(() => {
    dispatch(cancel());
  }, [dispatch]);

  const onClickPost = useCallback(() => {
    dispatch(cancel());
  }, [dispatch]);
  return <PublishActionButtonsPresenter onClickCancel={onClickCancel} onClickPost={onClickPost} />;
};

export default PublishActionButtons;
