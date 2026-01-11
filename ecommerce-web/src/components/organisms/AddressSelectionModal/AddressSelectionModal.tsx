import { useState, useEffect } from 'react';

// Location data types
interface Province {
  code: number;
  name: string;
  division_type: string;
  phone_code: number;
}

interface District {
  code: number;
  name: string;
  province_code: number;
  division_type: string;
}

interface Ward {
  code: number;
  name: string;
  district_code: number;
  division_type: string;
}

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
}

export const AddressSelectionModal = ({
  isOpen,
  onClose,
  onSave,
}: AddressSelectionModalProps) => {
  const [activeTab, setActiveTab] = useState<'province' | 'district' | 'ward'>('province');
  const [searchTerm, setSearchTerm] = useState('');

  // Data states
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  // Selected values
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  // Detailed address input
  const [detailedAddress, setDetailedAddress] = useState('');

  // Fetch provinces on mount
  useEffect(() => {
    if (isOpen && provinces.length === 0) {
      fetchProvinces();
    }
  }, [isOpen]);

  const fetchProvinces = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDistricts = async (provinceCode: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts || []);
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWards = async (districtCode: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await response.json();
      setWards(data.wards || []);
    } catch (error) {
      console.error('Error fetching wards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const getCurrentList = () => {
    switch (activeTab) {
      case 'province':
        return provinces.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      case 'district':
        return districts.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      case 'ward':
        return wards.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      default:
        return [];
    }
  };

  const handleProvinceClick = (province: Province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]);
    setWards([]);
    fetchDistricts(province.code);
    setActiveTab('district');
    setSearchTerm('');
  };

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
    setWards([]);
    fetchWards(district.code);
    setActiveTab('ward');
    setSearchTerm('');
  };

  const handleWardClick = (ward: Ward) => {
    setSelectedWard(ward);
  };

  const handleSave = () => {
    if (selectedProvince && selectedDistrict && selectedWard && detailedAddress.trim()) {
      const fullAddress = `${detailedAddress.trim()}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;
      console.log('🏠 Modal calling onSave with:', fullAddress);
      onSave(fullAddress);
      // Let parent component handle closing
      // onClose();
      // Reset selections
      setSelectedProvince(null);
      setSelectedDistrict(null);
      setSelectedWard(null);
      setDetailedAddress('');
      setActiveTab('province');
      setSearchTerm('');
    }
  };

  const getDisplayText = () => {
    const parts = [];
    if (selectedWard) parts.push(selectedWard.name);
    if (selectedDistrict) parts.push(selectedDistrict.name);
    if (selectedProvince) parts.push(selectedProvince.name);
    return parts.join(', ') || 'Chưa chọn';
  };

  return (
    <>
      {/* Overlay - increased z-index to cover everything including layout header */}
      <div className="fixed inset-0 z-[9998] bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-[9999] lg:inset-0 lg:flex lg:items-center lg:justify-center">
        <div className="flex h-[90vh] flex-col rounded-t-2xl bg-white lg:h-[620px] lg:w-[420px] lg:rounded-2xl">
          {/* Header */}
          <div className="border-border-primary flex items-center justify-between border-b p-4">
            <h2 className="text-theme-text text-heading-md lg:text-lg lg:font-semibold">
              Chọn địa chỉ nhận hàng
            </h2>
            <button onClick={onClose} className="text-theme-text hover:text-theme-text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-border-primary flex border-b">
            <button
              className={`text-label-md lg:text-label-lg flex-1 border-b-2 px-4 py-3 ${
                activeTab === 'province'
                  ? 'border-border-brand text-theme-text'
                  : 'text-theme-text-secondary border-transparent'
              }`}
              onClick={() => setActiveTab('province')}
            >
              Tỉnh/Thành phố
            </button>
            <button
              className={`text-label-md lg:text-label-lg flex-1 border-b-2 px-4 py-3 ${
                activeTab === 'district'
                  ? 'border-border-brand text-theme-text'
                  : 'text-theme-text-secondary border-transparent'
              }`}
              onClick={() => setActiveTab('district')}
              disabled={!selectedProvince}
            >
              Quận/Huyện
            </button>
            <button
              className={`text-label-md lg:text-label-lg flex-1 border-b-2 px-4 py-3 ${
                activeTab === 'ward'
                  ? 'border-border-brand text-theme-text'
                  : 'text-theme-text-secondary border-transparent'
              }`}
              onClick={() => setActiveTab('ward')}
              disabled={!selectedDistrict}
            >
              Phường/Xã
            </button>
          </div>

          {/* Current Selection Display */}
          <div className="border-border-primary border-b bg-gray-50 px-4 py-2">
            <div className="flex items-center justify-between">
              <p className="text-placeholder-md text-theme-text-secondary flex-1">
                {getDisplayText()}
              </p>
              {selectedProvince && selectedDistrict && selectedWard && (
                <button
                  onClick={() => {
                    setSelectedWard(null);
                    setDetailedAddress('');
                    setActiveTab('ward');
                  }}
                  className="text-theme-text-secondary hover:text-theme-text ml-2"
                  title="Chỉnh sửa"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Detailed Address Input - Show when ward is selected */}
          {selectedProvince && selectedDistrict && selectedWard && (
            <div className="border-border-primary border-b p-4">
              <label className="text-label-sm text-theme-text mb-2 block">Địa chỉ cụ thể</label>
              <input
                type="text"
                placeholder="495 nguyễn thị thập"
                className="border-border-primary focus:border-border-brand text-placeholder-md w-full rounded-full border bg-white px-4 py-2.5 outline-none"
                value={detailedAddress}
                onChange={e => setDetailedAddress(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {/* Search Input - Hide when all selections are made */}
          {!(selectedProvince && selectedDistrict && selectedWard) && (
            <div className="border-border-primary border-b p-4">
              <div className="border-border-primary focus-within:border-border-brand flex items-center gap-2 rounded-full border bg-white px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-theme-text-secondary size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="text-placeholder-md flex-1 border-none bg-transparent outline-none"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* List - Hide when all selections are made */}
          {!(selectedProvince && selectedDistrict && selectedWard) && (
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-theme-text-secondary">Đang tải...</div>
                </div>
              ) : (
                <>
                  {activeTab === 'province' &&
                    getCurrentList().map((item: any) => (
                      <button
                        key={item.code}
                        className={`text-placeholder-md hover:bg-theme-surface w-full px-4 py-3 text-left ${
                          selectedProvince?.code === item.code
                            ? 'text-theme-text bg-amber-50 font-medium'
                            : 'text-theme-text'
                        }`}
                        onClick={() => handleProvinceClick(item as Province)}
                      >
                        {item.name}
                      </button>
                    ))}
                  {activeTab === 'district' &&
                    getCurrentList().map((item: any) => (
                      <button
                        key={item.code}
                        className={`text-placeholder-md hover:bg-theme-surface w-full px-4 py-3 text-left ${
                          selectedDistrict?.code === item.code
                            ? 'text-theme-text bg-amber-50 font-medium'
                            : 'text-theme-text'
                        }`}
                        onClick={() => handleDistrictClick(item as District)}
                      >
                        {item.name}
                      </button>
                    ))}
                  {activeTab === 'ward' &&
                    getCurrentList().map((item: any) => (
                      <button
                        key={item.code}
                        className={`text-placeholder-md hover:bg-theme-surface w-full px-4 py-3 text-left ${
                          selectedWard?.code === item.code
                            ? 'text-theme-text bg-amber-50 font-medium'
                            : 'text-theme-text'
                        }`}
                        onClick={() => handleWardClick(item as Ward)}
                      >
                        {item.name}
                      </button>
                    ))}
                </>
              )}
            </div>
          )}

          {/* Footer - Save Button (only show when all selected and detailed address is entered) */}
          {selectedProvince && selectedDistrict && selectedWard && detailedAddress.trim() && (
            <div className="border-border-primary border-t p-4">
              <button
                onClick={handleSave}
                className="text-label-md w-full rounded-full bg-yellow-400 py-3 font-medium text-gray-900 hover:bg-yellow-500"
              >
                Xác nhận
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
