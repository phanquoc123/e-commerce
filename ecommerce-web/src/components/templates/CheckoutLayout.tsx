import HeaderMinimal from '../organisms/Header/HeaderMinimal';

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <>
      <HeaderMinimal />
      <main>{children}</main>
    </>
  );
}
