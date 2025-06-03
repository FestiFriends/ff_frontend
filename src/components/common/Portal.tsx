import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const element =
    typeof window !== 'undefined' && document.querySelector(`#portal`);

  return element && children ? createPortal(children, element) : null;
};

export default Portal;
