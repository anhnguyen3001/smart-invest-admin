import { useRef } from 'react';

interface LazyProps {
  visible?: boolean;
  children?: React.ReactNode;
}

const Lazy: React.FC<LazyProps> = ({ visible, children }) => {
  const rendered = useRef(visible);

  if (visible && !rendered.current) {
    rendered.current = true;
  }

  if (!rendered.current) return null;

  return <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>;
};

export default Lazy;
