import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import ReplyTable from './ReplyTable';
import FeedbackTable from './FeedbackTable';
import ReplyRequestTable from './ReplyRequestTable';

const useStyles = makeStyles((theme) => ({
  controls: {
    marginBottom: theme.spacing(2),
  },
  controlContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
}));

enum WorkType {
  REPLY,
  ARTICLE_REPLY_FEEDBACK,
  REPLY_REQUEST,
}

type ParamsFromUrl = Readonly<{
  workType: WorkType;
  day: number;
  userId?: string;
}>;

type GoFn = (p: ParamsFromUrl) => void;

function useUrlParams(): [ParamsFromUrl, GoFn] {
  const { search, pathname } = useLocation();
  const { push } = useHistory();
  const searchParams = new URLSearchParams(search);

  return [
    {
      workType: +(searchParams.get('type') ?? WorkType.REPLY),
      day: +(searchParams.get('day') ?? 7),
      userId: searchParams.get('userId') || undefined,
    },
    (p) => {
      const query = new URLSearchParams({
        type: p.workType.toString(),
        day: p.day.toString(),
        ...(p.userId ? { userId: p.userId } : {}),
      });
      push(`${pathname}?${query}`);
    },
  ];
}

const EditorWorks: React.FC = () => {
  const classes = useStyles();
  const [param, go] = useUrlParams();
  // eslint-disable-next-line no-console
  console.log('param', param);

  return (
    <>
      <Card classes={{ root: classes.controls }}>
        <CardContent classes={{ root: classes.controlContent }}>
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
        </CardContent>
      </Card>
      <Paper style={{ height: 700 }}>
        {param.workType === WorkType.REPLY ? (
          <ReplyTable startDate={`now-${param.day}d`} userId={param.userId} />
        ) : param.workType === WorkType.ARTICLE_REPLY_FEEDBACK ? (
          <FeedbackTable
            startDate={`now-${param.day}d`}
            userId={param.userId}
          />
        ) : param.workType === WorkType.REPLY_REQUEST ? (
          <ReplyRequestTable
            startDate={`now-${param.day}d`}
            userId={param.userId}
          />
        ) : null}
      </Paper>
    </>
  );
};

export default EditorWorks;
