import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Input,
  Label,
  InputGroup,
  InputGroupText,
  Form,
  FormFeedback,
} from 'reactstrap';
import { Plus, RefreshCw } from 'react-feather';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import Select, { components } from 'react-select';
import classNames from 'classnames';
import { DOMAIN_LIST } from 'router/path';
import useSWR from 'swr';
import { domainApi } from 'modules/domain/utils/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UILoader from '@core/components/ui-loader';
import { useAppSelector } from 'redux/store';

const validationSchema = yup.object().shape({
  isDefault: yup.boolean(),

  domain: yup.object().when('isDefault', {
    is: false,
    then: yup.object().required('Vui lòng chọn tên miền').nullable(),
    otherwise: yup.object().nullable(),
  }),

  slug: yup.string().when('isDefault', {
    is: false,
    then: yup
      .string()
      .trim()
      .max(255, 'Liên kết không được vượt quá 255 ký tự')
      .matches(/^[a-z0-9-]*$/i, "Liên kết chỉ chứa chữ, số và '-'")
      .nullable(),
    otherwise: yup.string().nullable(),
  }),

  slugDefault: yup.string().when('isDefault', {
    is: true,
    then: yup
      .string()
      .trim()
      .required('Vui lòng nhập liên kết')
      .max(255, 'Liên kết không được vượt quá 255 ký tự')
      .matches(/^[a-z0-9-]*$/i, "Liên kết chỉ chứa chữ, số và '-'")
      .nullable(),
    otherwise: yup.string().nullable(),
  }),
});

const TAB_KEY = {
  defaultDomain: 'defaultDomain',
  customDomain: 'customDomain',
};

