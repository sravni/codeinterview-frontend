import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../src/app.module';

describe('InterviewRoomModule (e2e)', () => {
  let app: INestApplication;
  const PORT = 3001;

  beforeEach(async () => {
    const createTestingModule: TestingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });
    const moduleRef: TestingModule = await createTestingModule.compile();
    app = moduleRef.createNestApplication<INestApplication>();

    await app.init();
    await app.listen(PORT);
  });
});
