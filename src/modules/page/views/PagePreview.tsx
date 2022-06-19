import { useParams } from 'react-router-dom';
import { usePageDetail } from '../hooks';
import { isMobile } from 'react-device-detect';
import UILoader from '@core/components/ui-loader';
import { Helmet } from 'react-helmet';
import { PAGE_TITLE_MAPPING, PAGE_PREVIEW } from 'router/path';

const PagePreview = () => {
  const { id } = useParams<{ id: string }>();
  const { result: page, loading } = usePageDetail(id, {
    device: isMobile ? 'mobile' : 'desktop',
  });

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE_MAPPING[PAGE_PREVIEW]}</title>
      </Helmet>
      <UILoader blocking={loading}>
        <div
          style={{
            minHeight: '100vh',
            width: '100%',
          }}
        ></div>
      </UILoader>
    </>
  );
};

export default PagePreview;
