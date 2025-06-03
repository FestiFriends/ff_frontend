/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';
import formatPerformanceData from '@/utils/formatPerformanceData';
import { PERFORMANCE_CARD_MESSAGES } from './PerformanceCard.messages';
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
    throw new Error(PERFORMANCE_CARD_MESSAGES.CONTEXT_ERROR);
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
        aria-label={
          onCardClick
            ? PERFORMANCE_CARD_MESSAGES.CARD_DETAIL_LABEL(data.title)
            : undefined
        }
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
          alt={alt || PERFORMANCE_CARD_MESSAGES.POSTER_ALT(data.title)}
          className='object-cover'
          priority={priority}
        />
      ) : (
        fallback || (
          <div className={styles.image.fallback}>
            {PERFORMANCE_CARD_MESSAGES.NO_IMAGE_FALLBACK}
          </div>
        )
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
      aria-label={
        isLiked
          ? PERFORMANCE_CARD_MESSAGES.UNLIKE_BUTTON_LABEL
          : PERFORMANCE_CARD_MESSAGES.LIKE_BUTTON_LABEL
      }
      {...props}
    >
      <span>{isLiked ? icon.liked : icon.unliked}</span>
      {showText && (
        <span className='ml-1'>
          {children
            || (isLiked
              ? PERFORMANCE_CARD_MESSAGES.UNLIKE_TEXT
              : PERFORMANCE_CARD_MESSAGES.LIKE_TEXT)}
        </span>
      )}
    </button>
  );
};

/* compound */

interface VisibilityProps {
  showImage?: boolean;
  showTitle?: boolean;
  showStatus?: boolean;
  showDateRange?: boolean;
  showLocation?: boolean;
  showCast?: boolean;
  showPrice?: boolean;
  showLikeButton?: boolean;
}

// variants
const DefaultCard = ({
  isLiked = false,
  showImage = true,
  showTitle = true,
  showStatus = true,
  showDateRange = true,
  showLocation = true,
  showCast = true,
  showPrice = true,
  showLikeButton = true,
}: { isLiked?: boolean } & VisibilityProps) => (
  <>
    {showLikeButton && (
      <LikeButton
        isLiked={isLiked}
        className={cn(
          styles.likeButton.size,
          styles.likeButton.position.default
        )}
      />
    )}
    <div className={styles.layout.horizontal.default.container}>
      {showImage && <ImageComponent className={styles.image.size.default} />}
      <div className={styles.layout.horizontal.default.content}>
        {showTitle && <Title className={styles.title.size.default} />}
        <div className={cn(styles.info.container, styles.info.size.default)}>
          {showStatus && <Status className={styles.status.size.default} />}
          {showDateRange && <DateRange />}
          {showLocation && <Location />}
          {showCast && <Cast />}
          {showPrice && <Price className={styles.price.default} />}
        </div>
      </div>
    </div>
  </>
);

const CompactCard = ({
  isLiked = false,
  showImage = true,
  showTitle = true,
  showStatus = true,
  showDateRange = true,
  showLocation = true,
  showCast = false,
  showPrice = true,
  showLikeButton = true,
}: { isLiked?: boolean } & VisibilityProps) => (
  <>
    {showLikeButton && (
      <LikeButton
        isLiked={isLiked}
        className={cn(
          styles.likeButton.size,
          styles.likeButton.position.compact
        )}
      />
    )}
    <div className={styles.layout.horizontal.compact.container}>
      {showImage && <ImageComponent className={styles.image.size.compact} />}
      <div className={styles.layout.horizontal.compact.content}>
        {showTitle && <Title className={styles.title.size.compact} />}
        <div className={cn(styles.info.container, styles.info.size.compact)}>
          {showStatus && <Status className={styles.status.size.compact} />}
          {showDateRange && <DateRange />}
          {showLocation && <Location />}
          {showCast && <Cast />}
          {showPrice && <Price className={styles.price.compact} />}
        </div>
      </div>
    </div>
  </>
);

