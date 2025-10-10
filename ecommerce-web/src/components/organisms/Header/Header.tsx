// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
export default function Header() {
  return (
    <>
      <header className="text-2 sticky top-0 mx-auto flex h-[60px] w-full items-center justify-between border-b border-gray-300 bg-white lg:px-12 lg:py-4">
        <div className="flex h-[32px] w-32 min-w-32 items-center gap-2 border border-gray-400 p-2 text-center">
          <FontAwesomeIcon icon={faBars} />
          <p className="">Danh mục</p>
        </div>
        Icon
        <FontAwesomeIcon icon={faCartShopping} />
      </header>
    </>
  );
}
