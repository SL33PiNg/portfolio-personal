// eslint-disable-next-line prettier/prettier
export default function(app) {
  if (!app.app.$auth.hasScope('ADMIN')) {
    app.redirect('/')
  }
}
