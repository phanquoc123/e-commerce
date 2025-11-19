import { memo } from 'react';

function Breadcrums() {
  console.log('Breadcrums render');
  return (
    <>
      <nav className="border-border-primary hidden border-b border-t px-12 py-4 lg:block">
        <ol className="flex flex-wrap items-center gap-2 break-words text-[14px] font-medium leading-5">
          <li className="inline-flex items-center gap-2">
            <span className="text-theme-text-secondary hidden">/</span>
            <a className="text-theme-text-secondary" href="/">
              Trang chủ
            </a>
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="text-theme-text-secondary">/</span>
            <a
              aria-disabled="true"
              className="text-theme-text line-clamp-1 max-w-[260px] lg:max-w-full"
            >
              {/* {productName} - {productColorName} - {productSize} */}
              Áo Polo Nam Mắt Chim Cơ Bản Dáng Suông - Tím Than 006 - S
            </a>
          </li>
        </ol>
      </nav>
    </>
  );
}

export default memo(Breadcrums);
