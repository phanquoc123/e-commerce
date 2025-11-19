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

  console.log('productDetail render');

  // Lấy selectedColorId và selectedSizeId từ API response
  const selectedColorId = product?.selectedColorId ?? null;
  const selectedSizeId = product?.selectedSizeId ?? null;

  // Sử dụng ref để lưu giá trị mới nhất mà không trigger re-render
  const productRef = useRef(product);
  const selectedColorIdRef = useRef(selectedColorId);
  const selectedSizeIdRef = useRef(selectedSizeId);

  // Update refs khi giá trị thay đổi
  useEffect(() => {
    productRef.current = product;
    selectedColorIdRef.current = selectedColorId;
    selectedSizeIdRef.current = selectedSizeId;
  }, [product, selectedColorId, selectedSizeId]);

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

  // Callback stable - không bao giờ thay đổi vì sử dụng ref
  const handleAddToCart = useCallback((quantity: number) => {
    console.log('Thêm vào giỏ hàng:', {
      product: productRef.current?.name,
      productId: productRef.current?.id,
      colorId: selectedColorIdRef.current,
      sizeId: selectedSizeIdRef.current,
      quantity,
    });
  }, []); // Empty deps - callback không bao giờ thay đổi!

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
