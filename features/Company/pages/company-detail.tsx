import React from 'react'
import { Avatar } from '../../../core/components/Avatar'

const AllCompany = () => {
  return (
    <div className="flex w-full h-full max-w-screen-lg mb-16 bg-white pt-6">
      <div className="md:w-1/4">
        <Avatar className="bg-grey-100" />
      </div>
      <div className="md:w-3/4">
        <div className="font-bold text-primary font-prompt text-heading-6 md:w-full mb-4">
          Opsta (Thailand) Co.,Lt.d
        </div>
        <span className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
          Software House
        </span>
        <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
        <div className="mt-3 mb-4 md:w-full">
          <div className="font-semibold font-prompt text-body-1">แนะนำบริษัท</div>
          <p className="mt-2 text-body-1 font-prompt">
            เฟรมการันตี อิกัวนาชัตเตอร์มะกัน นาฏยศาลาอัลบั้มไอติม อัลบั้ม แพนด้าโง่เขลาผู้นำปักขคณนา
            นพมาศ แพนด้า แชมเปญออร์เดอร์คาวบอย คีตกวีวันเวย์ ไบเบิลปูอัดอัลบัม{' '}
          </p>
        </div>
        <div className="mt-3 mb-4 md:w-full">
          <div className="font-semibold font-prompt text-body-1">รายละเอียด</div>
          <p className="mt-2 text-body-1 font-prompt">
            เฟรมการันตี อิกัวนาชัตเตอร์มะกัน นาฏยศาลาอัลบั้มไอติม อัลบั้ม แพนด้าโง่เขลาผู้นำปักขคณนา
            นพมาศ แพนด้า แชมเปญออร์เดอร์คาวบอย คีตกวีวันเวย์ ไบเบิลปูอัดอัลบัม ธรรมาเวเฟอร์เอ๋เซลส์
            เตี๊ยมนู้ด วอฟเฟิลกับดัก โฟล์ค ฮาราคีรีอาร์ติสต์แชมปิยองจ๊อกกี้
            ซาร์ดีนบาร์บีคิวพูลตี๋เตี๊ยมนู้ด วอฟเฟิลกับดัก โฟล์ค ฮาราคีรีอาร์ติสต์แชมปิยองจ๊อกกี้
            ซาร์ดีนบาร์บีคิวพูลตี๋
          </p>
        </div>
        <div className="mt-3 mb-4 md:w-full">
          <div className="font-semibold font-prompt text-body-1">ที่อยู่</div>
          <div className="mt-2 text-body-1 font-prompt">
            คิตส์มอสโกคาบูลปะหัง มะนิลาโกตดิวัวร์โคโลราโดปาเลสไตน์โกลิยะ
            มิชิแกนเดนเวอร์อาหรับแคโรไลนาคูเวต
          </div>
        </div>
        <div className="mt-3 mb-4 md:w-full">
          <div className="font-semibold font-prompt text-body-1">วันที่ทำการ</div>
          <div className="mt-2 text-body-1 font-prompt">จันทร์ - ศุกร์ เวลา 10:00 - 18:00 น.</div>
        </div>
        <div className="mt-3 mb-4 md:w-full">
          <div className="font-semibold font-prompt text-body-1">เว็บไซต์</div>
          <div className="mt-2 text-body-1 font-prompt">https://sit.kmutt.ac.th</div>
        </div>
      </div>
    </div>
  )
}

export default AllCompany
