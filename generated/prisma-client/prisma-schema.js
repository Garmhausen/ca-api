module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateClient {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Client {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
  user: User!
}

type ClientConnection {
  pageInfo: PageInfo!
  edges: [ClientEdge]!
  aggregate: AggregateClient!
}

input ClientCreateInput {
  id: ID
  name: String!
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
  user: UserCreateOneWithoutClientsInput!
}

input ClientCreateManyWithoutUserInput {
  create: [ClientCreateWithoutUserInput!]
  connect: [ClientWhereUniqueInput!]
}

input ClientCreateWithoutUserInput {
  id: ID
  name: String!
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
}

type ClientEdge {
  node: Client!
  cursor: String!
}

enum ClientOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  phone_ASC
  phone_DESC
  address1_ASC
  address1_DESC
  address2_ASC
  address2_DESC
  address3_ASC
  address3_DESC
  city_ASC
  city_DESC
  postalCode_ASC
  postalCode_DESC
  stateProvince_ASC
  stateProvince_DESC
}

type ClientPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
}

input ClientScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  address1: String
  address1_not: String
  address1_in: [String!]
  address1_not_in: [String!]
  address1_lt: String
  address1_lte: String
  address1_gt: String
  address1_gte: String
  address1_contains: String
  address1_not_contains: String
  address1_starts_with: String
  address1_not_starts_with: String
  address1_ends_with: String
  address1_not_ends_with: String
  address2: String
  address2_not: String
  address2_in: [String!]
  address2_not_in: [String!]
  address2_lt: String
  address2_lte: String
  address2_gt: String
  address2_gte: String
  address2_contains: String
  address2_not_contains: String
  address2_starts_with: String
  address2_not_starts_with: String
  address2_ends_with: String
  address2_not_ends_with: String
  address3: String
  address3_not: String
  address3_in: [String!]
  address3_not_in: [String!]
  address3_lt: String
  address3_lte: String
  address3_gt: String
  address3_gte: String
  address3_contains: String
  address3_not_contains: String
  address3_starts_with: String
  address3_not_starts_with: String
  address3_ends_with: String
  address3_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  postalCode: String
  postalCode_not: String
  postalCode_in: [String!]
  postalCode_not_in: [String!]
  postalCode_lt: String
  postalCode_lte: String
  postalCode_gt: String
  postalCode_gte: String
  postalCode_contains: String
  postalCode_not_contains: String
  postalCode_starts_with: String
  postalCode_not_starts_with: String
  postalCode_ends_with: String
  postalCode_not_ends_with: String
  stateProvince: String
  stateProvince_not: String
  stateProvince_in: [String!]
  stateProvince_not_in: [String!]
  stateProvince_lt: String
  stateProvince_lte: String
  stateProvince_gt: String
  stateProvince_gte: String
  stateProvince_contains: String
  stateProvince_not_contains: String
  stateProvince_starts_with: String
  stateProvince_not_starts_with: String
  stateProvince_ends_with: String
  stateProvince_not_ends_with: String
  AND: [ClientScalarWhereInput!]
  OR: [ClientScalarWhereInput!]
  NOT: [ClientScalarWhereInput!]
}

type ClientSubscriptionPayload {
  mutation: MutationType!
  node: Client
  updatedFields: [String!]
  previousValues: ClientPreviousValues
}

input ClientSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ClientWhereInput
  AND: [ClientSubscriptionWhereInput!]
  OR: [ClientSubscriptionWhereInput!]
  NOT: [ClientSubscriptionWhereInput!]
}

input ClientUpdateInput {
  name: String
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
  user: UserUpdateOneRequiredWithoutClientsInput
}

input ClientUpdateManyDataInput {
  name: String
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
}

input ClientUpdateManyMutationInput {
  name: String
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
}

input ClientUpdateManyWithoutUserInput {
  create: [ClientCreateWithoutUserInput!]
  delete: [ClientWhereUniqueInput!]
  connect: [ClientWhereUniqueInput!]
  set: [ClientWhereUniqueInput!]
  disconnect: [ClientWhereUniqueInput!]
  update: [ClientUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ClientUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ClientScalarWhereInput!]
  updateMany: [ClientUpdateManyWithWhereNestedInput!]
}

input ClientUpdateManyWithWhereNestedInput {
  where: ClientScalarWhereInput!
  data: ClientUpdateManyDataInput!
}

input ClientUpdateWithoutUserDataInput {
  name: String
  email: String
  phone: String
  address1: String
  address2: String
  address3: String
  city: String
  postalCode: String
  stateProvince: String
}

input ClientUpdateWithWhereUniqueWithoutUserInput {
  where: ClientWhereUniqueInput!
  data: ClientUpdateWithoutUserDataInput!
}

