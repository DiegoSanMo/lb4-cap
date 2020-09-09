// import {
//   repository,
// } from '@loopback/repository';
// import {
//   param,
//   get,
//   getModelSchemaRef,
// } from '@loopback/rest';
// import {
//   Contact,
//   Account,
// } from '../models';
// import {ContactRepository} from '../repositories';

// export class ContactAccountController {
//   constructor(
//     @repository(ContactRepository)
//     public contactRepository: ContactRepository,
//   ) { }

//   @get('/contacts/{id}/account', {
//     responses: {
//       '200': {
//         description: 'Account belonging to Contact',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(Account)},
//           },
//         },
//       },
//     },
//   })
//   async getAccount(
//     @param.path.number('id') id: typeof Contact.prototype.id,
//   ): Promise<Account> {
//     return this.contactRepository.account(id);
//   }
// }
