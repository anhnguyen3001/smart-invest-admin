import React from 'react';
import { Copy, Info } from 'react-feather';
import toast from 'react-hot-toast';
import { Alert, ListGroupItem } from 'reactstrap';

interface DnsRecordProps {
  title?: string;
  host?: string;
  type?: string;
  pointTo?: string;
  note?: string;
}

const DnsRecord: React.FC<DnsRecordProps> = ({
  title,
  host,
  type,
  pointTo,
  note,
}) => {
  const onCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Sao chép thành công', { position: 'top-right' });
  };

  return (
    <>
      <ListGroupItem>
        {title && <h6 className="text-dark">{title}</h6>}
        <div className="fw-bolder text-dark">
          <span className="text-muted">Tên (Host): </span>
          {host}
        </div>
        <div className="fw-bolder text-dark">
          <span className="text-muted">Loại: </span>
          {type}
        </div>
        <div className="fw-bolder text-dark">
          <span className="text-muted">Giá trị: </span>
          {pointTo}
          <Copy
            size={15}
            style={{ marginLeft: 5, cursor: 'pointer' }}
            onClick={() => onCopyText(pointTo)}
          />
        </div>
        {note && (
          <Alert color="primary" className="mt-1">
            <div className="alert-body">
              <Info size={15} />
              <span className="ms-1">{note}</span>
            </div>
          </Alert>
        )}
      </ListGroupItem>
    </>
  );
};

export default DnsRecord;
