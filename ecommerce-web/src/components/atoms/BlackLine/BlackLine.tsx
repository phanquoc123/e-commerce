import { memo } from 'react';

function BlackLine({ className }: { className?: string }) {
  console.log('BlackLine render');
  return <div className={`h-px border-b border-dashed bg-gray-300 ${className}`}></div>;
}

export default memo(BlackLine);
