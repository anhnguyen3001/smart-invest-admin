interface RepeaterProps {
  count: number;
  tag?: string;
  children?: any;
}

const Repeater: React.FC<RepeaterProps> = (props) => {
  // ** Props
  const { count, tag = 'div', children, ...rest } = props;

  // ** Custom Tag
  const Tag: any = tag;

  // ** Default Items
  const items = [];

  // ** Loop passed count times and push it in items Array
  for (let i = 0; i < count; i++) {
    items.push(children(i));
  }

  return <Tag {...rest}>{items}</Tag>;
};

export default Repeater;
