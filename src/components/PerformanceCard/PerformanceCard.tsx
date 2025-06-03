import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';
import formatPerformanceData from '@/utils/formatPerformanceData';
import { performanceCardStyles as styles } from './PerformanceCard.styles';

/* Context */
interface PerformanceCardContextValue {
  performance: Performance;
  data: ReturnType<typeof formatPerformanceData>;
  onCardClick?: (performance: Performance) => void;
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;
}

const PerformanceCardContext =
  React.createContext<PerformanceCardContextValue | null>(null);

const usePerformanceCardContext = () => {
  const context = React.useContext(PerformanceCardContext);
  if (!context) {
    throw new Error(
      'PerformanceCard 컴포넌트는 PerformanceCard.Root 내부에서 사용해야 합니다.'
    );
  }
  return context;
};

/* Headless Component */

// Root
interface RootProps {
  performance: Performance;
  onCardClick?: (performance: Performance) => void;
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const Root = ({
  performance,
  onCardClick,
  onLikeClick,
  children,
  className,
  ...props
}: RootProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>) => {
  const data = formatPerformanceData(performance);

  const contextValue: PerformanceCardContextValue = {
    performance,
    data,
    onCardClick,
    onLikeClick,
  };

  const handleClick = () => onCardClick?.(performance);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onCardClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onCardClick(performance);
    }
  };

  return (
    <PerformanceCardContext.Provider value={contextValue}>
      <div
        className={className}
        onClick={onCardClick ? handleClick : undefined}
        onKeyDown={onCardClick ? handleKeyDown : undefined}
        role={onCardClick ? 'button' : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        aria-label={onCardClick ? `${data.title} 공연 상세 보기` : undefined}
        {...props}
      >
        {children}
      </div>
    </PerformanceCardContext.Provider>
  );
};

// Image
interface ImageProps {
  className?: string;
  alt?: string;
  fallback?: React.ReactNode;
  priority?: boolean;
}

const ImageComponent = ({
  className,
  alt,
  fallback,
  priority = false,
  ...props
}: ImageProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCardContext();

  return (
    <div
      className={cn(styles.image.container, className)}
      {...props}
    >
      {data.mainImage ? (
        <Image
          fill
          src={data.mainImage}
          alt={alt || `${data.title} 포스터`}
          className='object-cover'
          priority={priority}
        />
      ) : (
        fallback || <div className={styles.image.fallback}>No Image</div>
      )}
    </div>
  );
};

// Content
interface ContentProps {
  className?: string;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

const Title = ({
  className,
  children,
  fallback,
  ...props
}: ContentProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  const { data } = usePerformanceCardContext();
  return (
    <h3
      className={cn(styles.title.base, className)}
      {...props}
    >
      {children || data.title || fallback}
    </h3>
  );
};

const Status = ({
  className,
  children,
  fallback,
  ...props
}: ContentProps & React.HTMLAttributes<HTMLSpanElement>) => {
  const { data } = usePerformanceCardContext();

  const stateClass = data.isEnded
    ? styles.status.state.ended
    : data.isOngoing
      ? styles.status.state.ongoing
      : styles.status.state.upcoming;

  return (
    <span
      className={cn(styles.status.base, stateClass, className)}
      {...props}
    >
      {children || data.status || fallback}
    </span>
  );
};

const DateRange = ({
  className,
  children,
  fallback,
  ...props
}: ContentProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCardContext();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.dateRange || fallback}
    </div>
  );
};
const Location = ({
  className,
  children,
  fallback,
  ...props
}: ContentProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCardContext();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.location || fallback}
    </div>
  );
};

const Cast = ({
  className,
  children,
  fallback,
  ...props
}: ContentProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCardContext();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.castSummary || fallback}
    </div>
  );
};

const Price = ({
  className,
  children,
  fallback,
  ...props
}: ContentProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCardContext();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.priceRange || fallback}
    </div>
  );
};

// LikeButton
// TODO: [?] 분리 해야 하는가
interface LikeButtonProps {
  isLiked?: boolean;
  showText?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: {
    liked: React.ReactNode;
    unliked: React.ReactNode;
  };
}

const LikeButton = ({
  isLiked = false,
  showText = false,
  className,
  children,
  icon = { liked: '❤️', unliked: '🤍' },
  ...props
}: LikeButtonProps
  & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) => {
  const { performance, onLikeClick } = usePerformanceCardContext();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick?.(performance, !isLiked);
  };

  if (!onLikeClick) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(styles.likeButton.base, className)}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      {...props}
    >
      <span>{isLiked ? icon.liked : icon.unliked}</span>
      {showText && (
        <span className='ml-1'>
          {children || (isLiked ? '좋아요 취소' : '좋아요')}
        </span>
      )}
    </button>
  );
};

