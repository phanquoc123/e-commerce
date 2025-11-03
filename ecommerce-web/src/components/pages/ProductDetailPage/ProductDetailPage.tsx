import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import BlackLine from '../../atoms/BlackLine/BlackLine';
import Breadcrums from '../../molecules/Breadcrums/Breadcrums';
import ProductInfo from '../../molecules/ProductInfo/ProductInfo';
import ProductOptions from '../../molecules/ProductOptions/ProductOptions';
import ProductActions from '../../molecules/ProductActions/ProductActions';
import StoreCommitment from '../../molecules/StoreCommitment/StoreCommitment';
import ProductImageGallery from '../../molecules/ProductImageGallery/ProductImageGallery';
import { MainLayout } from '../../templates';
import { useProductDetail } from '../../../hooks/useProduct';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // Ưu tiên colorId và sizeId, nếu không có thì mới dùng color và size
  const urlColorId = useMemo(() => {
    const colorId = searchParams.get('colorId');
    if (colorId) return Number(colorId) || null;
    const color = searchParams.get('color');
    return color ? Number(color) || null : null;
  }, [searchParams]);

  const urlSizeId = useMemo(() => {
    const sizeId = searchParams.get('sizeId');
    if (sizeId) return Number(sizeId) || null;
    const size = searchParams.get('size');
    return size ? Number(size) || null : null;
  }, [searchParams]);
  const { data: product } = useProductDetail(slug ?? '', urlColorId, urlSizeId);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Helpers: mapping
  const colorByHex = useMemo(() => {
    const map = new Map<string, any>();
    product?.colors?.forEach(c => {
      if (c.hexCode) map.set(c.hexCode, c);
    });
    return map;
  }, [product]);

  const colorById = useMemo(() => {
    const map = new Map<number, any>();
    product?.colors?.forEach(c => map.set(Number(c.id), c));
    return map;
  }, [product]);

  // Lấy selectedColorId và selectedSizeId từ API response
  const selectedColorId = product?.selectedColorId ?? null;

  const selectedSizeId = product?.selectedSizeId ?? null;

  // Tìm màu được chọn dựa trên selectedColorId từ API
  const selectedColor = useMemo(() => {
    if (selectedColorId && colorById.has(selectedColorId)) {
      return colorById.get(selectedColorId);
    }
    return product?.colors?.[0] || null;
  }, [product, selectedColorId, colorById]);

  const selectedColorHex = selectedColor?.hexCode || undefined;

  // Tìm size được chọn dựa trên selectedSizeId từ API
  const selectedSize = useMemo(() => {
    if (selectedColor && selectedSizeId) {
      return selectedColor.sizes?.find((s: any) => Number(s.id) === selectedSizeId) || null;
    }
    return selectedColor?.sizes?.[0] || null;
  }, [selectedColor, selectedSizeId]);

  const selectedSizeCode = selectedSize?.code || undefined;

  // Normalize URL: xóa các params cũ (color, size) và chỉ giữ colorId, sizeId
  useEffect(() => {
    const hasOldParams = searchParams.has('color') || searchParams.has('size');
    const hasNewParams = searchParams.has('colorId') || searchParams.has('sizeId');

    if (hasOldParams && hasNewParams) {
      // Nếu có cả params cũ và mới, normalize về chỉ dùng params mới
      const newParams = new URLSearchParams();
      if (urlColorId) newParams.set('colorId', urlColorId.toString());
      if (urlSizeId) newParams.set('sizeId', urlSizeId.toString());
      setSearchParams(newParams, { replace: true });
    } else if (hasOldParams && !hasNewParams) {
      // Nếu chỉ có params cũ, chuyển sang params mới
      const newParams = new URLSearchParams();
      if (urlColorId) newParams.set('colorId', urlColorId.toString());
      if (urlSizeId) newParams.set('sizeId', urlSizeId.toString());
      if (newParams.toString()) {
        setSearchParams(newParams, { replace: true });
      }
    }
  }, [searchParams, urlColorId, urlSizeId]);

  // Initialize image từ màu được chọn
  useEffect(() => {
    if (!selectedColor) return;

    const main = selectedColor.images?.find((i: any) => i.isMain) || selectedColor.images?.[0];
    if (main) {
      setSelectedImage(main.imageUrl);
    }
  }, [selectedColor]);

  // Build options for UI với isSelected từ API
  const colorOptions = useMemo(() => {
    return (product?.colors || []).map(c => ({
      id: Number(c.id),
      name: c.name,
      value: c.hexCode || '#ccc',
      selected: selectedColorId !== null && Number(c.id) === selectedColorId,
    }));
  }, [product, selectedColorId]);

  const sizesForSelectedColor = useMemo(() => {
    return (selectedColor?.sizes || []).map((s: any) => ({
      id: Number(s.id),
      name: s.name,
      value: s.code,
      selected: selectedSizeId !== null && Number(s.id) === selectedSizeId,
    }));
  }, [selectedColor, selectedSizeId]);

  // Determine active variant by current color+size selection từ API
  const activeVariant = useMemo(() => {
    if (!product || !selectedColorId) return null;

    return (
      product.variants?.find(
        (v: any) =>
          Number(v.colorId) === selectedColorId &&
          (selectedSizeId ? Number(v.sizeId) === selectedSizeId : true)
      ) || null
    );
  }, [product, selectedColorId, selectedSizeId]);

  const handleAddToCart = () => {
    console.log('Thêm vào giỏ hàng:', {
      product: product?.name,
      productId: product?.id,
      colorId: selectedColorId,
      sizeId: selectedSizeId,
      quantity,
    });
  };

  return (
    <MainLayout>
      <main className="mx-auto max-w-screen-sm lg:max-w-full">
        <Breadcrums />
        <div className="mx-auto flex w-full flex-col lg:max-w-screen-2xl lg:flex-row lg:gap-12 lg:px-24 lg:py-8">
          {/* Product Images */}
          <div className="flex w-[648px] flex-col gap-8">
            <div className="flex gap-3">
              <ProductImageGallery
                images={(() => {
                  if (selectedColor) {
                    return (selectedColor.images || []).map((i: any) => i.imageUrl);
                  }
                  return [] as string[];
                })()}
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
                className="hidden lg:block"
              />
              <div className="relative flex-1">
                <div className="lg:rounded-sm">
                  <img
                    className="aspect-[3/4] size-full min-w-full snap-center snap-always object-cover sm:object-contain lg:rounded-md"
                    src={selectedImage}
                    alt="Main product image"
                    loading="lazy"
                  />
                </div>
                <div className="inset-x absolute bottom-0 z-[1] rotate-0">
                  <img
                    className="aspect-[8/1] h-auto w-full object-cover"
                    loading="lazy"
                    src="../images/product/image-bottom.webp"
                    alt="Sale Image"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-border-primary flex flex-col gap-4 border-b-2 bg-[#fff] px-3 pb-6 pt-4 lg:gap-8 lg:border-none lg:px-0 lg:pb-4 lg:pt-0">
            <ProductInfo
              name={product?.name || ''}
              price={product?.price || 0}
              salePrice={product?.salePrice}
            />
            <div className="text-body-sm text-theme-text-secondary">
              {activeVariant?.sku ? `${activeVariant.sku}` : ''}
            </div>

            <BlackLine />

            <ProductOptions
              colors={colorOptions}
              sizes={sizesForSelectedColor}
              selectedColor={selectedColorHex}
              selectedColorName={selectedColor?.name}
              selectedSize={selectedSizeCode}
              onColorSelect={hex => {
                const c = colorByHex.get(hex);
                if (!c) return;

                const newParams = new URLSearchParams();
                newParams.set('colorId', Number(c.id).toString());

                // Nếu có size của màu mới, giữ nguyên hoặc chọn size đầu tiên
                const firstSize = c.sizes?.[0];
                if (firstSize && !selectedSizeId) {
                  newParams.set('sizeId', Number(firstSize.id).toString());
                } else if (selectedSizeId) {
                  // Kiểm tra xem size hiện tại có trong màu mới không
                  const sizeExists = c.sizes?.some((s: any) => Number(s.id) === selectedSizeId);
                  if (!sizeExists && firstSize) {
                    newParams.set('sizeId', Number(firstSize.id).toString());
                  } else if (sizeExists) {
                    newParams.set('sizeId', selectedSizeId.toString());
                  }
                }
                setSearchParams(newParams, { replace: true });
              }}
              onSizeSelect={code => {
                // Tìm sizeId từ code
                const size = selectedColor?.sizes?.find((s: any) => s.code === code);
                if (!size) return;

                // Update URL params để gọi lại API với sizeId mới
                // Xóa các params cũ (color, size) và chỉ dùng colorId, sizeId
                const newParams = new URLSearchParams();
                if (selectedColorId) {
                  newParams.set('colorId', selectedColorId.toString());
                }
                newParams.set('sizeId', Number(size.id).toString());
                setSearchParams(newParams, { replace: true });
              }}
            />

            <BlackLine />

            <ProductActions
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
            />
            <StoreCommitment />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
