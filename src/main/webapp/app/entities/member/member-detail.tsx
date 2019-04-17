import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './member.reducer';
import { IMember } from 'app/shared/model/member.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMemberDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MemberDetail extends React.Component<IMemberDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { memberEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tdPortalApp.member.detail.title">Member</Translate> [<b>{memberEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">
                <Translate contentKey="tdPortalApp.member.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{memberEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="tdPortalApp.member.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{memberEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="tdPortalApp.member.email">Email</Translate>
              </span>
            </dt>
            <dd>{memberEntity.email}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="tdPortalApp.member.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{memberEntity.phoneNumber}</dd>
            <dt>
              <span id="refogID">
                <Translate contentKey="tdPortalApp.member.refogID">Refog ID</Translate>
              </span>
            </dt>
            <dd>{memberEntity.refogID}</dd>
          </dl>
          <Button tag={Link} to="/entity/member" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/member/${memberEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ member }: IRootState) => ({
  memberEntity: member.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetail);
