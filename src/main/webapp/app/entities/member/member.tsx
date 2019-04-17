import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './member.reducer';
import { IMember } from 'app/shared/model/member.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMemberProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Member extends React.Component<IMemberProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { memberList, match } = this.props;
    return (
      <div>
        <h2 id="member-heading">
          <Translate contentKey="tdPortalApp.member.home.title">Members</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="tdPortalApp.member.home.createLabel">Create new Member</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tdPortalApp.member.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tdPortalApp.member.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tdPortalApp.member.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="tdPortalApp.member.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tdPortalApp.member.refogID">Refog ID</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {memberList.map((member, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${member.id}`} color="link" size="sm">
                      {member.id}
                    </Button>
                  </td>
                  <td>{member.firstName}</td>
                  <td>{member.lastName}</td>
                  <td>{member.email}</td>
                  <td>{member.phoneNumber}</td>
                  <td>{member.refogID}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${member.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${member.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${member.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ member }: IRootState) => ({
  memberList: member.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
