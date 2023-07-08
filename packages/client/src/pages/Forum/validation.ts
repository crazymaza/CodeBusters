import * as yup from 'yup'

export const dialogSchema = yup.object().shape({
  topic_name: yup.string().required('Поле не должно быть пустым'),

  topic_description: yup.string(),
})
