import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import merchantApi from 'modules/merchant/utils/api';

const AddMemberSchema = yup.object().shape({
  // phoneNumber: yup.string().matches(PATTERN_VALIDATION.phone),
});

const AddMemberPopup = ({ visible, setVisible, onSuccess }) => {
  const refSubmitButton = useRef<Button>();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { phoneNumber: '' },
    mode: 'onChange',
    resolver: yupResolver(AddMemberSchema),
  });
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const onAddMember = async (data) => {
    if (!loading) {
      try {
        setLoading(true);
        await merchantApi.addUser(data);
        onSuccess?.();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!visible) {
      reset();
    }
    if (visible) {
      const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          (refSubmitButton?.current as any)?.onClick();
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
    <Modal style={{ top: 200 }} isOpen={visible} toggle={handleCancel}>
      <ModalHeader
        className="bg-transparent"
        toggle={() => setVisible(!visible)}
      ></ModalHeader>
      <ModalBody className="px-5 pb-5">
        <div className="text-center">
          <h3 className="fw-bold">Thêm quản trị viên</h3>
        </div>
        <Form>
          <div className="mb-1">
            <Label className="form-label" for="name">
              Số điện thoại
            </Label>
            <Controller
              defaultValue=""
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <Input
                  placeholder="Nhập số điện thoại"
                  invalid={!!errors.phoneNumber}
                  {...field}
                />
              )}
            />
            {errors.phoneNumber && (
              <FormFeedback>
                Vui lòng nhập đúng định dạng số điện thoại
              </FormFeedback>
            )}
          </div>
          <div className="text-center mt-2">
            <Button
              className="me-1"
              outline
              type="reset"
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button
              ref={refSubmitButton}
              color="primary"
              onClick={handleSubmit(onAddMember)}
              disabled={loading}
            >
              OK
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddMemberPopup;
