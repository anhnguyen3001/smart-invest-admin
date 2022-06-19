import styled from '@emotion/styled';
// import { CautionOutlined } from '@teko-builder/icons';

export const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <Content className="rounded p-1 d-flex align-items-center">
      {/* <CautionOutlined className="text-danger me-50" style={{ fontSize: 28 }} /> */}
      {message}
    </Content>
  );
};

const Content = styled.div`
  background-color: #fbecec;
`;
