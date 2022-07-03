import { yupResolver } from '@hookform/resolvers/yup';
import { PermissionSelect } from 'modules/permission/components/PermissionSelect';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import * as yup from 'yup';
import { Role } from '../types';

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Vui lòng nhập tên role'),
  code: yup.string().trim().required('Vui lòng nhập mã role'),
});

interface RoleForm {
  name: string;
  code: string;
  permissionsIds: { label: string; value: number }[] | null;
}

interface RoleModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  role?: Role;
}

const RoleModal: React.FC<RoleModalProps> = ({
  visible,
  onClose,
  title,
  role,
}) => {
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      code: '',
      permissionIds: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (_: RoleForm) => {
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

  useEffect(() => {
    if (!visible) {
      reset();
    } else {
      if (role) {
        setValue('name', role.name);
        setValue('code', role.code);
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
            <Label for="name">Tên role</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input invalid={!!errors.name} {...field} />
              )}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </div>

          <div className="mb-1">
            <Label for="code">Mã role</Label>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Input invalid={!!errors.code} {...field} readOnly={!!role} />
              )}
            />
            {errors.code && <FormFeedback>{errors.code.message}</FormFeedback>}
          </div>

          {!!role && (
            <div className="mb-1">
              <Label for="permissionIds">Quyền</Label>
              <Controller
                name="permissionIds"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <PermissionSelect
                    isMulti
                    isClearable
                    placeholder="Chọn quyền"
                    {...rest}
                  />
                )}
              />
            </div>
          )}

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

export default RoleModal;
