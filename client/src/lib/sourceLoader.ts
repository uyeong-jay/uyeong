interface LoaderProps {
  src: string;
}

export const sourceLoader = ({ src }: LoaderProps) => {
  return `${src}`;
};
