import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fetchAllRecordsRequested } from '../record-list-page/redux/actions';
import { RecordReportPagePure } from './record-report-page-pure';

const mapStateToProps = (state: any) => ({
  records: state.RecordsPageReducer.get('records').toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllRecords: bindActionCreators(fetchAllRecordsRequested, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordReportPagePure);
