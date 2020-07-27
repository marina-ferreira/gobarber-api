import UserToken from '@modules/users/infra/typeorm/models/UserToken'

interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>
}

export default IUserTokensRepository
