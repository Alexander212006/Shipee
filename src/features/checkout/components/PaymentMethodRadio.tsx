type PaymentMethodRadioProps = {
  label: string;
  value: string;
  checked: boolean;
  name?: string;
  onChange: (value: string) => void;
};

export const PaymentMethodRadio = ({
  label,
  value,
  checked,
  name = 'paymentMethod',
  onChange,
}: PaymentMethodRadioProps) => {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
      <span>{label}</span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4 accent-zinc-900"
      />
    </label>
  );
};