input ClientUpsertWithWhereUniqueWithoutUserInput {
  where: ClientWhereUniqueInput!
  update: ClientUpdateWithoutUserDataInput!
  create: ClientCreateWithoutUserInput!
}

input ClientWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  address1: String
  address1_not: String
  address1_in: [String!]
  address1_not_in: [String!]
  address1_lt: String
  address1_lte: String
  address1_gt: String
  address1_gte: String
  address1_contains: String
  address1_not_contains: String
  address1_starts_with: String
  address1_not_starts_with: String
  address1_ends_with: String
  address1_not_ends_with: String
  address2: String
  address2_not: String
  address2_in: [String!]
  address2_not_in: [String!]
  address2_lt: String
  address2_lte: String
  address2_gt: String
  address2_gte: String
  address2_contains: String
  address2_not_contains: String
  address2_starts_with: String
  address2_not_starts_with: String
  address2_ends_with: String
  address2_not_ends_with: String
  address3: String
  address3_not: String
  address3_in: [String!]
  address3_not_in: [String!]
  address3_lt: String
  address3_lte: String
  address3_gt: String
  address3_gte: String
  address3_contains: String
  address3_not_contains: String
  address3_starts_with: String
  address3_not_starts_with: String
  address3_ends_with: String
  address3_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  postalCode: String
  postalCode_not: String
  postalCode_in: [String!]
  postalCode_not_in: [String!]
  postalCode_lt: String
  postalCode_lte: String
  postalCode_gt: String
  postalCode_gte: String
  postalCode_contains: String
  postalCode_not_contains: String
  postalCode_starts_with: String
  postalCode_not_starts_with: String
  postalCode_ends_with: String
  postalCode_not_ends_with: String
  stateProvince: String
  stateProvince_not: String
  stateProvince_in: [String!]
  stateProvince_not_in: [String!]
  stateProvince_lt: String
  stateProvince_lte: String
  stateProvince_gt: String
  stateProvince_gte: String
  stateProvince_contains: String
  stateProvince_not_contains: String
  stateProvince_starts_with: String
  stateProvince_not_starts_with: String
  stateProvince_ends_with: String
  stateProvince_not_ends_with: String
  user: UserWhereInput
  AND: [ClientWhereInput!]
  OR: [ClientWhereInput!]
  NOT: [ClientWhereInput!]
}

input ClientWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createClient(data: ClientCreateInput!): Client!
  updateClient(data: ClientUpdateInput!, where: ClientWhereUniqueInput!): Client
  updateManyClients(data: ClientUpdateManyMutationInput!, where: ClientWhereInput): BatchPayload!
  upsertClient(where: ClientWhereUniqueInput!, create: ClientCreateInput!, update: ClientUpdateInput!): Client!
  deleteClient(where: ClientWhereUniqueInput!): Client
  deleteManyClients(where: ClientWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

enum Permission {
  ADMIN
  USER
  PERMISSIONUPDATE
}

type Query {
  client(where: ClientWhereUniqueInput!): Client
  clients(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Client]!
  clientsConnection(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ClientConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  client(where: ClientSubscriptionWhereInput): ClientSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiration: Float
  permissions: [Permission!]!
  clients(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Client!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiration: Float
  permissions: UserCreatepermissionsInput
  clients: ClientCreateManyWithoutUserInput
}

input UserCreateOneWithoutClientsInput {
  create: UserCreateWithoutClientsInput
  connect: UserWhereUniqueInput
}

input UserCreatepermissionsInput {
  set: [Permission!]
}

input UserCreateWithoutClientsInput {
  id: ID
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiration: Float
  permissions: UserCreatepermissionsInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiration_ASC
  resetTokenExpiration_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiration: Float
  permissions: [Permission!]!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiration: Float
  permissions: UserUpdatepermissionsInput
  clients: ClientUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiration: Float
  permissions: UserUpdatepermissionsInput
}

input UserUpdateOneRequiredWithoutClientsInput {
  create: UserCreateWithoutClientsInput
  update: UserUpdateWithoutClientsDataInput
  upsert: UserUpsertWithoutClientsInput
  connect: UserWhereUniqueInput
}

input UserUpdatepermissionsInput {
  set: [Permission!]
}

input UserUpdateWithoutClientsDataInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiration: Float
  permissions: UserUpdatepermissionsInput
}

input UserUpsertWithoutClientsInput {
  update: UserUpdateWithoutClientsDataInput!
  create: UserCreateWithoutClientsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  resetTokenExpiration: Float
  resetTokenExpiration_not: Float
  resetTokenExpiration_in: [Float!]
  resetTokenExpiration_not_in: [Float!]
  resetTokenExpiration_lt: Float
  resetTokenExpiration_lte: Float
  resetTokenExpiration_gt: Float
  resetTokenExpiration_gte: Float
  clients_every: ClientWhereInput
  clients_some: ClientWhereInput
  clients_none: ClientWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    