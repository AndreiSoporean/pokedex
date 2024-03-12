import { useRef, useState } from "react";
import classNames from "classnames";
import { ChevronDownIcon } from "../icons/icons";
import { useClickOutside } from "../../hooks/useClickOutside";
import { SelectOption } from "../../models/types";

export type CustomSelectProps = {
  label?: string;
  options: SelectOption[];
  onChange: (value: SelectOption) => void;
  value: string;
  mainClassName?: string;
  selectedClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
};

export function CustomSelect({
  label,
  options,
  mainClassName,
  selectedClassName,
  itemClassName,
  onChange,
  value,
  disabled,
}: CustomSelectProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectChange = (value: SelectOption) => {
    onChange(value);
    setIsMenuOpen(false);
  };

  const handleClickOutside = () => {
    setIsMenuOpen(false);
  };

  useClickOutside(ref, handleClickOutside);

  const mainStyles = classNames(
    "uppercase",
    mainClassName
  );
  const currentValueStyle = classNames("w-full", selectedClassName);
  const itemStyle = classNames("cursor-pointer list-none", itemClassName);

  const openSelectMenu = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <div
      ref={ref}
      className="w-full relative"
      tabIndex={0}
      onKeyDown={openSelectMenu}
    >
      {label && (
        <div className="text-sm text-white mb-1">
          {label}
        </div>
      )}
      <div className={mainStyles} onClick={!disabled ? toggleMenu : undefined}>
        <div className={currentValueStyle}>
          <div className="text-sm">{value}</div>
          <div className="w-6">
            <ChevronDownIcon />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="w-full flex flex-col gap-y-2 bg-yellow-950 absolute p-2 z-30 max-h-60 overflow-auto border-b border-r border-l border-amber-900">
          {options.map((option) => (
            <li
              key={option.name}
              className={itemStyle}
              onClick={() => handleSelectChange(option)}
              tabIndex={0}
            >
              {option.name}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
