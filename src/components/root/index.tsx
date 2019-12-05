import React, { memo } from 'react';

import SC from './styled';

const Root = (props: any): JSX.Element => <SC.Root {...props} />;

export default memo(Root);
