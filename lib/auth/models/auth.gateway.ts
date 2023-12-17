export interface AuthGateway {
  signupWithGithub: () => Promise<SignupWithGithubResponse>
}

export interface SignupWithGithubResponse {
  user: { id: string }
  token: string
}
