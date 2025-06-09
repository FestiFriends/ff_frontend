import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';
import formatPerformanceData from '@/utils/formatPerformanceData';
import { MESSAGES } from './PerformanceCardHeadless.messages';
import { STYLES } from './PerformanceCardHeadless.styles';

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
    throw new Error(MESSAGES.CONTEXT_ERROR);
  }
  return context;
};

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
        className={cn(STYLES.root, className)}
        onClick={onCardClick ? handleClick : undefined}
        onKeyDown={onCardClick ? handleKeyDown : undefined}
        role={onCardClick ? 'button' : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        aria-label={
          onCardClick ? MESSAGES.CARD_DETAIL_LABEL(data.title) : undefined
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
}: ImageProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { data } = usePerformanceCardContext();
  const { container, image, fallback: fallbackStyle } = STYLES.image;

  return (
    <div className={cn(container, className)}>
      {data.mainImage ? (
        <Image
          fill
          src={data.mainImage}
          alt={alt || MESSAGES.POSTER_ALT(data.title)}
          className={image}
          priority={priority}
        />
      ) : (
        fallback || (
          <div className={fallbackStyle}>{MESSAGES.NO_IMAGE_FALLBACK}</div>
        )
      )}
    </div>
  );
};

// Content Components
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
      className={cn(className)}
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
  const { base, ended, ongoing, upcoming } = STYLES.status;

  const statusStyle = data.isEnded
    ? ended
    : data.isOngoing
      ? ongoing
      : upcoming;

  return (
    <span
      className={cn(base, statusStyle, className)}
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
  const { dateRange } = STYLES.content;

  return (
    <div
      className={cn(dateRange, className)}
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
      className={cn(className)}
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
  const { cast } = STYLES.content;

  return (
    <div
      className={cn(cast, className)}
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
  const { price } = STYLES.content;

  return (
    <div
      className={cn(price, className)}
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
    unLiked: React.ReactNode;
  };
}

const LikeButton = ({
  isLiked = false,
  showText = false,
  className,
  children,
  icon = { liked: '❤️', unLiked: '🤍' },
  ...props
}: LikeButtonProps
  & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) => {
  const { performance, onLikeClick } = usePerformanceCardContext();
  const { base, text } = STYLES.likeButton;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick?.(performance, !isLiked);
  };

  if (!onLikeClick) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(base, className)}
      aria-label={
        isLiked ? MESSAGES.UNLIKE_BUTTON_LABEL : MESSAGES.LIKE_BUTTON_LABEL
      }
      {...props}
    >
      <span>{isLiked ? icon.liked : icon.unLiked}</span>
      {showText && (
        <span className={text}>
          {children || (isLiked ? MESSAGES.UNLIKE_TEXT : MESSAGES.LIKE_TEXT)}
        </span>
      )}
    </button>
  );
};

export {
  Root,
  ImageComponent as Image,
  Title,
  Status,
  DateRange,
  Location,
  Cast,
  Price,
  LikeButton,
};
