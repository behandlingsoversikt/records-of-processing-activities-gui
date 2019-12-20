import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fetchAllRecordsRequested } from '../record-list-page/redux/actions';
import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';
import { fetchOrganizationRequested } from './redux/actions';
import { RecordReportPagePure } from './record-report-page-pure';

const mapStateToProps = (state: any) => ({
  records: state.RecordsPageReducer.get('records').toJS(),
  representatives: state.RepresentativesReducer.get('representatives').toJS(),
  organization: state.OrganizationReducer.get('organization').toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllRecords: bindActionCreators(fetchAllRecordsRequested, dispatch),
  fetchAllRepresentatives: bindActionCreators(
    fetchAllRepresentativesRequested,
    dispatch
  ),
  fetchOrganization: bindActionCreators(fetchOrganizationRequested, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordReportPagePure);
