interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function QuantityStepper({ value, onChange, min = 1, max = 99, disabled }: QuantityStepperProps) {
  return (
    <div className="flex items-center border rounded overflow-hidden w-fit">
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
        className="w-8 h-8 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
      >
        −
      </button>
      <span className="w-10 text-center text-sm">{value}</span>
      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
      >
        +
      </button>
    </div>
  );
}