import { AuthFixture, createAuthFixture } from './auth.fixture'
import { testStateBuilderProvider } from '@/lib/state.builder'

describe('Signup With Github', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    const stateBuilderProvider = testStateBuilderProvider()
    authFixture = createAuthFixture(stateBuilderProvider)
  })
  test('should be able to signup with github', async () => {
    authFixture.givenNoUserAuthenticated()
    authFixture.givenSignupWithGithubWillSucceedForUser({ id: '123' })

    await authFixture.whenUserSignupWithGithub()

    authFixture.thenAuthenticatedUserShouldBe({
      id: '123',
    })
  })
})
