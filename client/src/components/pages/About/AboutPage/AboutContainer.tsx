import AboutPresenter from './AboutPresenter';

interface Props {
  hideInSummary?: boolean;
  setHideInSummary?: (hideInSummary: boolean) => void;
}

const AboutContainer = ({ hideInSummary, setHideInSummary }: Props) => {
  return <AboutPresenter hideInSummary={hideInSummary} setHideInSummary={setHideInSummary} />;
};

export default AboutContainer;
