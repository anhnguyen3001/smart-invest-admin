// ** React Imports
import { useEffect, useState } from 'react';

interface ScrollTopProps extends React.HTMLAttributes<HTMLDivElement> {
  showOffset?: number;
  scrollBehaviour?: ScrollBehavior;
}

const ScrollTop: React.FC<ScrollTopProps> = (props) => {
  // ** Props
  const { showOffset, scrollBehaviour = 'smooth', children, ...rest } = props;

  // ** State
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= showOffset) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: scrollBehaviour });
  };

  return (
    visible && (
      <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>
        {children}
      </div>
    )
  );
};

export default ScrollTop;
