export interface AuthGateway {
  signupWithGithub: () => Promise<SignupWithGithubResponse>
  signinWithGithub: () => Promise<SigninWithGithubResponse>
}

export interface SignupWithGithubResponse {
  user: { id: string }
  token: string
}

export interface SigninWithGithubResponse {
  user: { id: string }
  token: string
}
