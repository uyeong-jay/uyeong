interface LoaderProps {
  src: string;
}

export const loadSource = ({ src }: LoaderProps) => {
  return `${src}`;
};
