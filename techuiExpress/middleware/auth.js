
export default function ({ store, redirect, route }) {
  const user = store.getters['auth/isAuth']
  if (user) {
    return redirect('/chat')
  }
}
