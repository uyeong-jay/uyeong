import { Components } from 'react-markdown/lib/ast-to-react';
import code from './code';
import blockquote from './blockquote';
import paragraph from './paragraph';

const components: Components = {
  code,
  blockquote,
  p: paragraph,
};

export default components;
