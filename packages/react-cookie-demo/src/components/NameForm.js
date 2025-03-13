import React from 'react';

export default function NameForm({ name, onChange }) {
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
