import { Inject, Injectable } from '@nestjs/common';

import { Api as ApiCodeInterviewSandbox } from '../shared/clients/codeinterviewSandboxService/api';

type ExecuteParams = Parameters<
  ApiCodeInterviewSandbox<unknown>['sandbox']['execute']
>;

@Injectable()
export class SandboxService {
  constructor(
    @Inject('CodeinterviewSandbox')
    private readonly codeinterviewSandboxService: ApiCodeInterviewSandbox<unknown>,
  ) {}

  async execute(data: ExecuteParams[0]) {
    return this.codeinterviewSandboxService.sandbox.execute(data);
  }
}
