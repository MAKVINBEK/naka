import { useRef, useState } from 'react';
import css from './Profile.module.css';

const CodeInput = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value;
    if (!val.match(/^[0-9a-zA-Z]$/)) return;

    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    // Переключить фокус
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Если заполнено — вызвать колбэк
    if (newValues.every(v => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      const newValues = [...values];
      if (values[index] === '') {
        if (index > 0) {
          newValues[index - 1] = '';
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        newValues[index] = '';
      }
      setValues(newValues);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, length).split('');
    const newValues = [...values];

    pasted.forEach((char, i) => {
      newValues[i] = char;
    });

    setValues(newValues);
    inputsRef.current[pasted.length - 1]?.focus();

    if (pasted.length === length) {
      onComplete?.(pasted.join(''));
    }
  };

  return (
    <div className={css.code_input_wrapper}>
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => inputsRef.current[i] = el}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={css.input}
        />
      ))}
    </div>
  );
};

export default CodeInput;
