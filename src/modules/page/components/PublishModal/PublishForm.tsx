import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { Plus, RefreshCw } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import Select, { components } from 'react-select';
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import * as yup from 'yup';
import useSWR from 'swr';
import { domainApi } from 'modules/domain/utils/api';
import { DOMAIN_LIST } from 'router/path';
import classNames from 'classnames';
import { useAppSelector } from 'redux/store';

const validationSchema = yup.object().shape({
  domainId: yup.object().required('Vui lòng chọn domain').nullable(true),
  slug: yup
    .string()
    .trim()
    .max(255, 'Liên kết không được vượt quá 255 ký tự')
    .matches(/^[a-z0-9-]*$/i, "Liên kết chỉ chứa chữ, số và '-'"),
});

export const PublishForm = ({ publishPage, afterPublish, setLoading }) => {
  const currentMerchantId = useAppSelector(
    (state) => state.auth.currentMerchantId,
  );
  const { data, mutate: mutateDomains } = useSWR(
    currentMerchantId ? ['/domains/get-all', currentMerchantId] : null,
    async () => {
      return domainApi.getAllDomains();
    },
    {
      revalidateOnFocus: false,
    },
  );

  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      slug: '',
      domainId: null,
    },
    resolver: yupResolver(validationSchema),
  });
  const errorMessage = errors.domainId?.message || errors.slug?.message;

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

  const onFinish = async (data) => {
    const error = await publishPage({
      domainId: data.domainId.value,
      slug: data.slug || '/',
    });
    if (!error) {
      reset();
      afterPublish();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onFinish)}>
      <h4 className="mb-2">Xuất bản lên tên miền riêng</h4>
      <div className="d-flex">
        <Controller
          name="domainId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              classNamePrefix="select"
              className={classNames('flex-1', 'react-select', {
                'is-invalid': !!errors.domainId,
              })}
              placeholder="Chọn tên miền"
              noOptionsMessage={() => 'Chưa có tên miền riêng'}
              options={data?.data?.domains?.map(({ id, domain }) => ({
                value: id,
                label: domain,
              }))}
              components={{ MenuList, IndicatorSeparator: () => null }}
            />
          )}
        />
        <InputGroup className="flex-1">
          <InputGroupText
            className={classNames({ 'border-danger': !!errors.slug })}
          >
            /
          </InputGroupText>
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập liên kết"
                invalid={!!errors.slug}
              />
            )}
          />
        </InputGroup>
      </div>
      {errorMessage && <p className="text-danger mt-50">{errorMessage}</p>}

      <div className="text-center mt-1">
        <Button className="rounded" color="primary" type="submit">
          Xuất bản
        </Button>
      </div>
    </Form>
  );
};

PublishForm.propTypes = {
  publishPage: PropTypes.func,
  afterPublish: PropTypes.func,
  setLoading: PropTypes.func,
};
