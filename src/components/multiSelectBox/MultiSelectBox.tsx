import React, { useState, useCallback, useMemo, ChangeEvent, JSX } from "react";
import "./MultiSelectBox.scss";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";
import toast from "react-hot-toast";

interface MultiSelectBoxProps {
  defaultOptions: string[];
  onSelect: (option: string) => void;
  selectedItems: string[];
}

const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  defaultOptions,
  onSelect,
  selectedItems,
}) => {
  const [selectBoxOptions, setSelectBoxOptions] = useState(defaultOptions);
  const [searchText, setSearchText] = useState("");
  const containerRef = useClickOutside(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(
    () =>
      selectBoxOptions.filter((option) =>
        option.toLowerCase().includes(searchText.toLowerCase())
      ),
    [selectBoxOptions, searchText]
  );

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleAddNewOption = () => {
    if (!searchText) return;
    if (!selectBoxOptions.includes(searchText)) {
      toast.success("Option added successfully.");
      setSelectBoxOptions((prev) => [...prev, searchText]);
    }
    onSelect(searchText);
    setSearchText("");
  };

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="multi-select-container" ref={containerRef}>
      <div className="select-box" onClick={toggleDropdown}>
        {selectedItems.length > 0 && (
          <div className="selected-items">
            {selectedItems.map((item) => (
              <span key={item} className="selected-item">
                {item}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item);
                  }}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search items..."
            value={searchText}
            onKeyUp={(e) => e.key === "Enter" && handleAddNewOption()}
            onChange={handleSearch}
            onFocus={handleInputFocus}
            onClick={(e) => e.stopPropagation()}
          />
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
            <MdOutlineKeyboardArrowUp /> 
          </span>
        </div>
      </div>
      {isOpen && (
        <ul className="options-list" role="listbox" aria-multiselectable="true">
          {filteredOptions.map((option) => {
            const isSelected = selectedItems.includes(option);
            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(option);
                }}
              >
                <span className="option-text">{option}</span>
                {isSelected && <FaCheck size={12} />}
              </li>
            );
          })}

          <li
            onClick={handleAddNewOption}
            className={!searchText ? "add-new-option-btn-disable" : ""}
          >
            <span>Add</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MultiSelectBox;
