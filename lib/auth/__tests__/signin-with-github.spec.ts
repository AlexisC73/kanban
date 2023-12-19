import { AppStore, createTestStore } from '@/lib/store'
import { FakeAuthGateway } from '../infra/fake-auth.gateway'
import { signinWithGithub } from '../usecases/signin-with-github.usecase'

describe('Signin With Github', () => {
  test('should be able to signup with github', async () => {
    givenNoUserAuthenticated()
    givenSigninWithGithubWillSucceedForUser({ id: '123' })

    await whenUserSigninWithGithub()

    thenAuthenticatedUserShouldBe({
      id: '123',
    })
  })
})

let store: AppStore
const authGateway = new FakeAuthGateway()

function givenNoUserAuthenticated() {
  store = createTestStore(
    { authGateway },
    {
      auth: {},
    },
  )
}

function givenSigninWithGithubWillSucceedForUser(user: { id: string }) {
  authGateway.signinWithGithubWillSucceedForUser = user
}

async function whenUserSigninWithGithub() {
  return await store.dispatch(signinWithGithub())
}

function thenAuthenticatedUserShouldBe(expectedUser: { id: string }) {
  const { auth } = store.getState()
  expect(auth).toEqual(
    expect.objectContaining({
      user: { id: expectedUser.id },
      token: expect.any(String),
    }),
  )
}
