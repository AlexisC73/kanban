import { AppStore, createTestStore } from '@/lib/store'
import { signupWithGithub } from '../usecases/signup-with-github.usecase'
import { FakeAuthGateway } from '../infra/fake-auth.gateway'

describe('Signup With Github', () => {
  test('should be able to signup with github', async () => {
    givenNoUserAuthenticated()
    givenSignupWithGithubWillSucceedForUser({ id: '123' })

    await whenUserSignupWithGithub()

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

function givenSignupWithGithubWillSucceedForUser(user: { id: string }) {
  authGateway.signupWithGithubWillSucceedForUser = user
}

async function whenUserSignupWithGithub() {
  return await store.dispatch(signupWithGithub())
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
