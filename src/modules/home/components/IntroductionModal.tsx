// import { Modal, ModalBody, ModalHeader } from 'reactstrap';
// import introductionImg from 'assets/images/introduction_image.jpg';
import { Button, Row, Col, Modal } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { useRef, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import step_1 from 'assets/images/introduction/step1.png';
import step_2 from 'assets/images/introduction/step2.png';
import step_3 from 'assets/images/introduction/step3.png';
import step_4 from 'assets/images/introduction/step4.png';
import { useTracking } from 'utility/hooks/useTracking';

const onBoardingSlides = [
  {
    img: step_1,
    header: 'Chỉ 5 phút có ngay trang | bán hàng online',
    title: 'Thao tác kéo thả đơn giản dễ chỉnh sửa',
  },
  {
    img: step_2,
    header: 'Tempi cung cấp hàng trăm | trang mẫu miễn phí',
    title: 'Thoải mái lựa chọn và sáng tạo không giới hạn',
  },
  {
    img: step_3,
    header: 'Giúp khách hàng tăng nhanh | doanh số bán hàng',
    title:
      'Không giới hạn số lượng tên miền (domain) và số trang bán hàng sử dụng',
  },
  {
    img: step_4,
    header: 'Dễ dàng thu thập và quản lý | thông tin khách hàng',
    title: 'Kết nối form thu thập dữ liệu linh hoạt với Google, API',
  },
];

interface IntroductionModalProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({
  visible,
  setVisible,
}) => {
  const { trackingScreenName, getAttrTracking } = useTracking();
  const sliderRef = useRef(null);
  const [step, setStep] = useState(0);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
    setStep(sliderRef.current.swiper.activeIndex);
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    if (sliderRef.current.swiper.isEnd) setVisible(false);
    else {
      sliderRef.current.swiper.slideNext();
      setStep(sliderRef.current.swiper.activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      centered
      className="text-center introduction-modal-wrapper"
      isOpen={visible}
      toggle={() => setVisible(!visible)}
    >
      <ModalBodyWrapper>
        <Swiper
          modules={[Pagination]}
          centeredSlides
          pagination={{
            clickable: true,
          }}
          {...{ ref: sliderRef }}
        >
          {onBoardingSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideCard slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Row>
          <Col className="d-flex justify-content-start">
            {step > 0 && (
              <Button
                onClick={handlePrev}
                color="primary"
                outline
                style={{ width: '120px' }}
              >
                Quay lại
              </Button>
            )}
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              onClick={handleNext}
              color="primary"
              style={{ width: '120px' }}
              {...getAttrTracking({
                contentName: 'nextslideBtn',
                regionName: 'onboardingModal',
                target: trackingScreenName,
              })}
            >
              {step === onBoardingSlides.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
            </Button>
          </Col>
        </Row>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default IntroductionModal;

const SlideCard = ({ slide }) => {
  const renderMultiLineText = (title) => {
    const subTitles = title.split('|');
    return (
      <>
        {subTitles.map((subTitle, index) => (
          <SlideHeader key={index}>{subTitle}</SlideHeader>
        ))}
      </>
    );
  };
  return (
    <CardWrapper>
      <ImageWrapper src={slide.img} />
      <Row>
        {renderMultiLineText(slide.header)}
        <SlideTitle>{slide.title}</SlideTitle>
      </Row>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  height: 408px;
`;

const SlideHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: #434657;
`;
const SlideTitle = styled.div`
  font-size: 13px;
  color: #434657;
  margin-top: 16px;
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: 228px;
  object-fit: cover;
  border-radius: 8px;
`;

const ModalBodyWrapper = styled.div`
  padding: 24px;
`;
