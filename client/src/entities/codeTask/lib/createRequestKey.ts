import { CodeTaskModel } from "../model/codeTask";

export const generateCodeTasksCommonRequestKey = () => ['codeTasks'];
export const generateCodeTaskDetailsRequestKey = (codeTaskId: CodeTaskModel['id']) => ['codeTasks', codeTaskId];
