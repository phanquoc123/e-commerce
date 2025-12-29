import { useCallback, useEffect, useMemo, useRef } from 'react';
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
import { useAddToCart } from '../../../hooks/useCart';

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
  const addToCart = useAddToCart();

  // Lấy selectedColorId và selectedSizeId từ URL params (client-side)
  // Nếu không có trong URL, lấy màu/size đầu tiên
  const selectedColorId = useMemo(() => {
    if (urlColorId) return urlColorId;
    // Fallback: chọn màu đầu tiên nếu có
    return product?.colors?.[0]?.id ? Number(product.colors[0].id) : null;
  }, [urlColorId, product?.colors]);

  const selectedSizeId = useMemo(() => {
    if (urlSizeId) return urlSizeId;
    // Fallback: chọn size đầu tiên của màu được chọn nếu có
    const selectedColor = product?.colors?.find((c: any) => Number(c.id) === selectedColorId);
    return selectedColor?.sizes?.[0]?.id ? Number(selectedColor.sizes[0].id) : null;
  }, [urlSizeId, product?.colors, selectedColorId]);

  // Auto-select default color and size khi lần đầu load
  useEffect(() => {
    if (!product?.colors || product.colors.length === 0) return;

    const hasOldParams = searchParams.has('color') || searchParams.has('size');
    const hasNewParams = searchParams.has('colorId') || searchParams.has('sizeId');

    // Normalize URL: xóa params cũ và chuyển sang params mới
    if (hasOldParams && hasNewParams) {
      const newParams = new URLSearchParams();
      if (urlColorId) newParams.set('colorId', urlColorId.toString());
      if (urlSizeId) newParams.set('sizeId', urlSizeId.toString());
      setSearchParams(newParams, { replace: true });
      return;
    }

    if (hasOldParams && !hasNewParams) {
      const newParams = new URLSearchParams();
      if (urlColorId) newParams.set('colorId', urlColorId.toString());
      if (urlSizeId) newParams.set('sizeId', urlSizeId.toString());
      if (newParams.toString()) {
        setSearchParams(newParams, { replace: true });
      }
      return;
    }

    // Auto-select: Nếu chưa có colorId/sizeId trong URL, set mặc định
    if (!urlColorId && !urlSizeId) {
      const firstColor = product.colors[0];
      const firstSize = firstColor?.sizes?.[0];
      
      if (firstColor) {
        const newParams = new URLSearchParams();
        newParams.set('colorId', String(firstColor.id));
        if (firstSize) {
          newParams.set('sizeId', String(firstSize.id));
        }
        setSearchParams(newParams, { replace: true });
      }
    }
  }, [product, searchParams, urlColorId, urlSizeId, setSearchParams]);

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

  // Handle add to cart
  const handleAddToCart = useCallback(
    (quantity: number) => {
      if (!product || !activeVariant || !selectedColorId) {
        alert('Vui lòng chọn màu và size');
        return;
      }

      // Find color and size info
      const selectedColor = product.colors?.find((c: any) => Number(c.id) === selectedColorId);
      const selectedSize = selectedColor?.sizes?.find((s: any) => Number(s.id) === selectedSizeId);
      const mainImage = selectedColor?.images?.find((img: any) => img.isMain);

      if (!selectedColor) {
        alert('Không tìm thấy thông tin màu sắc');
        return;
      }

      addToCart.mutate(
        {
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          variantId: activeVariant.id,
          sku: activeVariant.sku,
          colorId: selectedColorId,
          colorName: selectedColor.name,
          colorHexCode: selectedColor.hexCode || null,
          sizeId: selectedSizeId,
          sizeName: selectedSize?.name || null,
          sizeCode: selectedSize?.code || null,
          price: activeVariant.price,
          quantity: quantity,
          imageUrl: mainImage?.imageUrl || selectedColor.thumbnailUrl || '',
          stock: activeVariant.stock,
        },
        {
          onSuccess: () => {
            alert('✅ Đã thêm vào giỏ hàng!');
          },
          onError: (error: any) => {
            alert(`❌ ${error.message}`);
          },
        }
      );
    },
    [product, activeVariant, selectedColorId, selectedSizeId, addToCart]
  );

  const handleColorSelect = useCallback(
    (colorId: number) => {
      const newColor = product?.colors?.find((c: any) => Number(c.id) === colorId);
      if (!newColor) return;

      const newParams = new URLSearchParams();
      newParams.set('colorId', colorId.toString());

      // Xử lý size: giữ nguyên nếu có trong màu mới, không thì chọn size đầu tiên
      const firstSize = newColor.sizes?.[0];
      if (firstSize && !selectedSizeId) {
        newParams.set('sizeId', Number(firstSize.id).toString());
      } else if (selectedSizeId) {
        const sizeExists = newColor.sizes?.some((s: any) => Number(s.id) === selectedSizeId);
        if (!sizeExists && firstSize) {
          newParams.set('sizeId', Number(firstSize.id).toString());
        } else if (sizeExists) {
          newParams.set('sizeId', selectedSizeId.toString());
        }
      }
      setSearchParams(newParams, { replace: true });
    },
    [product, selectedSizeId, setSearchParams]
  );

  const handleSizeSelect = useCallback(
    (sizeId: number) => {
      const newParams = new URLSearchParams();
      if (selectedColorId) {
        newParams.set('colorId', selectedColorId.toString());
      }
      newParams.set('sizeId', sizeId.toString());
      setSearchParams(newParams, { replace: true });
    },
    [selectedColorId, setSearchParams]
  );

  return (
    <MainLayout>
      <main className="mx-auto max-w-screen-sm lg:max-w-full">
        <Breadcrums />
        <div className="mx-auto flex w-full flex-col lg:max-w-screen-2xl lg:flex-row lg:gap-12 lg:px-24 lg:py-8">
          {/* Product Images */}
          <div className="flex w-[648px] flex-col gap-8">
            <ProductImageGallery
              colors={product?.colors}
              selectedColorId={selectedColorId}
              className="hidden lg:block"
            />
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
              colors={product?.colors}
              selectedColorId={selectedColorId}
              selectedSizeId={selectedSizeId}
              onColorSelect={handleColorSelect}
              onSizeSelect={handleSizeSelect}
            />

            <BlackLine />

            <ProductActions onAddToCart={handleAddToCart} />
            <StoreCommitment />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
