import code from './code';
import blockquote from './blockquote';
import paragraph from './paragraph';
import heading from './heading';

const components: object = {
  code,
  blockquote,
  p: paragraph,
  h1: heading,
  h2: heading,
  h3: heading,
};

export default components;
