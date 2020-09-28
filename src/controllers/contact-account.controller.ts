import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,

  requestBody
} from '@loopback/rest';
import {Account} from '../models';
import {ContactRepository} from '../repositories';

export class ContactAccountController {
  constructor(
    @repository(ContactRepository) protected contactRepository: ContactRepository,
  ) {}

  @get('/contacts/{id}/account', {
    responses: {
      '200': {
        description: 'Contact has one Account',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Account>,
  ): Promise<Account> {
    console.log('id', id);
    return this.contactRepository.account(id).get(filter);
  }

  /*@post('/contacts/{id}/account', {
    responses: {
      '200': {
        description: 'Contact model instance',
        content: {'application/json': {schema: getModelSchemaRef(Account)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Contact.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccountInContact',
            exclude: ['id'],
            optional: ['sfid']
          }),
        },
      },
    }) account: Omit<Account, 'id'>,
  ): Promise<Account> {
    return this.contactRepository.account(id).create(account);
  }*/

  @patch('/contacts/{id}/account', {
    responses: {
      '200': {
        description: 'Contact.Account PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Partial<Account>,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return this.contactRepository.account(id).patch(account, where);
  }

  @del('/contacts/{id}/account', {
    responses: {
      '200': {
        description: 'Contact.Account DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return this.contactRepository.account(id).delete(where);
  }
}
