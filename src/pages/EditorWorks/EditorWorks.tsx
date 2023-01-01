import React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import ReplyTable from './ReplyTable';
import FeedbackTable from './FeedbackTable';
import ReplyRequestTable from './ReplyRequestTable';
import { useUrlParams, WorkType } from './util';

const EditorWorks = () => {
  const [param, go] = useUrlParams();

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            select
            value={param.workType}
            onChange={(e): void => go({ ...param, workType: +e.target.value })}
          >
            <MenuItem value={WorkType.REPLY}>Replies</MenuItem>
            <MenuItem value={WorkType.ARTICLE_REPLY_FEEDBACK}>
              Feedbacks
            </MenuItem>
            <MenuItem value={WorkType.REPLY_REQUEST}>Comments</MenuItem>
          </TextField>{' '}
          in the last{' '}
          <input
            type="number"
            defaultValue={param.day}
            key={param.day /* Recreate when day in URL changes */}
            onBlur={(e) => go({ ...param, day: +e.target.value })}
          />{' '}
          days
          {param.userId && (
            <span>
              for user{' '}
              <a
                href={`${process.env.REACT_APP_SITE_URL}/user?id=${param.userId}`}
              >
                {param.userId}
              </a>
            </span>
          )}
          {param.articleReplyUserId &&
            param.workType === WorkType.ARTICLE_REPLY_FEEDBACK && (
              <span>
                for article reply user{' '}
                <a
                  href={`${process.env.REACT_APP_SITE_URL}/user?id=${param.articleReplyUserId}`}
                >
                  {param.articleReplyUserId}
                </a>
              </span>
            )}
        </CardContent>
      </Card>
      <Paper style={{ height: 700 }}>
        {param.workType === WorkType.REPLY ? (
          <ReplyTable startDate={`now-${param.day}d`} userId={param.userId} />
        ) : param.workType === WorkType.ARTICLE_REPLY_FEEDBACK ? (
          <FeedbackTable
            startDate={`now-${param.day}d`}
            userId={param.userId}
            articleReplyUserId={param.articleReplyUserId}
            showAll={param.showAll}
          />
        ) : param.workType === WorkType.REPLY_REQUEST ? (
          <ReplyRequestTable
            startDate={`now-${param.day}d`}
            userId={param.userId}
            showAll={param.showAll}
          />
        ) : null}
      </Paper>
    </>
  );
};

export default EditorWorks;
