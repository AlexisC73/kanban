import {
  AuthGateway,
  SigninWithGithubResponse,
  SignupWithGithubResponse,
} from '../models/auth.gateway'

export class FakeAuthGateway implements AuthGateway {
  signupWithGithubWillSucceedForUser!: { id: string }
  signinWithGithubWillSucceedForUser!: { id: string }
  signupWithGithub: () => Promise<SignupWithGithubResponse> = async () => {
    return await Promise.resolve({
      user: { id: this.signupWithGithubWillSucceedForUser.id },
      token: JSON.stringify({ id: this.signupWithGithubWillSucceedForUser.id }),
    })
  }

  signinWithGithub: () => Promise<SigninWithGithubResponse> = async () => {
    return await Promise.resolve({
      user: { id: this.signinWithGithubWillSucceedForUser.id },
      token: JSON.stringify({ id: this.signinWithGithubWillSucceedForUser.id }),
    })
  }
}
