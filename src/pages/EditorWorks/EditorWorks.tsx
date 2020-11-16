import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import ReplyTable from './ReplyTable';

const useStyles = makeStyles((theme) => ({
  controls: {
    marginBottom: theme.spacing(2),
  },
}));

const EditorWorks: React.FC = () => {
  const classes = useStyles();
  const [day, setDay] = useState<number>(7);

  return (
    <>
      <Card classes={{ root: classes.controls }}>
        <CardContent>
          In the last{' '}
          <input
            type="number"
            defaultValue={day}
            onBlur={(e) => setDay(+e.target.value)}
          />{' '}
          days
        </CardContent>
      </Card>
      <Paper style={{ height: 700 }}>
        <ReplyTable
          startDate={`now-${day}d`}
          key={/* Re-mount when day change */ day}
        />
      </Paper>
    </>
  );
};

export default EditorWorks;
