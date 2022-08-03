import { yupResolver } from '@hookform/resolvers/yup';
import { SUCCESS_MSG } from 'modules/core';
import { Button } from 'modules/core/components';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import * as yup from 'yup';
import { Permission } from '../types';
import { permissionApi } from '../utils/api';
import Select from 'react-select';
import { ACTION, MAPPING_ACTION, RESOURCES } from 'router/permission';
import classNames from 'classnames';

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Vui lòng nhập tên quyền'),
  resource: yup.object().required('Vui lòng chọn tài nguyên'),
  action: yup.object().required('Vui lòng chọn hành động'),
});

interface PermissionForm {
  name: string;
  code: string;
  resource?: string;
  action?: string;
}

interface PermissionModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  permission?: Permission;
  onAfterClose?: () => void;
}

const DEFAULT_PREFIX = ':';

const PermissionModal: React.FC<PermissionModalProps> = ({
  visible,
  onClose,
  title,
  permission,
  onAfterClose,
}) => {
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PermissionForm>({
    defaultValues: {
      name: '',
      code: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const [prefixPermission, setPrefixPermission] = useState(DEFAULT_PREFIX);

  const updatePrefixPermissionCode = (resource: string, method: string) => {
    setPrefixPermission(`${resource}${DEFAULT_PREFIX}${method}`);
  };

  const onSubmit = async (inputValue: PermissionForm) => {
    const { resource, action, ...restValue } = inputValue;
    if (!loading) {
      try {
        setLoading(true);

        if (permission) {
          await permissionApi.updatePermission(permission.id, restValue);
          toast.success(SUCCESS_MSG.UPDATE_PERMISSION, {
            position: 'top-right',
          });
        } else {
          await permissionApi.createPermission({
            ...restValue,
            code: `${prefixPermission}${restValue.code}`,
          });
          toast.success(SUCCESS_MSG.CREATE_PERMISSION, {
            position: 'top-right',
          });
        }
        onAfterClose?.();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        onClose();
      }
    }
  };

  useEffect(() => {
    if (!visible) {
      reset();
      setPrefixPermission(DEFAULT_PREFIX);
    } else {
      if (permission) {
        setValue('name', permission.name);
        setValue('code', permission.code);
      }

      const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(onSubmit);
        }
      };
      window.addEventListener('keydown', handlePressEnter);

      return () => {
        window.removeEventListener('keydown', handlePressEnter);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal centered isOpen={visible} toggle={onClose}>
      <ModalHeader className="bg-transparent" toggle={onClose}>
        {title}
      </ModalHeader>
      <ModalBody>
        <Form>
          <div className="mb-1">
            <Label for="name">Tên quyền</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input {...field} invalid={!!errors.name} />
              )}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </div>

          {!permission && (
            <div className="mb-1 d-flex justify-content-between">
              <div style={{ flex: 1 }}>
                <Label for="resource">Tài nguyên</Label>
                <Controller
                  control={control}
                  name="resource"
                  render={({ field: { onChange, ...rest } }) => (
                    <Select
                      classNamePrefix="select"
                      className={classNames('react-select', {
                        'is-invalid': !!errors.resource,
                      })}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          marginRight: 8,
                        }),
                      }}
                      isSearchable
                      {...rest}
                      options={
                        Object.values(RESOURCES).map((resource) => ({
                          value: resource,
                          label: resource,
                        })) as any
                      }
                      components={{ IndicatorSeparator: () => null }}
                      placeholder="Chọn tài nguyên"
                      onChange={(newValue) => {
                        updatePrefixPermissionCode(
                          (newValue as any).value as string,
                          prefixPermission.split(DEFAULT_PREFIX)[1],
                        );
                        onChange(newValue);
                      }}
                    />
                  )}
                />
                {errors.resource && (
                  <FormFeedback>{errors.resource.message}</FormFeedback>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <Label for="action">Hành động</Label>
                <Controller
                  control={control}
                  name="action"
                  render={({ field: { onChange, ...rest } }) => (
                    <Select
                      isSearchable
                      {...rest}
                      classNamePrefix="select"
                      className={classNames('react-select', {
                        'is-invalid': !!errors.action,
                      })}
                      options={
                        Object.values(ACTION).map((action) => ({
                          value: action,
                          label: MAPPING_ACTION[action],
                        })) as any
                      }
                      components={{ IndicatorSeparator: () => null }}
                      onChange={(newValue) => {
                        updatePrefixPermissionCode(
                          prefixPermission.split(DEFAULT_PREFIX)[0],
                          (newValue as any).value as string,
                        );
                        onChange(newValue);
                      }}
                    />
                  )}
                />
                {errors.action && (
                  <FormFeedback>{errors.action.message}</FormFeedback>
                )}
              </div>
            </div>
          )}

          <div className="mb-1">
            <Label for="code">Mã quyền</Label>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <InputGroup>
                  {prefixPermission !== DEFAULT_PREFIX && (
                    <InputGroupText>{prefixPermission}</InputGroupText>
                  )}
                  <Input {...field} readOnly={!!permission} />
                </InputGroup>
              )}
            />
          </div>

          <div className="text-end mt-2">
            <Button className="me-1" outline type="reset" onClick={onClose}>
              Hủy
            </Button>
            <Button
              color="primary"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              Lưu
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default PermissionModal;
