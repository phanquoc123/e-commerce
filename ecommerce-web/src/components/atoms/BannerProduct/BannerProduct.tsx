interface BannerProductProps {
  href?: string;
  src?: string;
}

export default function BannerProduct({ href, src }: BannerProductProps) {
  // Don't render if src is empty or undefined
  if (!src) {
    return null;
  }

  return (
    <a href={href || '#'}>
      <img className="rounded-xl" src={src} alt="Banner" loading="lazy" />
    </a>
  );
}