export const PublishModal = ({
  isOpen,
  setIsOpen,
  page,
  loading,
  setLoading,
  publishPage,
}) => {
  const [activeTab, setActiveTab] = useState(TAB_KEY.defaultDomain);

  const currentMerchantId = useAppSelector(
    (state) => state.auth.currentMerchantId,
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const resetFormState = (rest = {}) => {
    reset({
      slug: page.domain ? (page.slug === '/' ? '' : page.slug) : '',
      domain: page.domain
        ? {
            value: page.domain.id,
            label: page.domain.domain,
          }
        : null,
      slugDefault: page.domain ? '' : page.slug,
      ...rest,
    });
  };

  const { data, mutate: mutateDomains } = useSWR(
    activeTab === TAB_KEY.customDomain && currentMerchantId
      ? ['/domains/get-all', currentMerchantId]
      : null,
    async () => {
      return domainApi.getAllDomains();
    },
    {
      revalidateOnFocus: false,
    },
  );

  const onRefresh = async () => {
    try {
      setLoading(true);
      await mutateDomains();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onAddDomain = () => {
    window.open(DOMAIN_LIST);
  };

  const MenuList = ({ children, ...rest }) => {
    const Comp = components.MenuList as any;
    return (
      <Comp {...rest}>
        {children}
        <Nav vertical className="border-top p-50">
          <NavItem>
            <NavLink onClick={onRefresh}>
              <RefreshCw size={16} />
              <span className="ms-1">Làm mới danh sách</span>
            </NavLink>
          </NavItem>
          <NavItem className="mb-0">
            <NavLink onClick={onAddDomain}>
              <Plus size={16} />
              <span className="ms-1">Thêm tên miền mới</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Comp>
    );
  };

  const handlePublish = async (formData) => {
    let body = {};
    if (activeTab === TAB_KEY.defaultDomain) {
      body = {
        domainId: null,
        slug: formData.slugDefault,
      };
    }
    if (activeTab === TAB_KEY.customDomain) {
      body = {
        domainId: formData.domain?.value,
        slug: formData.slug ? formData.slug : '/',
      };
    }
    await publishPage(body);
  };

  useEffect(() => {
    if (page.domain) {
      setActiveTab(TAB_KEY.customDomain);
    } else {
      setActiveTab(TAB_KEY.defaultDomain);
    }

    resetFormState({
      isDefault: !page.domain,
    });
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (activeTab === TAB_KEY.defaultDomain) {
      resetFormState({ isDefault: true });
    }
    if (activeTab === TAB_KEY.customDomain) {
      resetFormState({ isDefault: false });
    }
    // eslint-disable-next-line
  }, [activeTab]);

  return (
    <Modal
      zIndex={2001}
      unmountOnClose
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
      centered
    >
      <UILoader blocking={loading}>
        <ModalHeader className="bg-transparent" />
        <ModalBody className="pt-1 pb-3 px-3">
          <Form onSubmit={handleSubmit(handlePublish)}>
            <h3 className="fw-bold text-center mb-2">
              Chọn tên miền để xuất bản trang
            </h3>
            <div className="">
              <div className="form-check me-1 mb-2">
                <Input
                  type="radio"
                  id={TAB_KEY.defaultDomain}
                  name="designMode"
                  checked={activeTab === TAB_KEY.defaultDomain}
                  onChange={() => setActiveTab(TAB_KEY.defaultDomain)}
                  style={{ cursor: 'pointer' }}
                />
                <Label
                  for={TAB_KEY.defaultDomain}
                  className="fw-bolder"
                  style={{ fontSize: 14, cursor: 'pointer' }}
                >
                  Sử dụng tên miền miễn phí từ Tempi
                </Label>
                {activeTab === TAB_KEY.defaultDomain && (
                  <>
                    <InputGroup className="mt-50">
                      <InputGroupText
                        className={classNames({
                          'border-danger': !!errors.slugDefault,
                        })}
                      >
                        {window?.config?.previewDomain}/
                      </InputGroupText>
                      <Controller
                        name="slugDefault"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Input
                              {...field}
                              placeholder="trang-cua-toi"
                              invalid={!!errors.slugDefault}
                            />
                          );
                        }}
                      />
                    </InputGroup>
                    {!!errors.slugDefault && (
                      <FormFeedback className="d-block">
                        {errors.slugDefault?.message}
                      </FormFeedback>
                    )}
                  </>
                )}
              </div>
              <div className="form-check me-1">
                <Input
                  type="radio"
                  name="designMode"
                  id={TAB_KEY.customDomain}
                  checked={activeTab === TAB_KEY.customDomain}
                  onChange={() => setActiveTab(TAB_KEY.customDomain)}
                  style={{ cursor: 'pointer' }}
                />
                <Label
                  for={TAB_KEY.customDomain}
                  className="fw-bolder"
                  style={{ fontSize: 14, cursor: 'pointer' }}
                >
                  Kết nối tên miền riêng của bạn
                </Label>
                {activeTab === TAB_KEY.customDomain && (
                  <>
                    <div className="d-flex mt-50">
                      <Controller
                        name="domain"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            styles={{
                              control: (styles) => {
                                return {
                                  ...styles,
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                };
                              },
                            }}
                            classNamePrefix="select"
                            className={classNames('flex-1', 'react-select', {
                              'is-invalid': !!errors.domain,
                            })}
                            placeholder="Chọn tên miền"
                            noOptionsMessage={() => 'Chưa có tên miền riêng'}
                            options={data?.data?.domains?.map(
                              ({ id, domain }) => ({
                                value: id,
                                label: domain,
                              }),
                            )}
                            components={{
                              MenuList,
                              IndicatorSeparator: () => null,
                            }}
                          />
                        )}
                      />
                      <InputGroup className="flex-1">
                        <InputGroupText
                          className={classNames({
                            'border-danger': !!errors.slug,
                          })}
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          /
                        </InputGroupText>
                        <Controller
                          name="slug"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="trang-cua-toi"
                              invalid={!!errors.slug}
                            />
                          )}
                        />
                      </InputGroup>
                    </div>
                    {(!!errors.slug || !!errors.domain) && (
                      <FormFeedback className="d-block">
                        {errors.slug?.message || errors.domain?.message}
                      </FormFeedback>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-center mt-2">
              <Button type="submit" color="primary">
                Xuất bản
              </Button>
            </div>
          </Form>
        </ModalBody>
      </UILoader>
    </Modal>
  );
};

PublishModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  page: PropTypes.object,
};
