import { AppStore, createTestStore } from '@/lib/store'
import { FakeAuthGateway } from '../infra/fake-auth.gateway'
import { signinWithGithub } from '../usecases/signin-with-github.usecase'
import { StateBuilderProvider } from '@/lib/state.builder'
import { signupWithGithub } from '../usecases/signup-with-github.usecase'

export const createAuthFixture = (
  testStateBuilderProvider: StateBuilderProvider,
) => {
  const authGateway = new FakeAuthGateway()

  let store: AppStore

  return {
    givenNoUserAuthenticated() {
      testStateBuilderProvider.setState((builder) =>
        builder.withAuthUser({
          user: undefined,
          token: undefined,
        }),
      )
    },
    givenAuthenticatedUser(user: { id: string }) {
      testStateBuilderProvider.setState((builder) =>
        builder.withAuthUser({
          user,
          token: JSON.stringify(user),
        }),
      )
    },
    givenSigninWithGithubWillSucceedForUser(user: { id: string }) {
      authGateway.signinWithGithubWillSucceedForUser = user
    },
    givenSignupWithGithubWillSucceedForUser(user: { id: string }) {
      authGateway.signupWithGithubWillSucceedForUser = user
    },
    async whenUserSigninWithGithub() {
      store = createTestStore(
        { authGateway },
        testStateBuilderProvider.getState(),
      )
      return await store.dispatch(signinWithGithub())
    },
    async whenUserSignupWithGithub() {
      store = createTestStore(
        { authGateway },
        testStateBuilderProvider.getState(),
      )
      return await store.dispatch(signupWithGithub())
    },
    thenAuthenticatedUserShouldBe(expectedUser: { id: string }) {
      const { auth } = store.getState()
      expect(auth).toEqual(
        expect.objectContaining({
          user: { id: expectedUser.id },
          token: expect.any(String),
        }),
      )
    },
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
