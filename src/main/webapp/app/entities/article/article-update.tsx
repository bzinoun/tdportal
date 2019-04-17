import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IMember } from 'app/shared/model/member.model';
import { getEntities as getMembers } from 'app/entities/member/member.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IArticleUpdateState {
  isNew: boolean;
  categoryId: string;
  memberId: string;
}

export class ArticleUpdate extends React.Component<IArticleUpdateProps, IArticleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '0',
      memberId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCategories();
    this.props.getMembers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.creationDate = new Date(values.creationDate);
    values.modificationDate = new Date(values.modificationDate);

    if (errors.length === 0) {
      const { articleEntity } = this.props;
      const entity = {
        ...articleEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/article');
  };

  render() {
    const { articleEntity, categories, members, loading, updating } = this.props;
    const { isNew } = this.state;

    const { content, image, imageContentType } = articleEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tdPortalApp.article.home.createOrEditLabel">
              <Translate contentKey="tdPortalApp.article.home.createOrEditLabel">Create or edit a Article</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : articleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="tdPortalApp.article.title">Title</Translate>
                  </Label>
                  <AvField
                    id="article-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="tdPortalApp.article.description">Description</Translate>
                  </Label>
                  <AvField id="article-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="tdPortalApp.article.content">Content</Translate>
                  </Label>
                  <AvInput
                    id="article-content"
                    type="textarea"
                    name="content"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="tdPortalApp.article.image">Image</Translate>
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                    <AvInput type="hidden" name="image" value={image} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="creationDateLabel" for="creationDate">
                    <Translate contentKey="tdPortalApp.article.creationDate">Creation Date</Translate>
                  </Label>
                  <AvInput
                    id="article-creationDate"
                    type="datetime-local"
                    className="form-control"
                    name="creationDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.articleEntity.creationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="modificationDateLabel" for="modificationDate">
                    <Translate contentKey="tdPortalApp.article.modificationDate">Modification Date</Translate>
                  </Label>
                  <AvInput
                    id="article-modificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="modificationDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.articleEntity.modificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="category.id">
                    <Translate contentKey="tdPortalApp.article.category">Category</Translate>
                  </Label>
                  <AvInput id="article-category" type="select" className="form-control" name="categoryId">
                    <option value="" key="0" />
                    {categories
                      ? categories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="member.id">
                    <Translate contentKey="tdPortalApp.article.member">Member</Translate>
                  </Label>
                  <AvInput id="article-member" type="select" className="form-control" name="memberId">
                    <option value="" key="0" />
                    {members
                      ? members.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/article" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.category.entities,
  members: storeState.member.entities,
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating
});

const mapDispatchToProps = {
  getCategories,
  getMembers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleUpdate);
