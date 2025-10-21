import { useState } from 'react';
import BlackLine from '../../atoms/BlackLine/BlackLine';
import Breadcrums from '../../molecules/Breadcrums/Breadcrums';
import ProductInfo from '../../molecules/ProductInfo/ProductInfo';
import ProductOptions from '../../molecules/ProductOptions/ProductOptions';
import ProductActions from '../../molecules/ProductActions/ProductActions';
import StoreCommitment from '../../molecules/StoreCommitment/StoreCommitment';
import ProductImageGallery from '../../molecules/ProductImageGallery/ProductImageGallery';
import { MainLayout } from '../../templates';

// Mock data
const productData = {
  name: 'Áo Gió Nam Chống Nắng 4c Plus Dáng Suông',
  price: 539100,
  originalPrice: 599000,
  discount: 10,
  sku: 'MCPO25S109-SW001-S',
  image: './images/product/product-detail.webp',
  bottomImage: './images/product/image-bottom.webp',
  galleryImages: [
    './images/product/product-detail.webp',
    './images/product/product-detail-1.webp',
    './images/product/product-detail-2.webp',
    './images/product/product-detail-3.webp',
    './images/product/product-detail-4.webp',
  ],
};

const colorOptions = [
  { name: 'ĐEN 002', value: 'black' },
  { name: 'ĐỎ', value: 'red' },
  { name: 'XANH', value: 'green' },
];

const sizeOptions = [
  { name: 'S', value: 'S' },
  { name: 'M', value: 'M' },
  { name: 'L', value: 'L' },
  { name: 'XL', value: 'XL' },
];

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(productData.image);

  const handleAddToCart = () => {
    console.log('Thêm vào giỏ hàng:', {
      product: productData.name,
      color: selectedColor,
      size: selectedSize,
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
                images={productData.galleryImages}
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
              name={productData.name}
              price={productData.price}
              originalPrice={productData.originalPrice}
              discount={productData.discount}
              sku={productData.sku}
            />

            <BlackLine />

            <ProductOptions
              colors={colorOptions.map(color => ({
                ...color,
                selected: selectedColor === color.value,
              }))}
              sizes={sizeOptions.map(size => ({
                ...size,
                selected: selectedSize === size.value,
              }))}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorSelect={setSelectedColor}
              onSizeSelect={setSelectedSize}
            />

            <BlackLine />

            <ProductActions
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
            />
            <StoreCommitment />
          </div>

          {/* Store Commitment */}
        </div>
      </main>
    </MainLayout>
  );
}
