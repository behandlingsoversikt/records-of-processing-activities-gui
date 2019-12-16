import React, { memo } from 'react';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordForm from '../record-form';

import SC from './styled';

const RecordPage = (): JSX.Element => (
  <SC.RecordPage>
    <BreadcrumbsBar />
    <Headline
      title='Protokoll over behandlingsaktiviteter'
      subTitle='Brønnøysundsregistrene'
    />
    <RecordForm />
  </SC.RecordPage>
);

export default memo(RecordPage);
