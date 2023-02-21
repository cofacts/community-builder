import React from 'react';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ArticleCellFieldsFragment } from '../types';

export const TextCell = styled('div')({
  width: '100%',
  overflow: 'hidden',
  display: '-webkit-box',
  whiteSpace: 'normal',
  lineHeight: 1.2,
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': '3',
});

export const Blocked = styled('del')(({ theme }) => ({
  color: theme.palette.grey[300],
}));

type ArticleCellProps = { article: ArticleCellFieldsFragment };

export function ArticleCell({ article }: ArticleCellProps) {
  return (
    <TextCell>
      <Link
        href={`${process.env.REACT_APP_SITE_URL}/article/${article.id}`}
        color="textPrimary"
        variant="body2"
      >
        {(() => {
          switch (article.articleType) {
            case 'IMAGE':
              return article.attachmentUrl ? (
                <img
                  style={{ height: 64, verticalAlign: 'bottom' }}
                  src={article.attachmentUrl}
                  alt={article.id}
                />
              ) : (
                'Image'
              );
            case 'AUDIO':
              return (
                <Typography variant="body2" title={article.text || ''}>
                  Audio
                </Typography>
              );
            case 'VIDEO':
              return (
                <Typography variant="body2" title={article.text || ''}>
                  Video
                </Typography>
              );
            default:
              return (
                <Typography
                  display="inline"
                  variant="body2"
                  title={article.text || ''}
                >
                  {article.text || ''}
                </Typography>
              );
          }
        })()}
      </Link>
    </TextCell>
  );
}
