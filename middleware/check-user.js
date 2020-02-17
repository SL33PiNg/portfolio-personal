// eslint-disable-next-line prettier/prettier
export default function(app) {
  if (!app.app.$auth.hasScope('USER')) {
    app.redirect('/')
  }
}
