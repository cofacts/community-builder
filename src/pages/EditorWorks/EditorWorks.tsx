import React, { useState } from 'react';
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

const EditorWorks: React.FC = () => {
  const classes = useStyles();
  const [workType, setWorkType] = useState<WorkType>(WorkType.REPLY);
  const [day, setDay] = useState<number>(7);

  return (
    <>
      <Card classes={{ root: classes.controls }}>
        <CardContent classes={{ root: classes.controlContent }}>
          <TextField
            select
            value={workType}
            onChange={(e): void => setWorkType(+e.target.value)}
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
            defaultValue={day}
            onBlur={(e) => setDay(+e.target.value)}
          />{' '}
          days
        </CardContent>
      </Card>
      <Paper style={{ height: 700 }}>
        {workType === WorkType.REPLY ? (
          <ReplyTable startDate={`now-${day}d`} />
        ) : workType === WorkType.ARTICLE_REPLY_FEEDBACK ? (
          <FeedbackTable startDate={`now-${day}d`} />
        ) : workType === WorkType.REPLY_REQUEST ? (
          <ReplyRequestTable startDate={`now-${day}d`} />
        ) : null}
      </Paper>
    </>
  );
};

export default EditorWorks;
