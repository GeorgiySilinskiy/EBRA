
export default function ({ store, redirect, route }) {
  const user = store.getters['auth/isAuth']
  if (!user) {
    if (route.path === '/login') {
      return redirect('/login')
    } else if (route.path === '/login/qr') {
      return redirect('/login/qr')
    } else {
      return redirect('/login/qr')
    }
  }
}
