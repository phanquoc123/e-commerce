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
  const { data: product } = useProductDetail(slug || '');
  console.log('product', product);

  const urlColorId = useMemo(
    () => Number(searchParams.get('color') || searchParams.get('colorId') || 0) || null,
    [searchParams]
  );
  const urlSizeId = useMemo(
    () => Number(searchParams.get('size') || searchParams.get('sizeId') || 0) || null,
    [searchParams]
  );

  const [selectedColorHex, setSelectedColorHex] = useState<string | undefined>(undefined);
  const [selectedSizeCode, setSelectedSizeCode] = useState<string | undefined>(undefined);
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
    product?.colors?.forEach(c => map.set(c.id, c));
    return map;
  }, [product]);

  // Initialize selection from URL or defaults
  useEffect(() => {
    if (!product) return;

    if (urlColorId && colorById.get(urlColorId)) {
      const c = colorById.get(urlColorId);
      setSelectedColorHex(c.hexCode || undefined);
      if (urlSizeId) {
        const size = c.sizes.find((s: any) => s.id === urlSizeId);
        if (size) setSelectedSizeCode(size.code);
      }
      const main = c.images.find((i: any) => i.isMain) || c.images[0];
      if (main) setSelectedImage(main.imageUrl);
      return;
    }

    const firstColor = product.colors?.[0];
    if (firstColor) {
      setSelectedColorHex(firstColor.hexCode || undefined);
      const main = firstColor.images.find((i: any) => i.isMain) || firstColor.images[0];
      if (main) setSelectedImage(main.imageUrl);
      const firstSize = firstColor.sizes?.[0];
      if (firstSize) setSelectedSizeCode(firstSize.code);
    }
  }, [product, urlColorId, urlSizeId, colorById]);

  // Build options for UI
  const colorOptions = useMemo(() => {
    return (product?.colors || []).map(c => ({
      name: c.name,
      value: c.hexCode || '#ccc',
      selected: selectedColorHex === c.hexCode,
    }));
  }, [product, selectedColorHex]);

  const sizesForSelectedColor = useMemo(() => {
    const color = selectedColorHex ? colorByHex.get(selectedColorHex) : null;
    return (color?.sizes || []).map((s: any) => ({
      name: s.name,
      value: s.code,
      selected: selectedSizeCode === s.code,
    }));
  }, [colorByHex, selectedColorHex, selectedSizeCode]);

  // Determine active variant by current color+size selection
  const activeVariant = useMemo(() => {
    if (!product) return null;
    const color = selectedColorHex ? colorByHex.get(selectedColorHex) : null;
    if (!color) return null;
    return (
      product.variants?.find(
        (v: any) =>
          (v.colorId === color.id || v.productColorId === color.productColorId) &&
          (selectedSizeCode ? v.size?.code === selectedSizeCode : true)
      ) || null
    );
  }, [product, colorByHex, selectedColorHex, selectedSizeCode]);

  const handleAddToCart = () => {
    console.log('Thêm vào giỏ hàng:', {
      product: product?.name,
      colorHex: selectedColorHex,
      sizeCode: selectedSizeCode,
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
                  if (selectedColorHex) {
                    const c = colorByHex.get(selectedColorHex);
                    return (c?.images || []).map((i: any) => i.imageUrl);
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
                    src="./images/product/image-bottom.webp"
                    alt=""
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
              selectedSize={selectedSizeCode}
              onColorSelect={hex => {
                setSelectedColorHex(hex);
                const c = colorByHex.get(hex);
                const main = c?.images?.find((i: any) => i.isMain) || c?.images?.[0];
                if (main) setSelectedImage(main.imageUrl);
                const firstSize = c?.sizes?.[0];
                if (firstSize) setSelectedSizeCode(firstSize.code);
               
              }}
              onSizeSelect={code => {
                setSelectedSizeCode(code);
              
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
