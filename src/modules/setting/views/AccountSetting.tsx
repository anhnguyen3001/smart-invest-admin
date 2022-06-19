import Lazy from '@core/components/lazy';
import '@core/scss/react/libs/tables/react-dataTable-component.scss';
import { useState } from 'react';
import { Col, Row, TabContent, TabPane } from 'reactstrap';
import AccountTabContent from '../components/AccountTabContent';
import MembersTabContent from '../components/MembersTabContent';
import Tabs from '../components/Tabs';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  return <Row>abc</Row>;
  return (
    <Row>
      <Col xs={12}>
        <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Lazy visible={activeTab === '1'}>
              <AccountTabContent />
            </Lazy>
          </TabPane>
          <TabPane tabId="2">
            <Lazy visible={activeTab === '2'}>
              <MembersTabContent />
            </Lazy>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  );
};

export default Setting;
