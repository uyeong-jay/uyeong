interface LoaderProps {
  src: string;
}

const loadSource = ({ src }: LoaderProps) => {
  return `${src}`;
};

export default loadSource;
