import styled from '@emotion/styled';
import UILoader from '@core/components/ui-loader';
import themeConfig from 'configs/themeConfig';
import { acceptTypes, useUploadImage } from 'utility/hooks';
import React, { useRef } from 'react';
import { Button, Col, Row } from 'reactstrap';

interface ImageUploadProps {
  value: string;
  onFinishChange: any;
  maxSize?: number;
  allows?: Array<string>;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onFinishChange,
  maxSize,
  allows,
}) => {
  const fileInputRef = useRef<HTMLInputElement>();

  const {
    loading,
    handleUploadImage,
    validateImgContent,
    maxSize: maxFileSize,
    allows: allowTypes,
  } = useUploadImage(maxSize, allows);

  const onChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // remove cache file (upload twice)

    const valid = validateImgContent(file);
    if (valid) {
      const url = await handleUploadImage(file);
      onFinishChange(url);
    }
  };

  return (
    <Row className="gx-1 gy-1 align-items-center" xs={1} md={2}>
      <Col className="col-md-auto">
        <StyledUILoader className="border rounded" blocking={loading}>
          <StyledImage
            className="w-100 h-100"
            src={value || themeConfig.app.placeholderImage}
            alt="uploaded image"
          />
        </StyledUILoader>
      </Col>
      <Col className="flex-1" xs={12}>
        <Button
          className="me-75"
          size="sm"
          color="primary"
          type="button"
          onClick={() => fileInputRef?.current?.click()}
        >
          Tải ảnh lên
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={onChange}
          hidden
          accept={acceptTypes(allowTypes).join(', ')}
        />
        <Button
          color="secondary"
          size="sm"
          outline
          onClick={() => onFinishChange(null)}
        >
          Reset
        </Button>
        <p className="mb-0 mt-25">
          {`Cho phép định dạng: ${allowTypes.join(
            ', ',
          )}. Kích thước tối đa: ${maxFileSize}
          MB.`}
        </p>
      </Col>
    </Row>
  );
};

const StyledImage = styled.img`
  object-fit: contain;
  padding: 8px;
`;

const StyledUILoader = styled(UILoader)`
  width: 100px;
  height: 100px;
`;
