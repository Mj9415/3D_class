import { Html, useProgress } from "@react-three/drei";
import { Loader } from "lucide-react";

interface AdvancedLoadingSpinnerProps {
  message?: string;
}

export default function AdvancedLoadingSpinner({
  message = "로딩 중입니다…",
}: AdvancedLoadingSpinnerProps) {
  const { progress, loaded, total } = useProgress();
  const pct = Math.round(progress);

  return (
    <Html center>
      <div
        className="
          pointer-events-none      /* 로딩 중에는 클릭 막기 */
          w-[min(95vw,560px)]
          max-w-sm sm:max-w-lg md:max-w-xl
          rounded-2xl sm:rounded-3xl 
          backdrop-blur-xl bg-white/85 shadow-2xl
          p-4 sm:p-6 md:p-8 lg:p-10
          animate-[fadeIn_.4s_ease]
          fixed -top-[20vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]
        "
        role="status"
        aria-live="polite"
      >
        {/* 헤더 메시지 - 반응형 */}
        <h2 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 tracking-tight px-2">
          <span className="block sm:hidden">
            3D 모델링 로딩 중...
            <Loader />
          </span>
          <span className="hidden sm:block md:hidden">모델 로딩 중...</span>
          <span className="hidden md:block">{message}</span>
        </h2>

        {/* 스피너 + 퍼센트 - 반응형 */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3 sm:gap-4">
          <div className="relative">
            {/* 바깥 링 - 반응형 크기 */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-2 sm:border-[3px] border-gray-200 animate-spin
                            border-t-blue-500/90 border-r-purple-500/90"
            />
            {/* 안쪽 링(역회전) - 반응형 */}
            <div
              className="absolute inset-1 sm:inset-2 rounded-full border-2 sm:border-[3px] border-transparent
                         border-t-pink-400/80"
              style={{ animation: "spin 2.2s linear infinite reverse" }}
            />
            {/* 중앙 아이콘 - 반응형 */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-md grid place-items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 퍼센트 뱃지 - 반응형 */}
          <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/90 shadow text-gray-800 text-xs sm:text-sm md:text-base font-semibold">
            {pct}%
          </div>
        </div>

        {/* 진행 바 - 반응형 */}
        <div className="mt-4 sm:mt-6">
          <div
            className="w-full h-2 sm:h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out
                         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
              style={{ width: `${pct}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
              <div
                className="absolute -inset-y-2 sm:-inset-y-4 -left-8 sm:-left-10 w-16 sm:w-20 rotate-12 bg-white/40 blur-md opacity-60
                              animate-[shimmer_1.6s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>

        {/* 상세 정보 - 반응형 그리드 */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm md:text-base">
          <div className="rounded-xl sm:rounded-2xl bg-gray-50/80 px-3 py-2 sm:px-4 sm:py-3 text-gray-700">
            <span className="mr-1">📁</span>
            <span className="hidden sm:inline">파일 </span>
            <strong>{loaded}</strong> / <strong>{total}</strong>
            <span className="hidden sm:inline"> 완료</span>
          </div>
          <div className="rounded-xl sm:rounded-2xl bg-blue-50/80 px-3 py-2 sm:px-4 sm:py-3 text-blue-700 font-medium">
            ⚡ <span className="hidden sm:inline">진행률: </span>
            <strong>{pct}%</strong>
          </div>
        </div>

        {/* 상태 메시지 - 반응형 텍스트 */}
        <p className="mt-3 sm:mt-4 text-center text-gray-600 text-xs sm:text-sm md:text-base px-2">
          {pct < 30 && (
            <>
              <span className="sm:hidden">🚀 시작중</span>
              <span className="hidden sm:inline">🚀 시작 중…</span>
            </>
          )}
          {pct >= 30 && pct < 70 && (
            <>
              <span className="sm:hidden">📦 로딩중</span>
              <span className="hidden sm:inline">📦 3D 모델 로딩 중…</span>
            </>
          )}
          {pct >= 70 && pct < 95 && (
            <>
              <span className="sm:hidden">🎨 처리중</span>
              <span className="hidden sm:inline">🎨 텍스처 로딩 중…</span>
            </>
          )}
          {pct >= 95 && (
            <>
              <span className="sm:hidden">✨ 완료중</span>
              <span className="hidden sm:inline">✨ 마무리 중…</span>
            </>
          )}
        </p>

        {/* 도트 애니메이션(산뜻하게, 간격 넉넉히) */}
        <div className="mt-5 flex justify-center gap-3">
          <span
            className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-3.5 h-3.5 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-3.5 h-3.5 rounded-full bg-pink-500 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer {
          0% { transform: translateX(-30%); opacity: .0; }
          40% { opacity: .9; }
          100% { transform: translateX(130%); opacity: 0; }
        }
      `}</style>
    </Html>
  );
}
