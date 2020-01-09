import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';
import RecordReportPagePure from './record-report-page-pure';

const mapStateToProps = (state: any) => ({
  records: state.RecordsPageReducer.get('records').toJS(),
  representatives: state.RepresentativesReducer.get('representatives').toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllRepresentatives: bindActionCreators(
    fetchAllRepresentativesRequested,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordReportPagePure);
