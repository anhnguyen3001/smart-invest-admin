// ** React Imports
import { Fragment, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from 'reactstrap';
import { useInitMerchant } from 'modules/merchant/hooks/useInitMerchant';
import merchantApi from 'modules/merchant/utils/api';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ImageUpload } from 'modules/core/components';

const UpdateMerchantSchema = yup.object().shape({
  name: yup.string().trim().required(),
});

const AccountTabs = () => {
  // ** Hooks
  const { currentMerchant, initOwnerMerchants } = useInitMerchant();
  const defaultValues = {
    name: '',
    logo: '',
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(UpdateMerchantSchema),
  });

  const onSubmit = async (data) => {
    await merchantApi.updateMerchant(data);
    toast.success('Cập nhật thành công');
    await initOwnerMerchants(true);
  };

  useEffect(() => {
    if (currentMerchant) {
      setValue('name', currentMerchant?.label);
      setValue('logo', currentMerchant?.logo);
    }
    // eslint-disable-next-line
  }, [currentMerchant]);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Thông tin cửa hàng</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="flex-column">
              <Col lg="6" sm="8" xs="12">
                <Controller
                  name="logo"
                  control={control}
                  render={({ field: { value, onChange: onFinishChange } }) => (
                    <ImageUpload
                      value={value}
                      onFinishChange={onFinishChange}
                    />
                  )}
                />
              </Col>
              <Col lg="6" sm="8" xs="12" className="mt-1">
                <Label className="form-label" for="firstName">
                  Tên cửa hàng
                </Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Nhập tên cửa hàng"
                      invalid={!!errors.name}
                      {...field}
                    />
                  )}
                />
                {errors?.name && (
                  <FormFeedback>Vui lòng nhập tên cửa hàng</FormFeedback>
                )}
              </Col>
              <Col className="mt-2" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  Lưu
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AccountTabs;
