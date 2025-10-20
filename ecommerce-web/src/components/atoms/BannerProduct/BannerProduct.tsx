interface BannerProductProps {
  href?: string;
  src?: string;
}

export default function BannerProduct({ href, src }: BannerProductProps) {
  return (
    <>
      <a href={href}>
        <img className="rounded-xl" src={src} alt="" loading="lazy" />
      </a>
      ;
    </>
  );
}
