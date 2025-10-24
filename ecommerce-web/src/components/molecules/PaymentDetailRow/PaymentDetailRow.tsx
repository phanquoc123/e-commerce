interface PaymentDetailRowProps {
  label: string;
  value: string | React.ReactNode;
  isHighlight?: boolean;
  className?: string;
}

export default function PaymentDetailRow({ 
  label, 
  value, 
  isHighlight = false,
  className = '' 
}: PaymentDetailRowProps) {
  const labelClass = isHighlight 
    ? "text-theme-text text-label-md" 
    : "text-theme-text text-body-sm";
  
  const valueClass = isHighlight
    ? "text-price-lg text-brandsecondary-text"
    : "text-theme-text text-price-md";

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className={labelClass}>{label}</p>
      {typeof value === 'string' ? (
        <p className={valueClass}>{value}</p>
      ) : (
        value
      )}
    </div>
  );
}

