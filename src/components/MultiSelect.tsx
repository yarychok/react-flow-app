import React, { useState, useRef } from 'react';
import { addNode, removeNode, setSelectedValues } from '../store/nodes/slice';
import { useDispatch } from 'react-redux';

interface MultiSelectOptions {
  value: string;
  label: string;
}

interface MultiSelectProps {
  id: string;
  options: MultiSelectOptions[];
  selectedValues: string[];
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  options,
  selectedValues,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedValuesRef = useRef<HTMLDivElement>(null);

  const onChange = (str: string[]) => {
    if (
      selectedValues &&
      selectedValues.every((elem, index) => elem === str[index])
    ) {
      dispatch(addNode({str, id}));
    } else {
      const difference: string = selectedValues
        .filter((item) => !str.includes(item))[0]
        .split(' ')[1];
      dispatch(removeNode(difference));
    }
  };

  const handleOptionClick = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    dispatch(setSelectedValues({id, updatedSelectedValues}));
    onChange(updatedSelectedValues);
  };

  const handleToggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      selectedValuesRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !selectedValuesRef.current.contains(event.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  return (
    <div className='multiselect-container'>
      <div
        ref={selectedValuesRef}
        className='multiselect-selected-values'
        onClick={handleToggleDropdown}
      >
        <span>
          {selectedValues.length === 0
            ? placeholder
            : selectedValues.join(', ')}
        </span>
        <span className={`Arrow ${isDropdown ? 'open' : ''}`}>
            &#9662;
        </span>
      </div>
      {isDropdown && (
        <div ref={dropdownRef} className='multiselect-options'>
          {options.map((option) => (
            <label key={option.value} className='multiselect-option'>
              <input
                type='checkbox'
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

