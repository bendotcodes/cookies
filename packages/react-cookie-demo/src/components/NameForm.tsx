import React from 'react';

interface Props {
  name: string;
  onChange: (name: string) => void;
}

export default function NameForm({
  name,
  onChange,
}: Props): React.ReactElement {
  return (
    <div>
      <h1>What&apos;s your name?</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => onChange(e.target.value)}
        />
      </form>
    </div>
  );
}
