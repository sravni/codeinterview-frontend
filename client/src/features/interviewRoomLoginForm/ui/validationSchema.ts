import * as Yup from "yup";

import {
   FIELD_NAME
  } from "../../interviewRoomLoginForm/ui/consts";

export const validationSchema = Yup.object().shape({
    [FIELD_NAME.DISPLAY_NAME]: Yup.string().trim().required('Поле обязательно для заполнения'),    
});