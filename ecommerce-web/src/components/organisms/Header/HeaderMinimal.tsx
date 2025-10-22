import Logo from '../../atoms/Logo/Logo';

export default function HeaderMinimal() {
  return (
    <>
      <div className="border-b-border-primary sticky top-0 z-[60] mx-auto max-w-screen-sm border-b bg-white p-3 transition-all duration-300 ease-linear lg:max-w-full lg:px-12 lg:py-4">
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>
    </>
  );
}
