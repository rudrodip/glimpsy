import { cn } from "@/lib/utils"

export default function GradientBackground({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("hidden md:block absolute inset-0 w-full overflow-x-hidden pointer-events-none -z-50", className)}>
        <div className="absolute inset-0" style={{ opacity: 1 }}>
          <div className="absolute left-1/2 h-full w-[350%] -translate-x-1/2 overflow-hidden md:w-[190%] lg:w-[190%] xl:w-[190%] 2xl:mx-auto 2xl:max-w-[2900px] flex items-start justify-center">
            <svg width="2596" height="2600" viewBox="0 0 2596 2600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1488_180)">
                <g filter="url(#filter0_f_1488_180)">
                  <path opacity="0.65" d="M2143 1234.99V965.009C2143 572.882 1825.12 255 1432.99 255H1163.01C770.882 255 453 572.882 453 965.009V1234.99C453 1627.12 770.882 1945 1163.01 1945H1432.99C1825.12 1945 2143 1627.12 2143 1234.99Z" fill="#FF4583" />
                </g>
                <g filter="url(#filter1_f_1488_180)">
                  <path opacity="0.65" d="M2126 1220.25V984.685C2126 592.558 1808.12 274.676 1415.99 274.676H1182.41C790.282 274.676 472.4 592.558 472.4 984.685V1220.25C472.4 1612.37 790.282 1930.26 1182.41 1930.26H1415.99C1808.12 1930.26 2126 1612.37 2126 1220.25Z" fill="#F263A1" />
                </g>
                <g filter="url(#filter2_f_1488_180)">
                  <path d="M2018 1112.07V1092.88C2018 700.749 1700.12 382.867 1307.99 382.867H1290.21C898.082 382.867 580.2 700.749 580.2 1092.88V1112.07C580.2 1504.2 898.082 1822.08 1290.21 1822.08H1307.99C1700.12 1822.08 2018 1504.2 2018 1112.07Z" fill="#FDB9C4" />
                  <path d="M2057 1118.62V1086.31C2057 694.187 1739.12 376.305 1346.99 376.305H1251.21C859.082 376.305 541.2 694.187 541.2 1086.31V1118.62C541.2 1510.74 859.082 1828.62 1251.21 1828.62H1346.99C1739.12 1828.62 2057 1510.74 2057 1118.62Z" fill="#F66F93" />
                  <path opacity="0.65" d="M2018 1112.07V1092.88C2018 700.749 1700.12 382.867 1307.99 382.867H1290.21C898.082 382.867 580.2 700.749 580.2 1092.88V1112.07C580.2 1504.2 898.082 1822.08 1290.21 1822.08H1307.99C1700.12 1822.08 2018 1504.2 2018 1112.07Z" fill="#FF7EA3" />
                </g>
                <g filter="url(#filter3_f_1488_180)">
                  <path d="M1858 1167.68V1049.18C1858 782.347 1641.69 566.035 1374.85 566.035H1223.22C956.382 566.035 740.07 782.347 740.07 1049.18V1167.68C740.07 1434.51 956.382 1650.83 1223.22 1650.83H1374.85C1641.69 1650.83 1858 1434.51 1858 1167.68Z" fill="#EA0EA5" fillOpacity="0.64" />
                </g>
                <g filter="url(#filter4_f_1488_180)">
                  <path d="M1779 1195.68V979.817C1779 714.06 1563.56 498.621 1297.8 498.621C1032.05 498.621 816.609 714.06 816.609 979.817V1195.68C816.609 1461.43 1032.05 1676.87 1297.8 1676.87C1563.56 1676.87 1779 1461.43 1779 1195.68Z" fill="#FF2870" fillOpacity="0.94" />
                </g>
              </g>
              <defs>
                <filter id="filter0_f_1488_180" x="173" y="-25" width="2250" height="2250" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="140" result="effect1_foregroundBlur_1488_180" />
                </filter>
                <filter id="filter1_f_1488_180" x="352.4" y="154.676" width="1893.6" height="1895.58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur_1488_180" />
                </filter>
                <filter id="filter2_f_1488_180" x="425.2" y="260.305" width="1747.8" height="1684.32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="58" result="effect1_foregroundBlur_1488_180" />
                </filter>
                <filter id="filter3_f_1488_180" x="510.07" y="336.035" width="1577.93" height="1544.79" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="115" result="effect1_foregroundBlur_1488_180" />
                </filter>
                <filter id="filter4_f_1488_180" x="586.609" y="268.621" width="1422.39" height="1638.25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="115" result="effect1_foregroundBlur_1488_180" />
                </filter>
                <clipPath id="clip0_1488_180">
                  <rect width="2596" height="2600" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="hidden md:block absolute inset-0 pointer-events-none -z-40"
        style={{
          backgroundImage: 'url(/grain.png)',
          backgroundSize: '100px 100px',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'overlay',
          backgroundPosition: 'left top',
          mixBlendMode: 'overlay'
        }}
      ></div>
    </>
  )
}