/* Compound Component */
interface PresetCardProps {
  performance: Performance;
  className?: string;
  onCardClick?: (performance: Performance) => void;
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;
  isLiked?: boolean;
}

const DefaultCard = ({
  performance,
  className,
  onCardClick,
  onLikeClick,
  isLiked = false,
}: PresetCardProps) => (
  <Root
    performance={performance}
    onCardClick={onCardClick}
    onLikeClick={onLikeClick}
    className={cn(styles.card.base, styles.card.variant.default, className)}
  >
    <LikeButton
      isLiked={isLiked}
      className={cn(styles.likeButton.size, styles.likeButton.position.default)}
    />

    <div className={styles.layout.horizontal.default.container}>
      <ImageComponent className={styles.image.size.default} />

      <div className={styles.layout.horizontal.default.content}>
        <Title className={styles.title.size.default} />

        <div className={cn(styles.info.container, styles.info.size.default)}>
          <Status className={styles.status.size.default} />
          <DateRange />
          <Location />
          <Cast />
          <Price className={styles.price.default} />
        </div>
      </div>
    </div>
  </Root>
);

const CompactCard = ({
  performance,
  className,
  onCardClick,
  onLikeClick,
  isLiked = false,
}: PresetCardProps) => (
  <Root
    performance={performance}
    onCardClick={onCardClick}
    onLikeClick={onLikeClick}
    className={cn(styles.card.base, styles.card.variant.compact, className)}
  >
    <LikeButton
      isLiked={isLiked}
      className={cn(styles.likeButton.size, styles.likeButton.position.compact)}
    />

    <div className={styles.layout.horizontal.compact.container}>
      <ImageComponent className={styles.image.size.compact} />

      <div className={styles.layout.horizontal.compact.content}>
        <Title className={styles.title.size.compact} />
        <div className={cn(styles.info.container, styles.info.size.compact)}>
          <Status className={styles.status.size.compact} />
          <DateRange />
          <Location />
          <Price className={styles.price.compact} />
        </div>
      </div>
    </div>
  </Root>
);

const VerticalCard = ({
  performance,
  className,
  onCardClick,
  onLikeClick,
  isLiked = false,
}: PresetCardProps) => (
  <Root
    performance={performance}
    onCardClick={onCardClick}
    onLikeClick={onLikeClick}
    className={cn(styles.card.base, styles.card.variant.default, className)}
  >
    <LikeButton
      isLiked={isLiked}
      className={cn(styles.likeButton.size, styles.likeButton.position.default)}
    />

    <ImageComponent className={styles.image.size.vertical} />

    <div className={styles.layout.vertical.container}>
      <Title className={styles.title.size.verticalDefault} />

      <div className={styles.layout.vertical.info}>
        <Status className={styles.status.size.default} />
        <DateRange />
        <Location />
        <Cast />
        <Price className={styles.price.default} />
      </div>
    </div>
  </Root>
);

const DetailedCard = ({
  performance,
  className,
  onCardClick,
  onLikeClick,
  isLiked = false,
}: PresetCardProps) => (
  <Root
    performance={performance}
    onCardClick={onCardClick}
    onLikeClick={onLikeClick}
    className={cn(styles.card.base, styles.card.variant.detailed, className)}
  >
    <LikeButton
      isLiked={isLiked}
      className={cn(styles.likeButton.size, styles.likeButton.position.default)}
    />

    <div className={styles.layout.horizontal.default.container}>
      <ImageComponent className={styles.image.size.default} />

      <div className={styles.layout.horizontal.default.content}>
        <Title className={styles.title.size.detailed} />

        <div className={cn(styles.info.container, styles.info.size.default)}>
          <Status className={styles.status.size.default} />
          <DateRange />
          <Location />
          <Cast />
          <Price className={styles.price.default} />
        </div>
      </div>
    </div>
  </Root>
);

export const PerformanceCard = {
  Root,
  Image: ImageComponent,
  Title,
  Status,
  DateRange,
  Location,
  Cast,
  Price,
  LikeButton,

  Default: DefaultCard,
  Compact: CompactCard,
  Vertical: VerticalCard,
  Detailed: DetailedCard,

  useContext: usePerformanceCardContext,
};
