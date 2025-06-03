import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';
import formatPerformanceData from '@/utils/formatPerformanceData';
import { performanceCardStyles as styles } from './PerformanceCard.styles';

/* Context */
interface PerformanceCardContextValue {
  data: ReturnType<typeof formatPerformanceData>;
  performance: Performance;
  onCardClick?: (performance: Performance) => void;
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;
}

const PerformanceCardContext =
  React.createContext<PerformanceCardContextValue | null>(null);

const usePerformanceCard = () => {
  const context = React.useContext(PerformanceCardContext);
  if (!context) {
    throw new Error(
      'PerformanceCard 컴포넌트는 PerformanceCard.Root 내부에서 사용해야 합니다.'
    );
  }
  return context;
};

/* Headless Component */
const Root = ({
  performance,
  onCardClick,
  onLikeClick,
  children,
  className,
  ...props
}: {
  performance: Performance;
  onCardClick?: (performance: Performance) => void;
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;
  children: React.ReactNode;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>) => {
  const data = formatPerformanceData(performance);

  const contextValue: PerformanceCardContextValue = {
    performance,
    data,
    onCardClick,
    onLikeClick,
  };

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
        onClick={onCardClick ? () => onCardClick(performance) : undefined}
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

const Image_ = ({
  className,
  alt,
  ...props
}: {
  className?: string;
  alt?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCard();

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
        />
      ) : (
        <div className={styles.image.fallback}>No Image</div>
      )}
    </div>
  );
};

const Title = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) => {
  const { data } = usePerformanceCard();
  return (
    <h3
      className={className}
      {...props}
    >
      {children || data.title}
    </h3>
  );
};

const Status = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>) => {
  const { data } = usePerformanceCard();

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
      {children || data.status}
    </span>
  );
};

const DateRange = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCard();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.dateRange}
    </div>
  );
};

const Location = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCard();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.location}
    </div>
  );
};

const Cast = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCard();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.castSummary}
    </div>
  );
};

const Price = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCard();
  return (
    <div
      className={className}
      {...props}
    >
      {children || data.priceRange}
    </div>
  );
};

const LikeButton = ({
  isLiked = false,
  showText = false,
  className,
  children,
  ...props
}: {
  isLiked?: boolean;
  showText?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) => {
  const { performance, onLikeClick } = usePerformanceCard();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLikeClick) onLikeClick(performance, !isLiked);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      {...props}
    >
      <span>{isLiked ? '❤️' : '🤍'}</span>
      {showText && (
        <span>{children || (isLiked ? '좋아요 취소' : '좋아요')}</span>
      )}
    </button>
  );
};

/* Compound Component */
interface PerformanceCardProps {
  performance: Performance;
  className?: string;
  onCardClick?: (performance: Performance) => void;
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;
  variant?: 'default' | 'compact' | 'detailed';
  type?: 'horizontal' | 'vertical';
  showImage?: boolean;
  showStatus?: boolean;
  showCast?: boolean;
  showPrice?: boolean;
  showLikeButton?: boolean;
  isLiked?: boolean;
}

const PerformanceCard = ({
  performance,
  className,
  onCardClick,
  onLikeClick,
  variant = 'default',
  type = 'horizontal',
  showImage = true,
  showStatus = true,
  showCast = true,
  showPrice = true,
  showLikeButton = true,
  isLiked = false,
}: PerformanceCardProps) => {
  if (type === 'vertical') {
    return (
      <Root
        performance={performance}
        onCardClick={onCardClick}
        onLikeClick={onLikeClick}
        className={cn(
          styles.card.base,
          styles.card.variant[variant],
          className
        )}
      >
        {showLikeButton && (
          <LikeButton
            isLiked={isLiked}
            className={cn(
              styles.likeButton.base,
              styles.likeButton.size,
              styles.likeButton.position[
                variant === 'compact' ? 'compact' : 'default'
              ]
            )}
          />
        )}

        {showImage && <Image_ className={styles.image.size.vertical} />}

        <div className={styles.layout.vertical.container}>
          <Title
            className={cn(
              styles.title.base,
              variant === 'detailed'
                ? styles.title.size.verticalDetailed
                : styles.title.size.verticalDefault
            )}
          />

          <div className={styles.layout.vertical.info}>
            {showStatus && (
              <Status
                className={cn(
                  styles.status.size[
                    variant === 'compact' ? 'compact' : 'default'
                  ]
                )}
              />
            )}
            <DateRange />
            <Location />
            {showCast && <Cast />}
            {showPrice && (
              <Price
                className={
                  styles.price[variant === 'compact' ? 'compact' : 'default']
                }
              />
            )}
          </div>
        </div>
      </Root>
    );
  }

  if (variant === 'compact') {
    return (
      <Root
        performance={performance}
        onCardClick={onCardClick}
        onLikeClick={onLikeClick}
        className={cn(styles.card.base, styles.card.variant.compact, className)}
      >
        {showLikeButton && (
          <LikeButton
            isLiked={isLiked}
            className={cn(
              styles.likeButton.base,
              styles.likeButton.size,
              styles.likeButton.position.compact
            )}
          />
        )}

        <div className={styles.layout.horizontal.compact.container}>
          {showImage && <Image_ className={styles.image.size.compact} />}

          <div className={styles.layout.horizontal.compact.content}>
            <Title className={styles.title.size.compact} />
            <div
              className={cn(styles.info.container, styles.info.size.compact)}
            >
              {showStatus && <Status className={styles.status.size.compact} />}
              <DateRange />
              <Location />
              {showPrice && <Price className={styles.price.compact} />}
            </div>
          </div>
        </div>
      </Root>
    );
  }

  return (
    <Root
      performance={performance}
      onCardClick={onCardClick}
      onLikeClick={onLikeClick}
      className={cn(styles.card.base, styles.card.variant[variant], className)}
    >
      {showLikeButton && (
        <LikeButton
          isLiked={isLiked}
          className={cn(
            styles.likeButton.base,
            styles.likeButton.size,
            styles.likeButton.position.default
          )}
        />
      )}

      <div className={styles.layout.horizontal.default.container}>
        {showImage && <Image_ className={styles.image.size.default} />}

        <div className={styles.layout.horizontal.default.content}>
          <Title
            className={cn(
              styles.title.base,
              styles.title.size[variant === 'detailed' ? 'detailed' : 'default']
            )}
          />

          <div className={cn(styles.info.container, styles.info.size.default)}>
            {showStatus && <Status className={styles.status.size.default} />}
            <DateRange />
            <Location />
            {showCast && <Cast />}
            {showPrice && <Price className={styles.price.default} />}
          </div>
        </div>
      </div>
    </Root>
  );
};

PerformanceCard.Root = Root;
PerformanceCard.Image = Image_;
PerformanceCard.Title = Title;
PerformanceCard.Status = Status;
PerformanceCard.DateRange = DateRange;
PerformanceCard.Location = Location;
PerformanceCard.Cast = Cast;
PerformanceCard.Price = Price;
PerformanceCard.LikeButton = LikeButton;

export { PerformanceCard };
