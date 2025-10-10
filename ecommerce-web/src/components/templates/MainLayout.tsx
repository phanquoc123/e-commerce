import Header from '../organisms/Header/Header';
import Footer from '../organisms/Footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
