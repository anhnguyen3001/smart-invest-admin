import toast from 'react-hot-toast';

export const getPublishUrl = (page) => {
  let publishUrl = '';
  let slug = page?.slug;
  let domain = page?.domain?.domain;
  // Case empty
  if (!slug) return publishUrl;
  if (!domain) {
    // Case preview domain: domain = null
    publishUrl = `${window?.config?.previewDomain}/${
      slug || page?.id?.toString()
    }`;
  } else {
    domain = domain.startsWith('http') ? domain : `https://${domain}`;
    slug = slug === '/' ? '' : slug;
    publishUrl = `${domain}/${slug}`;
  }
  return publishUrl;
};

export const onCopyText = (text) => {
  navigator.clipboard.writeText(text);
  toast.success('Sao chép thành công');
};
