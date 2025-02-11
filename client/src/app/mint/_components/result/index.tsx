"use client";

import Modal from "@/components/ui/modal";
import MintedItem from "./minted-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Result({
  isOpen,
  onClose,
  mintedItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  mintedItems: { tokenId: number; amount: number }[];
}) {
  if (!isOpen) return null;

  return (
    <Modal title="조각을 얻었습니다" onClose={onClose}>
      <div className="relative">
        <Swiper
          className="flex flex-col items-center"
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".minted-swiper-button-next",
            prevEl: ".minted-swiper-button-prev",
          }}
          modules={[Navigation]}
        >
          {mintedItems.map(({ tokenId, amount }) => (
            <SwiperSlide key={tokenId}>
              <MintedItem tokenId={tokenId} amount={amount} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 네비게이션 버튼 */}
        <div
          className="minted-swiper-button-prev absolute bottom-4 left-4 bg-transparent text-black/70 hover:text-black/90 transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-100/50 z-10"
        >
          <FaChevronLeft className="text-2xl" />
        </div>
        <div
          className="minted-swiper-button-next absolute bottom-4 right-4 bg-transparent text-black/70 hover:text-black/90 transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-100/50 z-10"
        >
          <FaChevronRight className="text-2xl" />
        </div>
      </div>
    </Modal>
  );
}