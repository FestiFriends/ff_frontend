import React from 'react';
import { cn } from '@/lib/utils';

interface LikeIconProps {
  type: 'empty' | 'emptyWhite' | 'active';
  className?: string;
}

const LikeIcon = ({ type, className }: LikeIconProps) => {
  if (type === 'empty') {
    return (
      <svg
        className={cn(className)}
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_22_262)'>
          <g filter='url(#filter0_d_22_262)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.56253 9.88408C4.5677 9.91168 4.5721 9.93943 4.57572 9.96728C4.83401 11.9562 6.8494 15.7757 12.0588 18.2985C17.3441 15.739 19.3365 11.8486 19.5511 9.89033C19.5541 9.86297 19.5578 9.83569 19.5623 9.80854C19.5946 9.61375 19.6115 9.41299 19.6115 9.20726C19.6115 7.17852 17.9394 5.5 15.8346 5.5C14.7673 5.5 13.8089 5.93238 13.1229 6.62685C12.8411 6.91212 12.4568 7.07268 12.0558 7.07268C11.6548 7.07268 11.2705 6.91212 10.9886 6.62685C10.3026 5.93238 9.3442 5.5 8.27689 5.5C6.17212 5.5 4.5 7.17852 4.5 9.20726C4.5 9.43963 4.52159 9.66571 4.56253 9.88408ZM12.0625 19.95C12.531 19.742 12.9787 19.5236 13.4061 19.2963C18.5713 16.5493 20.7731 12.5096 21.0422 10.0537C21.0878 9.77821 21.1115 9.49547 21.1115 9.20726C21.1115 6.33137 18.749 4 15.8346 4C14.3997 4 13.0986 4.56516 12.1473 5.48221C12.1164 5.512 12.0859 5.54216 12.0558 5.57268C12.0256 5.54216 11.9951 5.512 11.9642 5.48222C11.0129 4.56516 9.7118 4 8.27689 4C5.36255 4 3 6.33137 3 9.20726C3 9.53283 3.03028 9.85143 3.08821 10.1605C3.40832 12.6253 5.62041 16.5888 10.7115 19.2963C11.1388 19.5236 11.5865 19.742 12.0551 19.95C12.0555 19.9502 12.0559 19.9504 12.0563 19.9506V19.9528L12.0588 19.9517L12.0613 19.9528V19.9506C12.0617 19.9504 12.0621 19.9502 12.0625 19.95Z'
              fill='currentColor'
            />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_d_22_262'
            x='0'
            y='1'
            width='24.1115'
            height='21.9528'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood
              floodOpacity='0'
              result='BackgroundImageFix'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite
              in2='hardAlpha'
              operator='out'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_22_262'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_22_262'
              result='shape'
            />
          </filter>
          <clipPath id='clip0_22_262'>
            <rect
              width='24'
              height='24'
              fill='white'
            />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className={cn(
        type === 'emptyWhite' ? 'text-white' : 'text-[#FF2727]',
        className
      )}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_22_260)'>
        <g filter='url(#filter0_d_22_260)'>
          <path
            d='M3 9.20726C3 9.53283 3.03028 9.85143 3.08821 10.1605C3.43521 12.8325 6.0055 17.2654 12.0563 19.9506V19.9528L12.0588 19.9517L12.0613 19.9528V19.9506C18.1934 17.2293 20.7508 12.713 21.0422 10.0537C21.0878 9.77821 21.1115 9.49547 21.1115 9.20726C21.1115 6.33137 18.749 4 15.8346 4C14.3531 4 13.0142 4.60247 12.0558 5.57268C11.0973 4.60247 9.7584 4 8.27689 4C5.36255 4 3 6.33137 3 9.20726Z'
            fill='currentColor'
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_d_22_260'
          x='0'
          y='1'
          width='24.1115'
          height='21.9528'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood
            floodOpacity='0'
            result='BackgroundImageFix'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='1.5' />
          <feComposite
            in2='hardAlpha'
            operator='out'
          />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_22_260'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_22_260'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_22_260'>
          <rect
            width='24'
            height='24'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LikeIcon;
