import { AppStore, createTestStore } from '@/lib/store'
import { signupWithGithub } from '../usecases/signup-with-github.usecase'
import { FakeAuthGateway } from '../infra/fake-auth.gateway'

describe('Signup With Github', () => {
  test('should be able to signup with github', async () => {
    givenNoUserAuthenticated()
    givenAuthWithGithubWillSucceedWithUser({ id: '123' })

    await whenUserSignupWithGithub()

    thenAuthenticatedUserShouldBe({
      id: '123',
      token: JSON.stringify({ id: '123' }),
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

function givenAuthWithGithubWillSucceedWithUser(user: { id: string }) {
  authGateway.willSucceedWithUser = user
}

async function whenUserSignupWithGithub() {
  return await store.dispatch(signupWithGithub())
}

function thenAuthenticatedUserShouldBe(expectedUser: {
  id: string
  token: string
}) {
  const { auth } = store.getState()
  expect(auth.user).toEqual({ id: expectedUser.id })
  expect(auth.token).toEqual(expectedUser.token)
}
