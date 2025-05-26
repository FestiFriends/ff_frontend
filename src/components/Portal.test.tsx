import { render, screen } from '@testing-library/react';
import Portal from './Portal';

describe('<Portal> 컴포넌트', () => {
  beforeAll(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  });

  afterAll(() => {
    const portalRoot = document.getElementById('portal');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  test('children을 #portal 엘리먼트에 포탈로 렌더링한다', () => {
    render(
      <Portal>
        <div data-testid='portal-child'>포탈 내용</div>
      </Portal>
    );

    const child = screen.getByTestId('portal-child');
    expect(child).toBeInTheDocument();

    const portal = document.getElementById('portal');
    expect(portal).toContainElement(child);
  });

  test('window가 없거나 #portal 엘리먼트가 없으면 null을 반환한다', () => {
    const portalRoot = document.getElementById('portal');
    if (portalRoot) document.body.removeChild(portalRoot);

    const { container } = render(
      <Portal>
        <div>내용</div>
      </Portal>
    );

    expect(container.firstChild).toBeNull();

    const newPortalRoot = document.createElement('div');
    newPortalRoot.setAttribute('id', 'portal');
    document.body.appendChild(newPortalRoot);
  });
});
