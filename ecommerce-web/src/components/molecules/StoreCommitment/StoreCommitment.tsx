import { memo } from 'react';

interface CommitmentItem {
  icon: string;
  text: string;
  link?: string;
}

interface StoreCommitmentProps {
  title?: string;
  commitments?: CommitmentItem[];
}

const defaultCommitments: CommitmentItem[] = [
  {
    icon: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
    text: 'Giao trong 3-5 ngày và freeship đơn từ 498k',
  },
  {
    icon: 'M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3',
    text: 'Đổi trả trong vòng 30 ngày',
    link: '/page/chinh-sach-bao-hanh-doi-tra',
  },
  {
    icon: 'M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z',
    text: 'Cam kết bảo mật thông tin khách hàng',
  },
];

function StoreCommitment({
  title = 'YODY cam kết',
  commitments = defaultCommitments,
}: StoreCommitmentProps) {
  console.log('StoreCommitment render');
  return (
    <div className="border-border-primary space-y-2 rounded border-b bg-white px-3 py-6">
      <p className="text-theme-text text-heading-md">{title}</p>

      {commitments.map((commitment, index) => (
        <div key={index} className="flex items-center gap-2.5">
          <div className="bg-theme-surface rounded-sm p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={commitment.icon} />
            </svg>
          </div>

          {commitment.link ? (
            <div>
              <p className="text-theme-text text-body-md">{commitment.text}</p>
              <a
                href={commitment.link}
                target="_blank"
                rel="noreferrer"
                aria-label="view return policy"
              />
            </div>
          ) : (
            <p className="text-theme-text text-body-md">{commitment.text}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(StoreCommitment);
