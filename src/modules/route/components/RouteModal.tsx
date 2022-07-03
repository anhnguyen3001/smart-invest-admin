import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { PATTERN_VALIDATION } from 'modules/core';
import { PermissionSelect } from 'modules/permission/components/PermissionSelect';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import {
  Button,
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
import { MethodEnum, Route } from '../types';

const routePrefix = '/';
const dynamicRegPlaceholder = '{}';
const wrapperDynamicReg = '[]+';

interface RegexOption {
  label: string;
  value: string;
}

const dynamicRegexOptions: RegexOption[] = [
  { label: 'Số', value: '0-9' },
  { label: 'Chữ', value: 'a-zA-Z' },
];

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Vui lòng nhập đường dẫn')
    .max(255, 'Đường dẫn không được vượt quá 255 ký tự')
    .matches(PATTERN_VALIDATION.route, 'Đường dẫn không hợp lệ'),
  method: yup.object().nullable().required('Vui lòng chọn phương thức'),
});

interface RouteForm {
  name: string;
  regUri: string;
  permissionId: { label: string; value: number };
  method: { label: string; value: MethodEnum };
  regex: RegexOption;
}

interface RouteModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  route?: Route;
}

const RouteModal: React.FC<RouteModalProps> = ({
  visible,
  onClose,
  title,
  route,
}) => {
  const [selectDynamicRegex, setSelectDynamicRegex] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      regUri: routePrefix,
      permissionId: null,
      method: null,
      regex: null,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) {
      reset();
      setSelectDynamicRegex(false);
    } else {
      if (route) {
        setValue('name', route.name.replace(routePrefix, ''));
        setValue('regUri', route.regUri.replace(routePrefix, ''));
        setValue('method', route.method);
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

  const generateAndUpdateRegUri = (name: string) => {
    const newRegUri = name?.replace(
      new RegExp(dynamicRegPlaceholder, 'g'),
      wrapperDynamicReg,
    );
    setValue('regUri', `${routePrefix}${newRegUri}`);

    setSelectDynamicRegex(name?.includes(dynamicRegPlaceholder));
  };

  const onChangeRegex = (newValues: MultiValue<RegexOption>) => {
    setValue(
      'regUri',
      getValues('regUri')?.replace(
        /\[((0-9)|(a-zA-Z))*\]\+/g,
        `[${newValues.map(({ value }) => value).join('')}]+`,
      ),
    );
  };

  const onSubmit = async (inputValue: RouteForm) => {
    const { regex, permissionId, method, name, ...rest } = inputValue;

    const _ = {
      name: `${routePrefix}${name}`,
      method: method.value,
      permissionId: permissionId?.value,
      ...rest,
    };

    if (!loading) {
      try {
        setLoading(true);
      } catch (e) {
        console.error(e);
      } finally {
        onClose();
      }
    }
  };

  return (
    <Modal centered isOpen={visible} toggle={onClose}>
      <ModalHeader className="bg-transparent" toggle={onClose}>
        {title}
      </ModalHeader>
      <ModalBody>
        <Form>
          <div className="mb-1">
            <Label for="method">Phương thức</Label>
            <Controller
              control={control}
              name="method"
              render={({ field }) => (
                <Select
                  isSearchable
                  className={classNames({ 'is-invalid': !!errors.method })}
                  name="method"
                  placeholder="Chọn phương thức"
                  options={Object.values(MethodEnum).map((method) => ({
                    value: method,
                    label: method,
                  }))}
                  components={{ IndicatorSeparator: () => null }}
                  classNamePrefix="react-select"
                  {...(!!errors.method && {
                    styles: {
                      control: (base) => ({
                        ...base,
                        borderColor: '#ea5455 !important',
                      }),
                    },
                  })}
                  {...field}
                />
              )}
            />
            {errors.method && (
              <FormFeedback>{errors.method.message}</FormFeedback>
            )}
          </div>

          <div className="mb-1">
            <Label for="name">Đường dẫn</Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, ...rest } }) => (
                <InputGroup>
                  <InputGroupText>{routePrefix}</InputGroupText>
                  <Input
                    {...rest}
                    invalid={!!errors.name}
                    placeholder="Nhập đường dẫn"
                    onChange={(e) => {
                      generateAndUpdateRegUri(e.target.value);
                      onChange(e);
                    }}
                  />
                </InputGroup>
              )}
            />
            {errors.name && (
              <div className="invalid-feedback d-block">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="mb-1">
            <Label for="regUri">Expression</Label>
            <Controller
              control={control}
              name="regUri"
              render={({ field }) => <Input {...field} readOnly />}
            />
          </div>
          {selectDynamicRegex && (
            <div className="mb-1 d-flex">
              <Input className="w-25" value={dynamicRegPlaceholder} readOnly />
              <Controller
                control={control}
                name="regex"
                rules={{ required: true }}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup className="w-75 ms-1">
                    <InputGroupText>Bao gồm</InputGroupText>
                    <Select
                      isMulti
                      classNamePrefix="react-select"
                      styles={{
                        container: (base) => ({ ...base, flex: 1 }),
                        ...(!!errors.regex && {
                          control: (base) => ({
                            ...base,
                            borderColor: '#ea5455 !important',
                          }),
                        }),
                      }}
                      placeholder=""
                      components={{ IndicatorSeparator: () => null }}
                      options={dynamicRegexOptions}
                      onChange={(value) => {
                        onChange(value);
                        onChangeRegex(value);
                      }}
                      {...rest}
                    />
                  </InputGroup>
                )}
              />
            </div>
          )}

          <div className="mb-1">
            <Label for="permissionId">Quyền</Label>
            <Controller
              name="permissionId"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <PermissionSelect
                  isClearable
                  placeholder="Chọn quyền"
                  {...rest}
                />
              )}
            />
          </div>

          <div className="text-end mt-2">
            <Button className="me-1" outline type="reset" onClick={onClose}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              Lưu
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default RouteModal;
