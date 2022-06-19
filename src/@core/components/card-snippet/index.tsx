// ** React Imports
import { Fragment, useState } from 'react';

import { Code } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Collapse } from 'reactstrap';

interface CardSnippetProps {
  code?: React.ReactNode;
  noBody?: boolean;
  children: React.ReactNode;
  iconCode?: React.ReactNode;
  className?: string;
  title: string;
}

const CardSnippet: React.FC<CardSnippetProps> = (props) => {
  // ** Props
  const { title, children, noBody, code, iconCode } = props;

  // ** State
  const [isOpen, setIsOpen] = useState(false);

  // ** If user passes custom icon then render that else render default icon
  const IconCode = iconCode ? iconCode : <Code size={15} />;

  // ** To toggle collapse
  const toggle = () => setIsOpen(!isOpen);

  // ** If user passes noBody then return <Fragment> else return <CardBody>
  const Wrapper = noBody ? Fragment : CardBody;

  return (
    <Card className="card-snippet">
      <CardHeader>
        <CardTitle tag="h4">{title}</CardTitle>
        <div className="views cursor-pointer" onClick={toggle}>
          {IconCode}
        </div>
      </CardHeader>
      <Wrapper>{children}</Wrapper>
      <Collapse isOpen={isOpen}>
        <CardBody>{code}</CardBody>
      </Collapse>
    </Card>
  );
};

export default CardSnippet;
