import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import ReplyTable from './ReplyTable';
import FeedbackTable from './FeedbackTable';
import ReplyRequestTable from './ReplyRequestTable';
import { useUrlParams, WorkType } from './util';

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

const EditorWorks: React.FC = () => {
  const classes = useStyles();
  const [param, go] = useUrlParams();

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
        </CardContent>
      </Card>
      <Paper style={{ height: 700 }}>
        {param.workType === WorkType.REPLY ? (
          <ReplyTable startDate={`now-${param.day}d`} userId={param.userId} />
        ) : param.workType === WorkType.ARTICLE_REPLY_FEEDBACK ? (
          <FeedbackTable
            startDate={`now-${param.day}d`}
            userId={param.userId}
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
