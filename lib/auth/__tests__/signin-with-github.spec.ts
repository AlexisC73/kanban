import { testStateBuilderProvider } from '@/lib/state.builder'
import { AuthFixture, createAuthFixture } from './auth.fixture'

describe('Signin With Github', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    const stateBuilderProvider = testStateBuilderProvider()
    authFixture = createAuthFixture(stateBuilderProvider)
  })

  test('should be able to signup with github', async () => {
    authFixture.givenNoUserAuthenticated()
    authFixture.givenSigninWithGithubWillSucceedForUser({ id: '123' })

    await authFixture.whenUserSigninWithGithub()

    authFixture.thenAuthenticatedUserShouldBe({
      id: '123',
    })
  })
})
