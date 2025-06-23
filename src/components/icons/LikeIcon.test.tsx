import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LikeIcon from './LikeIcon';

jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('LikeIcon', () => {
  describe('type prop 테스트', () => {
    it('type이 empty일 때 올바른 SVG가 렌더링된다', () => {
      const { container } = render(<LikeIcon type="empty" />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
      
      // empty 타입에만 있는 clipPath 확인
      const clipPath = container.querySelector('#clip0_22_262');
      expect(clipPath).toBeInTheDocument();
    });

    it('type이 emptyWhite일 때 text-white 클래스가 적용된다', () => {
      const { container } = render(<LikeIcon type="emptyWhite" />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-white');
      
      // emptyWhite/active 타입에만 있는 clipPath 확인
      const clipPath = container.querySelector('#clip0_22_260');
      expect(clipPath).toBeInTheDocument();
    });

    it('type이 active일 때 text-red-500 클래스가 적용된다', () => {
      const { container } = render(<LikeIcon type="active" />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-red-500');
      
      // emptyWhite/active 타입에만 있는 clipPath 확인
      const clipPath = container.querySelector('#clip0_22_260');
      expect(clipPath).toBeInTheDocument();
    });
  });

  describe('className prop 테스트', () => {
    it('type이 empty일 때 className이 올바르게 적용된다', () => {
      const { container } = render(
        <LikeIcon type="empty" className="custom-class" />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('type이 emptyWhite일 때 className과 text-white이 함께 적용된다', () => {
      const { container } = render(
        <LikeIcon type="emptyWhite" className="custom-class" />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-white', 'custom-class');
    });

    it('type이 active일 때 className과 text-red-500이 함께 적용된다', () => {
      const { container } = render(
        <LikeIcon type="active" className="custom-class" />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-red-500', 'custom-class');
    });

    it('className이 없을 때도 올바르게 렌더링된다', () => {
      const { container } = render(<LikeIcon type="empty" />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('SVG 구조 테스트', () => {
    it('모든 타입에서 기본 SVG 속성이 올바르게 설정된다', () => {
      const types: Array<'empty' | 'emptyWhite' | 'active'> = [
        'empty', 
        'emptyWhite', 
        'active'
      ];
      
      types.forEach(type => {
        const { container } = render(<LikeIcon type={type} />);
        const svg = container.querySelector('svg');
        
        expect(svg).toHaveAttribute('width', '24');
        expect(svg).toHaveAttribute('height', '24');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svg).toHaveAttribute('fill', 'none');
        expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
      });
    });

    it('empty 타입에서 올바른 path와 filter가 렌더링된다', () => {
      const { container } = render(<LikeIcon type="empty" />);
      
      const path = container.querySelector('path');
      expect(path).toHaveAttribute('fill', 'currentColor');
      expect(path).toHaveAttribute('fill-rule', 'evenodd');
      expect(path).toHaveAttribute('clip-rule', 'evenodd');
      
      const filter = container.querySelector('#filter0_d_22_262');
      expect(filter).toBeInTheDocument();
    });

    it('emptyWhite/active 타입에서 올바른 path와 filter가 렌더링된다', () => {
      const types: Array<'emptyWhite' | 'active'> = ['emptyWhite', 'active'];
      
      types.forEach(type => {
        const { container } = render(<LikeIcon type={type} />);
        
        const path = container.querySelector('path');
        expect(path).toHaveAttribute('fill', 'currentColor');
        
        const filter = container.querySelector('#filter0_d_22_260');
        expect(filter).toBeInTheDocument();
      });
    });

    it('각 타입별로 서로 다른 clipPath ID를 사용한다', () => {
      // empty 타입
      const { container: emptyContainer } = render(<LikeIcon type="empty" />);
      expect(emptyContainer.querySelector('#clip0_22_262')).toBeInTheDocument();
      expect(emptyContainer.querySelector('#clip0_22_260')).not.toBeInTheDocument();

      // emptyWhite 타입
      const { container: emptyWhiteContainer } = render(<LikeIcon type="emptyWhite" />);
      expect(emptyWhiteContainer.querySelector('#clip0_22_260')).toBeInTheDocument();
      expect(emptyWhiteContainer.querySelector('#clip0_22_262')).not.toBeInTheDocument();

      // active 타입
      const { container: activeContainer } = render(<LikeIcon type="active" />);
      expect(activeContainer.querySelector('#clip0_22_260')).toBeInTheDocument();
      expect(activeContainer.querySelector('#clip0_22_262')).not.toBeInTheDocument();
    });
  });

  describe('렌더링 분기 테스트', () => {
    it('type에 따라 다른 SVG 컴포넌트가 렌더링된다', () => {
      const { container: emptyContainer } = render(<LikeIcon type="empty" />);
      const { container: activeContainer } = render(<LikeIcon type="active" />);
      
      const emptyPath = emptyContainer.querySelector('path');
      const activePath = activeContainer.querySelector('path');
      
      // 두 path의 d 속성이 다른지 확인
      expect(emptyPath?.getAttribute('d')).not.toBe(activePath?.getAttribute('d'));
    });

    it('empty가 아닌 타입들은 동일한 SVG 구조를 사용한다', () => {
      const { container: emptyWhiteContainer } = render(<LikeIcon type="emptyWhite" />);
      const { container: activeContainer } = render(<LikeIcon type="active" />);
      
      const emptyWhitePath = emptyWhiteContainer.querySelector('path');
      const activePath = activeContainer.querySelector('path');
      
      // 같은 path d 속성을 가져야 함
      expect(emptyWhitePath?.getAttribute('d')).toBe(activePath?.getAttribute('d'));
    });
  });
});