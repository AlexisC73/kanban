import { AuthGateway, SignupWithGithubResponse } from '../models/auth.gateway'

export class FakeAuthGateway implements AuthGateway {
  willSucceedWithUser!: { id: string }
  signupWithGithub: () => Promise<SignupWithGithubResponse> = async () => {
    return await Promise.resolve({
      user: { id: this.willSucceedWithUser.id },
      token: JSON.stringify({ id: this.willSucceedWithUser.id }),
    })
  }
}
