import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

const CUSTOM = '_CUSTOM_' as const;

function DateTimePicker({ value, onChange }: Props) {
  const selectValue = value.startsWith('now') ? value : CUSTOM;

  return (
    <>
      <TextField
        select
        value={selectValue}
        onChange={(e) => {
          const { value } = e.target;
          if (value === CUSTOM) {
            return onChange(new Date().toISOString());
          }

          onChange(value);
        }}
      >
        <MenuItem value="now">Now</MenuItem>
        <MenuItem value="now-1d">1 day ago</MenuItem>
        <MenuItem value="now-2d">2 days ago</MenuItem>
        <MenuItem value="now-1w">1 week ago</MenuItem>
        <MenuItem value="now-2w">2 weeks ago</MenuItem>
        <MenuItem value="now-1M">1 month ago</MenuItem>
        <MenuItem value="now-2M">2 months ago</MenuItem>
        <MenuItem value={CUSTOM}>Custom</MenuItem>
      </TextField>

      {selectValue === CUSTOM && (
        <TextField
          label="From"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      )}
    </>
  );
}

export default React.memo(DateTimePicker);
