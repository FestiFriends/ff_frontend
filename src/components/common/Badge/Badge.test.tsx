import { render, screen } from '@testing-library/react';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import Badge from './Badge';
import { badgeStyles } from './Badge.styles';

describe('Badge 컴포넌트', () => {
  test('label 텍스트가 정상적으로 렌더링된다', () => {
    render(
      <Badge
        label={GroupCategoryLabels['COMPANION']}
        className={badgeStyles.category['COMPANION']}
      />
    );
    expect(screen.getByText('같이 동행')).toBeInTheDocument();
  });

  test('label이 GroupCategory일 경우 아이콘이 렌더링된다', () => {
    render(
      <Badge
        label={GroupCategoryLabels['COMPANION']}
        className={badgeStyles.category['COMPANION']}
      />
    );
    const badge = screen.getByText('같이 동행');
    expect(badge.querySelector('svg')).toBeInTheDocument();
  });

  test('label이 GroupCategory가 아니면 아이콘이 렌더링되지 않는다', () => {
    render(
      <Badge
        label={GenderLabels['FEMALE']}
        className={badgeStyles.category['FEMALE']}
      />
    );
    const badge = screen.getByText('여성');
    expect(badge.querySelector('svg')).not.toBeInTheDocument();
  });

  test('label에 맞는 className이 올바르게 적용된다', () => {
    render(
      <Badge
        label={GroupCategoryLabels['COMPANION']}
        className={badgeStyles.category['COMPANION']}
      />
    );
    const badge = screen.getByText('같이 동행');
    expect(badge).toHaveClass(
      'flex items-center gap-1 text-14_M text-gray-600'
    );
  });

  test('className props를 할당하면 올바르게 적용된다', () => {
    render(
      <Badge
        label={GroupCategoryLabels['COMPANION']}
        className={'bg-amber-800'}
      />
    );
    const badge = screen.getByText('같이 동행');
    expect(badge).toHaveClass('bg-amber-800');
  });
});
