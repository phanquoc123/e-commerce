export default function ProductListSection() {
  return (
    <div className="flex flex-col gap-2 lg:gap-8">
      <div className="h-auto w-full bg-cover bg-no-repeat object-cover">
        <a href="#">
          <img className="rounded-xl" src="/images/banner/banner-pr.webp" alt="" loading="lazy" />
        </a>
      </div>
      <div className="relative overflow-hidden">
      List product
      </div>
    </div>
  );
}
