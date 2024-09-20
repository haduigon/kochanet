import { useState } from 'react';

type Props = {
  name?: string;
  addition?: string;
  type: string;
  onChange?: (event: string) => void;
  value?: string;
};

const Input: React.FC<Props> = ({
  value,
  name,
  addition,
  type = 'text',
  onChange = () => {},
}) => {
  const [localValue, setLocalValue] = useState(value);

  function handleChange(event: string) {
    setLocalValue(event);
    onChange(event);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-left font-medium leading-6 text-gray-900"
        >
          {name}
        </label>
        <div className="block text-right font-medium leading-6 text-gray-900">
          {addition}
        </div>
      </div>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          required
          value={localValue}
          onChange={(event) => handleChange(event.currentTarget.value)}
          className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;
