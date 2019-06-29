export const RULES = {
  requireRule: v => !!v || '不能为空',
  NUM_RULE: v => (v && typeof v === 'number') || '必须是数字',
  EMAIL_RULE: v => /.+@.+/.test(v) || '非法E-mail格式'
}
