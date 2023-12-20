import { FakeAuthGateway } from '../auth/infra/fake-auth.gateway'
import { FakeBoardGateway } from '../boards/infra/fake-board.gateway'
import { FakeTaskGateway } from '../tasks/infra/fake-task.gateway'

export const authGateway = new FakeAuthGateway()
export const taskGateway = new FakeTaskGateway()
export const boardGateway = new FakeBoardGateway()
