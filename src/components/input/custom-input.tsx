import classNames from "classnames";

export type CustomInputProps = {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  label?: string;
  className?: string;
};

export const CustomInput = ({
  placeholder = "insert...",
  type,
  value,
  onChange,
  disabled,
  label,
  className,
}: CustomInputProps) => {
  const inputStyles = classNames(
    "lowercase text-sm text-amber-200 p-2 border rounded-md h-10 bg-yellow-950 placeholder-yellow-800 border-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-transparent w-full",
    className
  );

  return (
    <div className="flex flex-col w-full">
      <label className="truncate text-sm font-medium text-white mb-1 ml-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          className={inputStyles}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          value={value}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={inputStyles}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          value={value}
        />
      )}
    </div>
  );
};
