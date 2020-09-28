import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Account, Contact, ContactRelations} from '../models';
import {AccountRepository} from './account.repository';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.AccountId,
  ContactRelations
  > {

  public readonly account: HasOneRepositoryFactory<Account, typeof Contact.prototype.AccountId>;
  // public readonly account: BelongsToAccessor<Account, typeof Contact.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
    // @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Contact, dataSource);
    this.account = this.createHasOneRepositoryFactoryFor('account', accountRepositoryGetter);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
    // this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    // this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