const VerticalCard = ({
  isLiked = false,
  showImage = true,
  showTitle = true,
  showStatus = true,
  showDateRange = true,
  showLocation = true,
  showCast = true,
  showPrice = true,
  showLikeButton = true,
}: { isLiked?: boolean } & VisibilityProps) => (
  <>
    {showLikeButton && (
      <LikeButton
        isLiked={isLiked}
        className={cn(
          styles.likeButton.size,
          styles.likeButton.position.default
        )}
      />
    )}
    {showImage && <ImageComponent className={styles.image.size.vertical} />}
    <div className={styles.layout.vertical.container}>
      {showTitle && <Title className={styles.title.size.verticalDefault} />}
      <div className={styles.layout.vertical.info}>
        {showStatus && <Status className={styles.status.size.default} />}
        {showDateRange && <DateRange />}
        {showLocation && <Location />}
        {showCast && <Cast />}
        {showPrice && <Price className={styles.price.default} />}
      </div>
    </div>
  </>
);

const DetailedCard = ({
  isLiked = false,
  showImage = true,
  showTitle = true,
  showStatus = true,
  showDateRange = true,
  showLocation = true,
  showCast = true,
  showPrice = true,
  showLikeButton = true,
}: { isLiked?: boolean } & VisibilityProps) => (
  <>
    {showLikeButton && (
      <LikeButton
        isLiked={isLiked}
        className={cn(
          styles.likeButton.size,
          styles.likeButton.position.default
        )}
      />
    )}
    <div className={styles.layout.horizontal.default.container}>
      {showImage && <ImageComponent className={styles.image.size.default} />}
      <div className={styles.layout.horizontal.default.content}>
        {showTitle && <Title className={styles.title.size.detailed} />}
        <div className={cn(styles.info.container, styles.info.size.default)}>
          {showStatus && <Status className={styles.status.size.default} />}
          {showDateRange && <DateRange />}
          {showLocation && <Location />}
          {showCast && <Cast />}
          {showPrice && <Price className={styles.price.default} />}
        </div>
      </div>
    </div>
  </>
);

/* export */
type CardType = 'default' | 'compact' | 'vertical' | 'detailed';

interface PerformanceCardProps extends VisibilityProps {
  performance: Performance;
  type?: CardType;
  className?: string;
  onCardClick?: (performance: Performance) => void;
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;
  isLiked?: boolean;
}

const PerformanceCard = ({
  performance,
  type = 'default',
  className,
  onCardClick,
  onLikeClick,
  isLiked = false,
  showImage,
  showTitle,
  showStatus,
  showDateRange,
  showLocation,
  showCast,
  showPrice,
  showLikeButton,
}: PerformanceCardProps) => {
  const visibilityProps = {
    showImage,
    showTitle,
    showStatus,
    showDateRange,
    showLocation,
    showCast,
    showPrice,
    showLikeButton,
  };

  const getCardContent = () => {
    switch (type) {
      case 'compact':
        return (
          <CompactCard
            isLiked={isLiked}
            {...visibilityProps}
          />
        );
      case 'vertical':
        return (
          <VerticalCard
            isLiked={isLiked}
            {...visibilityProps}
          />
        );
      case 'detailed':
        return (
          <DetailedCard
            isLiked={isLiked}
            {...visibilityProps}
          />
        );
      default:
        return (
          <DefaultCard
            isLiked={isLiked}
            {...visibilityProps}
          />
        );
    }
  };

  const getCardVariantClass = () => {
    switch (type) {
      case 'compact':
        return styles.card.variant.compact;
      case 'detailed':
        return styles.card.variant.detailed;
      default:
        return styles.card.variant.default;
    }
  };

  return (
    <Root
      performance={performance}
      onCardClick={onCardClick}
      onLikeClick={onLikeClick}
      className={cn(styles.card.base, getCardVariantClass(), className)}
    >
      {getCardContent()}
    </Root>
  );
};

export default PerformanceCard;

export {
  PerformanceCard,
  Root,
  ImageComponent as Image,
  Title,
  Status,
  DateRange,
  Location,
  Cast,
  Price,
  LikeButton,
  usePerformanceCardContext,
  type VisibilityProps,
};

PerformanceCard.Root = Root;
PerformanceCard.Image = ImageComponent;
PerformanceCard.Title = Title;
PerformanceCard.Status = Status;
PerformanceCard.DateRange = DateRange;
PerformanceCard.Location = Location;
PerformanceCard.Cast = Cast;
PerformanceCard.Price = Price;
PerformanceCard.LikeButton = LikeButton;
PerformanceCard.useContext = usePerformanceCardContext;
