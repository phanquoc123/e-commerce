interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  publishDate: string;
  excerpt?: string;
}

export default function BlogCard({ title, slug, image, publishDate }: BlogCardProps) {
  return (
    <a
      href={slug}
      className="relative block w-full flex-col space-y-2"
    >
      <img
        className="aspect-video w-full rounded-md object-cover"
        src={image}
        alt={title}
        loading="lazy"
        draggable={false}
      />
      <p className="text-label-sm text-theme-text-secondary flex items-center gap-2">
        Ngày đăng: {publishDate}
      </p>
      <p className="text-theme-text text-label-md lg:text-heading-md line-clamp-2">{title}</p>
    </a>
  );
}
