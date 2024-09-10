import { LANGUAGES } from "../../../shared/consts/languages";
import { PaginationParams } from "../../../shared/interfaces/paginated";

export type CreateCodeTaskParams = {
  title: string;
  language: LANGUAGES;
  code: string;
  answer?: string;
}

export type UpdateCodeTaskParams = Partial<CreateCodeTaskParams>;

export type GetCodeTasksParams = PaginationParams & {
    title?: string;
    language?: LANGUAGES;
    order?: string | string[];
}

export interface CodeTaskDto {
  /** ID задачи */
  id: string;
  /** ID автора задачи */
  authorId: string;
  /** Название задачи */
  title: string;
  /** Код задачи */
  code: string;
  /** Ответ на задачу от автора задачи */
  answer: string | null;
  /** Язык программирования */
  language: LANGUAGES;
  /** Дата создания */
  created: string;
  /** Дата обновления */
  updated: string;
}